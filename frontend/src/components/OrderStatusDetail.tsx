import { TOrderStatus } from "@/types";
import { Separator } from "./ui/separator";

type TOrderStatusDetails = {
  order: TOrderStatus;
};

export default function OrderStatusDetail({ order }: TOrderStatusDetails) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1},{order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.menuItemId}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>${order.totalAmount}</span>
      </div>
    </div>
  );
}
