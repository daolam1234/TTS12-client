import ProductCard from "@/components/products/ProductCard";


export default function Cart() {
    const cartItems = [
        {
            id: 1,
            name: "Nike TC 7900",
            desc: "Women's shoes",
            color: "Wolf Grey/Photon Dust/Metallic Platinum",
            size: "38.5",
            price: 3519000,
            salePrice: 2815199,
            img: "https://www.bing.com/th?id=OPAC.U6BRwvQ%2fld2CLg474C474&o=5&pid=21.1&w=209&h=209&qlt=100&dpr=1.4",
            quantity: 1,
            lowStock: true,
        },
        {
            id: 2,
            name: "Nike TC 7900",
            desc: "Women's shoes",
            color: "Wolf Grey/Photon Dust/Metallic Platinum",
            size: "38.5",
            price: 3519000,
            salePrice: 2815199,
            img: "https://www.bing.com/th?id=OPAC.U6BRwvQ%2fld2CLg474C474&o=5&pid=21.1&w=209&h=209&qlt=100&dpr=1.4",
            quantity: 1,
            lowStock: true,
        },
    ];

    return (
        <div className="bg-white min-h-screen px-4 py-10 ">
            <div className="max-w-5xl mx-auto flex gap-10 max-sm:flex-col ">
                <div className="w-1/2 max-sm:w-full">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-6 border-b pb-6 mb-6">
                            <div>
                                <img src={item.img} alt={item.name} className="w-36 h-36 object-contain rounded" />
                                <div className="flex justify-center items-center gap-2">
                                    <button className="border rounded-full w-8 h-8 text-lg">−</button>
                                    <span>0</span>
                                    <button className="border rounded-full w-8 h-8 text-lg">+</button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="font-bold text-lg">{item.name}</div>
                                        <div className="text-gray-500 text-sm">{item.desc}</div>
                                        <div className="text-gray-500 text-sm">{item.color}</div>
                                        <div className="text-sm mt-1">
                                            Size <span className="underline">{item.size}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="line-through text-gray-400 text-sm">{item.price.toLocaleString()}₫</div>
                                        <div className="font-bold text-lg text-black">{item.salePrice.toLocaleString()}₫</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">


                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Tổng tiền */}
                <div className="w-full max-w-sm bg-gray-50 p-6 rounded-xl shadow-sm space-y-3 ml-auto">
                    <div className="flex justify-between">
                        <span>Order Subtotal</span>
                        <span>{cartItems[0].salePrice.toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Sales Tax</span>
                        <span>0₫</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>0₫</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Order Total</span>
                        <span>{cartItems[0].salePrice.toLocaleString()}₫</span>
                    </div>
                    <button className="btn ">
                        Checkout →
                    </button>
                </div>
            </div>

            {/* like */}
            <section className="px-10 py-10">
                <header className="flex justify-between text-neutral-900">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                        FAVORITE
                    </h1>
                </header>

                <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 py-4">
                    <div className="min-w-[280px] max-w-xs flex-shrink-0">
                        <ProductCard />
                    </div>

                </div>
            </section>

            {/* trend */}
            <section className="px-10 py-10">
                <header className="flex justify-between text-neutral-900">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                        TRENDING NOW
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
    );
}


