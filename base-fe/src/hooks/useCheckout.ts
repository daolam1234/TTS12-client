import { useEffect, useState } from 'react';
// đường dẫn tùy bạn
import type { CartItem } from '@/types/cart/cart.type';
import type { CheckoutData, IOrderItem, IShippingAddress, IShippingMethod, PaymentMethod } from '@/types/order/order.type';
import { validateCoupon } from '@/services/couponService';
import type { Coupon } from '@/types/coupon/coupon';

export const useCheckout = (cartItems: CartItem[]) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingAddress: {
      fullName: '',
      phone: '',
      addressLine: '',
      ward: '',
      district: '',
      province: ''
    },
    shippingMethod: { name: 'Giao hàng nhanh', fee: 30000 },
    payment_method: 'vnpay',
    items: [],
    couponCode: undefined,
    note: ''
  });

  const shippingMethods: IShippingMethod[] = [
    { name: 'Giao hàng nhanh', fee: 30000 },
    { name: 'Giao hàng tiêu chuẩn', fee: 15000 },
    { name: 'Giao hàng tiết kiệm', fee: 10000 }
  ];

  const paymentMethods: { value: PaymentMethod; label: string }[] = [
    { value: 'vnpay', label: 'VNPay' },
    { value: 'cod', label: 'Thanh toán khi nhận hàng' }
  ];

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(data => {
        setProvinces(data);
      });
  }, []);

  useEffect(() => {
    const mappedItems = cartItems.map(item => ({
      productId: item.productId,
      variant: { size: item.size },
      quantity: item.quantity,
      unitPrice: item.price
    }));

    setCheckoutData((prev) => ({
      ...prev,
      items: mappedItems // ✅ dùng đúng field trong type CheckoutData
    }));
  }, [cartItems]);



  const handleAddressChange = (field: keyof IShippingAddress, value: string) => {
    setCheckoutData((prev: CheckoutData) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value
      }
    }));
  };

  const handleProvinceChange = (provinceName: string) => {
    handleAddressChange('province', provinceName);

    fetch(`https://provinces.open-api.vn/api/p/${provinceName}?depth=2`)
      .then(res => res.json())
      .then(data => {
        setDistricts(data.districts);
        setWards([]); // reset ward
      });
  };


  const handleDistrictChange = ( districtName: string) => {
    handleAddressChange('district', districtName);

    fetch(`https://provinces.open-api.vn/api/d/${districtName}?depth=2`)
      .then(res => res.json())
      .then(data => {
        setWards(data.wards);
      });
  };

  const handleWardChange = (wardName: string) => {
    handleAddressChange('ward', wardName);
  };



  const handleShippingMethodChange = (method: IShippingMethod) => {
    setCheckoutData((prev: CheckoutData) => ({
      ...prev,
      shippingMethod: method
    }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setCheckoutData((prev: CheckoutData) => ({
      ...prev,
      payment_method: method
    }));
  };

  const handleCouponChange = async (code: string) => {
    setCheckoutData((prev: CheckoutData) => ({
      ...prev,
      couponCode: code
    }));
    setCouponError(null);
    setAppliedCoupon(null);
    if (!code) return;
    try {
      const coupon = await validateCoupon(code);
      setAppliedCoupon(coupon);
    } catch (err: any) {
      setCouponError(err.response?.data?.message || err.message || 'Mã giảm giá không hợp lệ');
    }
  };


  const calculateSubtotal = () => {
    return checkoutData.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };


  const calculateDiscount = () => {
    if (appliedCoupon) {
      const subtotal = calculateSubtotal();
      return Math.floor(subtotal * appliedCoupon.discount_percent / 100);
    }
    return 0;
  };


  const calculateTotal = () => {
    return calculateSubtotal() + checkoutData.shippingMethod.fee - calculateDiscount();
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return {
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
  };
};
