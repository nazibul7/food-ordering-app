import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormType,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/UserApi";
import { TCartItem, User } from "@/types";
import { useCreateCheckoutSession } from "@/api/OrderApi";

type TCheckOutProps = {
  resturantId?: string;
  cartItems: TCartItem[];
  disabled: boolean;
};

export default function CheckoutBtn({
  cartItems,
  resturantId,
  disabled,
}: TCheckOutProps) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { currentUser, isLoading: isGetUserLoading } = useGetUser();
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  const onCheckoutHandler = async (UserFormData: UserFormType) => {
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => {
        return {
          menuItemId: cartItem._id,
          name: cartItem.name,
          quantity: cartItem.quantity,
        };
      }),
      resturantId: resturantId as string,
      deliveryDeatils: {
        email: UserFormData.email as string,
        name: UserFormData.name,
        addressLine1: UserFormData.addressLine1,
        city: UserFormData.city,
        country: UserFormData.country,
      },
    };
    const data = await createCheckoutSession(checkoutData);
    console.log("Checkout API Response:", data);
    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("Checkout URL is missing");
    }
  };

  if (!isAuthenticated) {
    return (
      <Button
        disabled={disabled}
        onClick={onLogin}
        className="bg-orange-500 flex-1"
      >
        Login to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isCheckoutLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 flex-1" disabled={disabled}>
          Go to check out
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser as User}
          onSave={onCheckoutHandler}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          btnText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
}
