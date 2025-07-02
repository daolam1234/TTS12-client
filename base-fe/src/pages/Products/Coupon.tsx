import { useList } from "@/hooks";
import type { Coupon } from "@/types/coupon/coupon";
import { addCouponToUser } from "@/services/couponService";
import { toast } from "react-toastify";
import { useMyCoupons } from "@/hooks/useMyCoupons";

export default function Coupon() {
  const { data, isLoading, error } = useList({ resource: "coupon" });
  const { coupons: myCoupons, refetch } = useMyCoupons();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading coupons.</div>;

  // Helper function to check if coupon is already saved
  const isCouponSaved = (couponCode: string) => {
    return myCoupons.some(coupon => coupon.code === couponCode);
  };

  // Helper function to check if coupon is used
  const isCouponUsed = (couponCode: string) => {
    const savedCoupon = myCoupons.find(coupon => coupon.code === couponCode);
    return savedCoupon?.is_used || false;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((coupon: Coupon) => {
        const isSaved = isCouponSaved(coupon.code);
        const isUsed = isCouponUsed(coupon.code);
        
        return (
          <div
            key={coupon.code}
            className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition bg-white flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-primary">Mã: {coupon.code}</div>
              {coupon.is_unlimited ? (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Không giới hạn
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                  {coupon.max_uses} lượt dùng
                </span>
              )}
            </div>
    
            <div className="text-sm">
              <span className="font-medium">Giảm giá:</span>{" "}
              <span className="text-lg font-bold text-red-500">{coupon.discount_percent}%</span>
            </div>
    
            <div className="text-sm">
              <span className="font-medium">Bắt đầu:</span>{" "}
              {new Date(coupon.start_date).toLocaleDateString("vi-VN")}
            </div>
    
            <div className="text-sm">
              <span className="font-medium">Kết thúc:</span>{" "}
              {new Date(coupon.end_date).toLocaleDateString("vi-VN")}
            </div>
    
            <div className="mt-2 flex gap-2">
              {isSaved ? (
                <button
                  className="w-full bg-gray-400 text-white text-sm py-2 rounded-xl cursor-not-allowed"
                  disabled
                >
                  {isUsed ? "Đã sử dụng" : "Đã nhận"}
                </button>
              ) : (
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-xl transition"
                  onClick={async () => {
                    try {
                      await addCouponToUser(coupon._id!);
                      toast.success("Đã lưu mã thành công!");
                      refetch(); // Refresh the user's coupons list
                    } catch (err: any) {
                      toast.error(err?.response?.data?.message || "Có lỗi xảy ra");
                    }
                  }}
                >
                  Nhận mã
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
