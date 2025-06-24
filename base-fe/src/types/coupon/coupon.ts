export type Coupon = {
    code: string;
    discount_type: 'percent' | 'fixed';
    discount_value: number;
    min_purchase: number;
    start_date: string; // ISO date
    end_date: string;
  };
  