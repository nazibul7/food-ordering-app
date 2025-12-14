import { TOrderStatus } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type TOrder = {
  order: TOrderStatus;
};
export default function OrderStatusHeader({ order }: TOrder) {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.resturant.estimatedDeliveryTime
    );
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes > 10 ? minutes : `0${minutes}`;
    return `${hours}:${paddedMinutes}`;
  };
  const getOrderInfo = () => {
    const x =
      ORDER_STATUS.find((orderStatus) => orderStatus.value == order.status) ||
      ORDER_STATUS[0];
    return x;
  };
  getOrderInfo();
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status : {getOrderInfo().label}</span>
        <span>Expected by:{getExpectedDelivery()}</span>
      </h1>
      <Progress value={getOrderInfo().progressValue} />
    </>
  );
}
