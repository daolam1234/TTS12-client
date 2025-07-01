export type Coupon = {
    code: string;
    discount_percent: number;
    start_date: string; // ISO date
    end_date: string; // ISO date
    is_unlimited: boolean;
    max_uses: number;
  };
  