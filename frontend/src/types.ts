export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};
export type Resturant = {
  _id: string;
  user: string;
  resturantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cusines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type ResturantSearchResponse = {
  data: Resturant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type TCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type TMenuItem = {
  menuItem: MenuItem;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
export type TOrderStatus = {
  _id: string;
  resturant: Resturant;
  user: User;
  cartItems: {
    menuItemId: string;
    quantity: string;
    name: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  resturantId: string;
};
