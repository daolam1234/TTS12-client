import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instanceAxios from "@/utils/axios";
import type { IOrder } from "@/types/order/order.type";
import { toast } from "react-toastify";
import type { IProductReview } from "@/types/productReview/productReview.type";

export const useOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await instanceAxios.get(`/orders/${id}`);
        setOrder(res.data.data || null);
      } catch (error) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!id) return;
    const confirmCancel = window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng?");
    if (!confirmCancel) return;

    try {
      setCancelLoading(true);
      const res = await instanceAxios.delete(`/orders/${id}/cancel`);
      toast.success(res.data.message || "Huỷ đơn hàng thành công");
      setOrder(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Huỷ đơn hàng thất bại");
    } finally {
      setCancelLoading(false);
    }
  };

    const handleSubmitReview = async (productId: string, rating: number, comment: string) => {
    if (!id) return;
    try {
      setReviewLoading(true);
      const res = await instanceAxios.post<{ data: IProductReview }>("/product-reviews/add", {
        orderId: id,
        productId,
        rating,
        comment,
      });
      toast.success("Đánh giá thành công");
      return res.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đánh giá thất bại");
      throw error;
    } finally {
      setReviewLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return {
    order,
    loading,
    reviewLoading,
    cancelLoading,
    handleCancelOrder,
    handleSubmitReview,
    getStatusStyle,
  };
};
