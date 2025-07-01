import { Button, Result } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { createOrder } from '@/services/orderServicets'; // Đúng path của bạn

const CheckPaymentVNPay = () => {
    const [searchParams] = useSearchParams()
    const [status , setStatus ] = useState<"success" | "error"> ("error")
    const [title, setTitle] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8888/api/payments/vnpay/callback?${searchParams.toString()}`
                );

                const resultCode = data?.vnp_ResponseCode;
                if (resultCode === "00") {
                    setStatus("success");
                    setTitle("Thanh toán thành công");

                    // 🟢 Sau khi thanh toán thành công, tạo đơn hàng tại đây
                    const stored = localStorage.getItem("pendingOrder");
                    if (stored) {
                        const parsedOrder = JSON.parse(stored);
                        try {
                            const created = await createOrder(parsedOrder);
                            localStorage.removeItem("pendingOrder");
                            navigate("/user/order", { replace: true });
                        } catch (err) {
                            console.error("❌ Lỗi tạo đơn sau khi thanh toán:", err);
                        }
                    }

                } else if (resultCode === "24") {
                    setStatus("error");
                    setTitle("Khách hàng đã huỷ thanh toán");
                } else {
                    setStatus("error");
                    setTitle("Thanh toán thất bại");
                }

            } catch (error) {
                setStatus("error");
                setTitle("Lỗi xác thực thanh toán");
            }
        })();
    }, [searchParams]);

    return (
        <div>
            <Result
                status={status}
                title={title}
                subTitle="Cảm ơn bạn đã mua hàng"
                extra={[
                    <Button type="primary" key="home" onClick={() => navigate("/")}>
                        Về trang chủ
                    </Button>,
                ]}
            />
        </div>
    );
};

export default CheckPaymentVNPay;
