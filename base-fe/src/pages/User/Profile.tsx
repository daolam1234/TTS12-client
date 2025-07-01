import ProductCard from "@/components/products/ProductCard";
import type { User } from "@/types/user/user";
import { useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import { NavigationMember } from "@/components/nav/navMember";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await instanceAxios.get("/user/profile");
                setUser(res.data.data);
            } catch (error) {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-10 py-10">
                <NavigationMember />
            </div>
            <div className=" gap-8 px-8 py-10 bg-white rounded-xl flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
                <img
                    src={user?.avatar || "https://th.bing.com/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow"
                />
                <div className="flex flex-col gap-3 ">
                    <div><span className="font-semibold">Họ và tên:</span> <span className="text-gray-700">{user?.fullName || "..."}</span></div>
                    <div><span className="font-semibold">Email:</span> <span className="text-gray-700">{user?.email || "..."}</span></div>
                    <div><span className="font-semibold">Trạng thái:</span> <span className="text-gray-700">{user?.status || "..."}</span></div>
                    <div><span className="font-semibold">Email:</span> <span className="text-gray-700">{user?.email || "..."}</span></div>
                </div>
            </div>

        </div>
    )
}