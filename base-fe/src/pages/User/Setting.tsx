export default function Setting() {
    return (
        <div>
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Account Detail </h2>

                <div className="bg-white   p-8 grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="https://th.bing.com/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-stone-200"
                        />
                        <button className="px-4 py-2 text-sm font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-700 transition">
                            Change Avatar
                        </button>
                    </div>

                    <form className="md:col-span-2 grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700">Full name</label>
                            <input
                                type="text"
                                placeholder="Nguyễn Văn A"
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700">Email</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700">Phone</label>
                            <input
                                type="tel"
                                placeholder="0123 456 789"
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700">Shipping Address</label>
                            <textarea
                                placeholder="Số nhà, Đường, Quận/Huyện, Tỉnh/Thành"
                                rows={3}
                                className="mt-1 block w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-stone-900 focus:border-stone-900"
                            />
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-stone-900 text-white font-semibold rounded-lg hover:bg-stone-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
