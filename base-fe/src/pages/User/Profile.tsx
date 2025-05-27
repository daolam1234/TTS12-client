import ProductCard from "@/components/products/ProductCard";
import type { User } from "@/types/user/user";
import { useEffect, useState } from "react";
import instanceAxios from "@/utils/axios"; 

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
            <div className="flex  py-10 md:px-8 text-xl font-bold max-sm:justify-center max-sm:items-center ">
                <a href="" className="px-4 py-2 rounded hover:underline ">Profile</a>
                <a href="" className="px-4 py-2 rounded hover:underline ">Order</a>
                <a href="" className="px-4 py-2 rounded hover:underline ">Favorite</a>
                <a href="/member/settings" className="px-4 py-2 rounded hover:underline ">Setting</a>
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

            <section className="px-10 py-10">
                <header className="flex justify-between text-neutral-900">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                        Favourites
                    </h1>
                </header>
                <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 py-4">
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>
                </div>
            </section>
        </div>
    )
}