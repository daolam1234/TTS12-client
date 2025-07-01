import { useOrderDetail } from "@/hooks/useOrder";
import type { OrderStatus } from "@/types/order/order.type";
import { useState } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  CubeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function OrderDetail() {
  const {
    order,
    loading,
    reviewLoading,
    cancelLoading,
    handleCancelOrder,
    handleSubmitReview,
  } = useOrderDetail();
  const [reviewModal, setReviewModal] = useState<{
    open: boolean;
    productId: string | null;
    productName: string;
  }>({ open: false, productId: null, productName: "" });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">
              Chi tiết đơn hàng
            </h1>
            <p className="text-gray-500 mt-2">
              Theo dõi trạng thái và thông tin đơn hàng của bạn.
            </p>
          </div>
          {order?.status === "pending" && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelLoading}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm disabled:opacity-50"
            >
              {cancelLoading ? "Đang huỷ..." : "Huỷ đơn hàng"}
            </button>
          )}
        </header>

        {loading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : !order ? (
          <div className="text-center text-gray-500">
            Không tìm thấy đơn hàng.
          </div>
        ) : (
          <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-800">
                  Mã đơn:{" "}
                  <span className="text-blue-600 font-bold">{order._id}</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Ngày đặt: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Progress Step */}
            {(() => {
              const steps = [
                {
                  key: "pending",
                  label: "Chờ xác nhận",
                  icon: <ClockIcon className="w-5 h-5" />,
                },
                {
                  key: "confirmed",
                  label: "Đã xác nhận",
                  icon: <CheckCircleIcon className="w-5 h-5" />,
                },
                {
                  key: "shipped",
                  label: "Đang giao",
                  icon: <TruckIcon className="w-5 h-5" />,
                },
                {
                  key: "delivered",
                  label: "Đã giao",
                  icon: <CubeIcon className="w-5 h-5" />,
                },
              ];

              const currentStepIndex = steps.findIndex(
                (s) => s.key === order.status
              );
              const isCancelled = order.status === "cancelled";

              return (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    {steps.map((step, index) => {
                      const isActive =
                        index <= currentStepIndex && !isCancelled;
                      return (
                        <div
                          key={step.key}
                          className={`flex flex-col items-center ${
                            isActive ? "text-blue-600" : "text-gray-400"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              isActive
                                ? "border-blue-600 bg-blue-100"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {step.icon}
                          </div>
                          <span className="text-xs mt-1 text-center">
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        isCancelled
                          ? "bg-red-500 w-full"
                          : currentStepIndex === 0
                          ? "w-1/5 bg-blue-600"
                          : currentStepIndex === 1
                          ? "w-2/5 bg-blue-600"
                          : currentStepIndex === 2
                          ? "w-3/5 bg-blue-600"
                          : currentStepIndex === 3
                          ? "w-full bg-green-500"
                          : "w-1/5 bg-blue-600"
                      }`}
                    ></div>
                  </div>
                  {isCancelled && (
                    <div className="text-center text-red-600 font-semibold mt-2 flex items-center justify-center gap-2">
                      <XCircleIcon className="w-5 h-5" />
                      Đơn hàng đã huỷ
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-neutral-700 mb-2">
                Địa chỉ nhận hàng
              </h3>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.fullName} - {order.shippingAddress.phone}
              </p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.addressLine},{" "}
                {order.shippingAddress.ward}, {order.shippingAddress.district},{" "}
                {order.shippingAddress.province}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Giao hàng:{" "}
                <span className="font-medium">{order.shippingMethod.name}</span>{" "}
                ({order.shippingMethod.fee.toLocaleString()}₫) | Thanh toán:{" "}
                <span className="font-medium">
                  {order.payment_method.toUpperCase()}
                </span>
              </p>
            </div>

            {/* Product List */}
            <div>
              <h3 className="font-medium mb-2 text-neutral-700">Sản phẩm</h3>
              <div className="space-y-4">
                {order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 border rounded-lg p-3 bg-white shadow-sm"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="font-semibold text-neutral-800">
                          {item.productName}
                        </h4>
                        {item.variant.size && (
                          <p className="text-sm text-gray-500">
                            Size: {item.variant.size}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        SL: {item.quantity} | Đơn giá:{" "}
                        {item.discountedPrice.toLocaleString()}₫
                      </div>
                    </div>
                    <div className="font-semibold text-neutral-800">
                      {order.status === "delivered" && (
                        <button
                          className="btn"
                          onClick={() =>
                            setReviewModal({
                              open: true,
                              productId: item.productId,
                              productName: item.productName,
                            })
                          }
                        >
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tạm tính:</span>
                <span>
                  {order.subtotal ? order.subtotal.toLocaleString() : "0"}₫
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Phí vận chuyển:</span>
                <span>{order.shippingMethod.fee.toLocaleString()}₫</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>
                    Giảm giá{order.coupon?.code ? ` (${order.coupon.code})` : ""}:
                  </span>
                  <span>-{order.discount.toLocaleString()}₫</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Ghi chú:</span>
                <span>{order.note || "Không có"}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <div className="text-lg font-bold text-neutral-900">Tổng:</div>
                <div className="text-2xl font-bold text-black">
                  {order.final_price.toLocaleString()}₫
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {reviewModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="font-bold mb-2">
              Đánh giá: {reviewModal.productName}
            </h3>
            <div className="flex items-center mb-3">
              <span className="mr-2">Số sao:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }
                  onClick={() => setRating(star)}
                  type="button"
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="w-full border rounded p-2 mb-3"
              rows={3}
              placeholder="Nhận xét của bạn"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200"
                onClick={() =>
                  setReviewModal({
                    open: false,
                    productId: null,
                    productName: "",
                  })
                }
              >
                Đóng
              </button>
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white"
                disabled={reviewLoading}
                onClick={async () => {
                  if (!reviewModal.productId) return;
                  try {
                    await handleSubmitReview(
                      reviewModal.productId,
                      rating,
                      comment
                    );
                    setReviewModal({
                      open: false,
                      productId: null,
                      productName: "",
                    });
                    setRating(5);
                    setComment("");
                  } catch {}
                }}
              >
                {reviewLoading ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
