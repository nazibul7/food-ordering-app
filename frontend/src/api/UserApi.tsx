import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  };
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getUserRequest,
    enabled: isAuthenticated,
  });
  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
};

type UserRequest = {
  auth0Id: string;
  email: string;
};
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: UserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/user/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Faild to create user");
    }
  };
  // rename mutateAsync to createUser
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);
  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateUserRequest = async (formData: UpdateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);
  if (isSuccess) {
    toast.success("User profile updated!", {
      style: {
        backgroundColor: "#22c55e",
        color: "whitesmoke",
      },
    });
  }
  if (error) {
    toast.error(error.toString(), {
      style: {
        backgroundColor: "#ef4444", // Tailwind red-500
        color: "#ffffff",
      },
    });
    reset();
  }
  return { updateUser, isLoading };
};
