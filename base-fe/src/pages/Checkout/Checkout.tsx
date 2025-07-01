import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Truck, CreditCard, Tag, FileText, ArrowLeft, ShoppingCart } from 'lucide-react';
import type { CheckoutData, IOrderItem } from '@/types/order/order.type';
import { useCartStore } from '@/stores/cart.store';
import { useCheckout } from '@/hooks/useCheckout';
import { createOrder } from '@/services/orderServicets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart as clearCartApi } from '@/services/cartService';
import axios from '@/utils/axios';
import { useState } from 'react';
import { useMyCoupons } from '@/hooks/useMyCoupons';


export default function Checkout() {

  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();

  // Thêm state cho input mã giảm giá
  const [couponInput, setCouponInput] = useState('');

  const {
    checkoutData,
    setCheckoutData,
    shippingMethods,
    paymentMethods,
    provinces,
    districts,
    wards,
    handleAddressChange,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
    handleShippingMethodChange,
    handlePaymentMethodChange,
    handleCouponChange,
    calculateSubtotal,
    calculateDiscount,
    calculateTotal,
    formatCurrency,
    appliedCoupon,
    couponError
  } = useCheckout(cartItems);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkoutData.payment_method === 'vnpay') {
      try {
        // 1. Tạo đơn hàng trước
        const orderRes = await createOrder(checkoutData);
        const orderId = orderRes.data?._id || orderRes.data?.order?._id; // tuỳ backend trả về

        if (!orderId) {
          toast.error('Không lấy được mã đơn hàng!');
          return;
        }

        // 2. Lưu đơn hàng tạm vào localStorage (nếu cần cho callback)
        localStorage.setItem('pendingOrder', JSON.stringify({ ...checkoutData, _id: orderId }));

        // 3. Gọi API backend để lấy link thanh toán VNPay
        const res = await axios.post('/payments/vnpay/create-qr', { orderId });
        if (res.data && res.data.paymentUrl) {
          window.location.href = res.data.paymentUrl; // Redirect sang VNPay
        } else {
          toast.error('Không nhận được link thanh toán từ server');
        }
        return;
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Có lỗi khi tạo đơn hàng/VNPay');
        return;
      }
    }
    // Xử lý các phương thức khác (COD, ...)
    try {
      const response = await createOrder(checkoutData);
      await clearCartApi();
      clearCart();
      toast.success('Đặt hàng thành công');
      navigate('/homepage');
    } catch (error) {
      toast.error('Đặt hàng thất bại');
    }
  };


  const { coupons, loading: loadingCoupons } = useMyCoupons();

  // Lọc mã chưa dùng
  const unusedCoupons = coupons.filter((item) => item.is_used === false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại giỏ hàng
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="text-gray-600 mt-2">Hoàn tất đơn hàng của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Địa chỉ giao hàng
                </CardTitle>
                <CardDescription>
                  Nhập thông tin địa chỉ giao hàng của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <Input
                      value={checkoutData.shippingAddress.fullName}
                      onChange={(e) => handleAddressChange('fullName', e.target.value)}
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <Input
                      value={checkoutData.shippingAddress.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      placeholder="0123456789"
                      type="tel"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ *
                  </label>
                  <Input
                    value={checkoutData.shippingAddress.addressLine}
                    onChange={(e) => handleAddressChange('addressLine', e.target.value)}
                    placeholder="123 Đường ABC"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tỉnh/Thành phố */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỉnh/Thành phố *
                    </label>
                    <Select
                      value={checkoutData.shippingAddress.province}
                      onValueChange={(value) => handleProvinceChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.code} value={province.code.toString()}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quận/Huyện */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quận/Huyện *
                    </label>
                    <Select
                      value={checkoutData.shippingAddress.district}
                      onValueChange={(value) => handleDistrictChange(value)}
                      disabled={!checkoutData.shippingAddress.province}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.code} value={district.code.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phường/Xã */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phường/Xã *
                    </label>
                    <Select
                      value={checkoutData.shippingAddress.ward}
                      onValueChange={(value) => handleWardChange(value)} // value chính là name
                      disabled={!checkoutData.shippingAddress.district}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.code} value={ward.name}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Phương thức giao hàng
                </CardTitle>
                <CardDescription>
                  Chọn phương thức giao hàng phù hợp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <div
                      key={method.name}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${checkoutData.shippingMethod.name === method.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => handleShippingMethodChange(method)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={checkoutData.shippingMethod.name === method.name}
                          onChange={() => handleShippingMethodChange(method)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">Giao hàng trong 2-5 ngày</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(method.fee)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Mã giảm giá
                </CardTitle>
                <CardDescription>
                  Chọn hoặc nhập mã giảm giá bạn đã lưu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Select coupon từ danh sách đã lưu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn mã giảm giá đã lưu:
                  </label>
                  <Select
                    onValueChange={(value) => {
                      setCouponInput(value);
                      handleCouponChange(value);
                    }}
                    value={appliedCoupon?.code || ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mã giảm giá" />
                    </SelectTrigger>
                    <SelectContent>
                      {unusedCoupons.length > 0 ? (
                        unusedCoupons.map((item) => (
                          <SelectItem key={item._id} value={item.code}>
                            {item.code} 
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-500">
                          {loadingCoupons ? 'Đang tải...' : 'Bạn chưa có mã giảm giá'}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hoặc nhập thủ công */}
                <div className="flex gap-3">
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Hoặc nhập mã giảm giá"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleCouponChange(couponInput)}
                  >
                    Áp dụng
                  </Button>
                </div>

                {couponError && (
                  <div className="text-red-500 text-sm mt-2">{couponError}</div>
                )}
                {appliedCoupon && (
                  <div className="text-green-600 text-sm mt-2">
                    Áp dụng mã {appliedCoupon.code}: Giảm {appliedCoupon.discount_percent}%
                  </div>
                )}
              </CardContent>
            </Card>


          

            {/* Note */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Ghi chú
                </CardTitle>
                <CardDescription>
                  Thêm ghi chú cho đơn hàng (tùy chọn)
                 Coupon Code
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Mã giảm giá
                </CardTitle>
                <CardDescription>
                  Nhập mã giảm giá nếu có
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1"
                  />
                  <Button variant="outline" type="button" onClick={() => handleCouponChange(couponInput)}>
                    Áp dụng
                  </Button>
                </div>
                {couponError && (
                  <div className="text-red-500 text-sm mt-2">{couponError}</div>
                )}
                {appliedCoupon && (
                  <div className="text-green-600 text-sm mt-2">
                    Áp dụng mã thành công: Giảm {appliedCoupon.discount_percent}%
                  </div>
                )}
              </CardContent>
            </Card> </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={checkoutData.note}
                  onChange={(e) => setCheckoutData((prev: CheckoutData) => ({ ...prev, note: e.target.value }))}
                  placeholder="Giao giờ hành chính, gọi trước khi giao hàng..."
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Tóm tắt đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}

                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>{formatCurrency(checkoutData.shippingMethod.fee)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>
                        Giảm giá{appliedCoupon.code ? ` (${appliedCoupon.code})` : ""}:
                      </span>
                      <span>-{formatCurrency(calculateDiscount())}</span>
                    </div>
                  )}

                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="btn" size="lg">
                  Đặt hàng ngay
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Bằng cách đặt hàng, bạn đồng ý với{' '}
                  <a href="#" className="text-red-600 hover:underline">
                    Điều khoản sử dụng
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-red-600 hover:underline">
                    Chính sách bảo mật
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

