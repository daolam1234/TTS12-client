
import { useUserUpdate } from "@/hooks/useUser";



export default function Setting() {
     const { user, register, handleSubmit, isSubmitting, handleLogout, onSubmit } = useUserUpdate();

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Chi tiết tài khoản</h2>

                <div className="bg-white p-8 grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={user?.avatar || "https://th.bing.com/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"}
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-stone-200"
                        />
                        <button className="px-4 py-2 text-sm font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-700 transition">
                            Đổi ảnh đại diện
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 mt-5 text-sm font-semibold bg-red-700 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Đăng xuất
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700">Họ và tên</label>
                            <input
                                type="text"
                                {...register("fullName")}
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700">Số điện thoại</label>
                            <input
                                type="text"
                                {...register("phone")}
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-stone-900 text-white font-semibold rounded-lg hover:bg-stone-700 transition disabled:opacity-50"
                            >
                                {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
