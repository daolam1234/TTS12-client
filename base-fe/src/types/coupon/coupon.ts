export type Coupon = {
    _id?: string;
    code: string;
    discount_percent: number;
    start_date: string; // ISO date
    end_date: string; // ISO date
    is_unlimited: boolean;
    max_uses: number;
  };
  
  export type CouponUser = {
    _id: string;
    coupon_id: string | Coupon; // khi populate sẽ là Coupon object, không thì là string ID
    user_id: string;
    is_used: boolean;
    createdAt: string;
    updatedAt: string;
  };
  
  export type MyCoupon = {
    _id: string;
    code: string;
    discount_percent: number;
    start_date: string;
    end_date: string;
    is_unlimited: boolean;
    is_used: boolean;
    max_discount?: number;
  };
  
  
  
  