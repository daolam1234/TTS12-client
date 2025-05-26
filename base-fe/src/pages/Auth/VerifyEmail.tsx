import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import instanceAxios from "@/utils/axios";

export default function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        instanceAxios
            .get(`/auth/verify-email/${token}`)
            .then((res) => {
                setMessage(res.data.message || "Xác thực thành công!");
                setTimeout(() => navigate("/login"), 2000);
            })
            .catch((err) => {
                setMessage(
                    err.response?.data?.message || "Xác thực thất bại hoặc link đã hết hạn."
                );
            })
            .finally(() => setLoading(false));
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow text-center">
                <h2 className="text-2xl font-bold mb-4">Xác thực email</h2>
                <p>
                  {loading ? "Đang chờ xác thực..." : message}
                </p>
            </div>
        </div>
    );
}