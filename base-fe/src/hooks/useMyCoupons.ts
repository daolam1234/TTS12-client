import { useEffect, useState } from 'react';
import instanceAxios from "@/utils/axios";
import type { MyCoupon } from "@/types/coupon/coupon";

export const useMyCoupons = () => {
  const [coupons, setCoupons] = useState<MyCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await instanceAxios.get('/coupon-user/my-coupons');
      setCoupons(res.data.data as MyCoupon[]);
    } catch (error) {
      console.error('Failed to fetch coupons', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return { coupons, loading, refetch: fetchCoupons };
};
