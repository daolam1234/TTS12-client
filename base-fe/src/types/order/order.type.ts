export type IOrderItem = {
  productId: string;
  productName: string;
  imageUrl?: string;
  variant: {
    size: string;
  };
  quantity: number;
  unitPrice: number;
  discountedPrice: number;
};

export type IShippingAddress = {
  fullName: string;
  phone: string;
  addressLine: string;
  ward: string;
  district: string;
  province: string;
};

export type IShippingMethod = {
  name: string;
  fee: number;
};

export type ICoupon = {
  code: string;
  discount_amount: number;
};


export type PaymentMethod = "cod" | "vnpay";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";

export type CheckoutData = {
  shippingAddress: IShippingAddress;
  shippingMethod: IShippingMethod;
  payment_method: PaymentMethod;
  items: {
    productId: string;
    variant: { size: string };
    quantity: number;
    unitPrice: number;
  }[];
  couponCode?: string;
  note: string;
};


export type IOrder = {
  _id: string;
  user_id: string;

  shippingAddress: IShippingAddress;
  shippingMethod: IShippingMethod;
  payment_method: PaymentMethod;

  orderItems: IOrderItem[];

  coupon?: ICoupon;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  final_price: number;

  status: OrderStatus;
  note?: string;
  trackingNumber?: string;

  paymentStatus: PaymentStatus;
  paymentTime?: string; // ISO string, if returned from API

  createdAt: string;
  updatedAt: string;
};




