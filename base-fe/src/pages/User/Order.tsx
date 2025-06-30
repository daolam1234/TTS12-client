import { useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import type { IOrder } from "@/types/order/order.type";

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersRes = await instanceAxios.get("/orders");
        setOrders(ordersRes.data.data || []);
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipping":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900">
            Đơn hàng của bạn
          </h1>
        </header>

        {loading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">
            Bạn chưa có đơn hàng nào.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col gap-4 p-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-2xl text-gray-500">
                        Mã đơn:{" "}
                        <span className="font-medium text-blue-500">
                          {order._id}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Ngày đặt: {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span
                        className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium 
                        ${getStatusStyle(order.status)} capitalize`}
                      >
                        Trạng thái: {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium text-neutral-700">
                      Địa chỉ nhận hàng
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.shippingAddress.fullName} -{" "}
                      {order.shippingAddress.phone}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.shippingAddress.addressLine},{" "}
                      {order.shippingAddress.ward},{" "}
                      {order.shippingAddress.district},{" "}
                      {order.shippingAddress.province}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Giao hàng:{" "}
                      <span className="font-medium">
                        {order.shippingMethod.name}
                      </span>{" "}
                      ({order.shippingMethod.fee.toLocaleString()}₫) - Thanh
                      toán:{" "}
                      <span className="font-medium">
                        {order.payment_method.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Product List */}
                  <div>
                    <div className="font-medium mb-2">Sản phẩm</div>
                    <div className="flex flex-col gap-4">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                          <div className="flex flex-col justify-between">
                            <div>
                              <div className="font-semibold">
                                {item.productName}
                              </div>
                              {item.variant.size && (
                                <div className="text-sm text-gray-500">
                                  Size: {item.variant.size}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              SL: {item.quantity} | Đơn giá:{" "}
                              {item.discountedPrice.toLocaleString()}₫
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center border-t pt-4">
                    <div className="text-sm text-gray-500">
                      Ghi chú: {order.note ? order.note : "Không có"}
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      Tổng: {order.final_price.toLocaleString()}₫
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
