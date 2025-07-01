import type { Coupon } from '@/types/coupon/coupon';
import axios from '../utils/axios';

export const validateCoupon = async (code: string): Promise<Coupon> => {
  const res = await axios.get(`/coupon/${code}`);
  if (!res.data || !res.data.data || !res.data.coupon) {
    throw new Error(res.data?.message || 'Mã giảm giá không hợp lệ');
  }
  return res.data.data.coupon;
};

export const addCouponToUser = async (coupon_id: string) => {
  return await axios.post('/coupon-user/add', { coupon_id });
}; 