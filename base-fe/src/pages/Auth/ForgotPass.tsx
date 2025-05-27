import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";

type Step1Form = {
    email: string;
};

type Step2Form = {
    otp: string;
    password: string;
};

export default function ForgotPass() {
    const [step, setStep] = useState<1 | 2>(1);
    const navigate = useNavigate();

    const step1Form = useForm<Step1Form>();
    const step2Form = useForm<Step2Form>();

    const [email, setEmail] = useState(""); // giữ lại email để dùng trong bước 2

    const sendOtpMutation = useMutation({
        mutationFn: (data: Step1Form) =>
            instanceAxios.post("/auth/forgot-password", { email: data.email }),
        onSuccess: (_, variables) => {
            toast.success("Mã OTP đã được gửi đến email của bạn!");
            setEmail(variables.email);
            setStep(2);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gửi OTP thất bại!");
        },
    });

    const resetPasswordMutation = useMutation({
        mutationFn: (data: Step2Form) =>
            instanceAxios.post("/auth/reset-password", {
                email,
                otp: data.otp,
                password: data.password,
            }),
        onSuccess: () => {
            toast.success("Đặt lại mật khẩu thành công!");
            navigate("/login");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Đặt lại mật khẩu thất bại!");
        },
    });

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>

            {step === 1 && (
                <form
                    onSubmit={step1Form.handleSubmit((data) => sendOtpMutation.mutate(data))}
                    className="space-y-4 w-80"
                >
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            {...step1Form.register("email", { required: true })}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="Nhập email của bạn"
                            disabled={sendOtpMutation.isPending}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-black bg-black text-white py-2 rounded hover:bg-white hover:text-black transition"
                        disabled={sendOtpMutation.isPending}
                    >
                        {sendOtpMutation.isPending ? "Đang gửi..." : "Gửi mã OTP"}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form
                    onSubmit={step2Form.handleSubmit((data) => resetPasswordMutation.mutate(data))}
                    className="space-y-4 w-80"
                >
                    <div>
                        <label className="block mb-1 font-medium">Mã OTP</label>
                        <input
                            type="text"
                            {...step2Form.register("otp", { required: true })}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="Nhập mã OTP"
                            disabled={resetPasswordMutation.isPending}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu mới</label>
                        <input
                            type="password"
                            {...step2Form.register("password", {
                                required: "Vui lòng nhập mật khẩu mới",
                                minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                            })}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="Nhập mật khẩu mới"
                            disabled={resetPasswordMutation.isPending}
                        />
                        {step2Form.formState.errors.password && (
                            <p className="text-red-600 text-sm mt-1">{step2Form.formState.errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-black bg-black text-white py-2 rounded hover:bg-white hover:text-black transition"
                        disabled={resetPasswordMutation.isPending}
                    >
                        {resetPasswordMutation.isPending ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
                    </button>
                </form>
            )}
        </div>
    );
}
