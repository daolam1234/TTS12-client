import instanceAxios from "@/utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormValuesUpdate, User } from "@/types/user/user";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export const useUserUpdate = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<FormValuesUpdate>();

    // Fetch user profile
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await instanceAxios.get("/user/profile");
                setUser(res.data.data);
                reset({
                    fullName: res.data.data.fullName,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                });
            } catch (error) {
                setUser(null);
            }
        }
        fetchUser();
    }, [reset]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    const onSubmit = async (data: FormValuesUpdate) => {
        try {
            const res = await instanceAxios.put("/user/update-info-user", data);
            toast.success("Cập nhật thông tin thành công!");
            setUser(res.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
        }
    };

    return {
        user,
        register,
        handleSubmit,
        reset,
        isSubmitting,
        handleLogout,
        onSubmit,
    };
}
