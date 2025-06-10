import ProductCard from "@/components/products/ProductCard";
import { useList } from "@/hooks";



export default function ProductDetail() {

    return (

        <div className="px-10 py-10">
            <div className=" flex flex-col md:flex-row gap-10">

                <div className="flex-1 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1.jpg" alt="" className="w-full aspect-square object-cover rounded" />
                        <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2.jpg" alt="" className="w-full aspect-square object-cover rounded" />
                        <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3.jpg" alt="" className="w-full aspect-square object-cover rounded" />
                        <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4.jpg" alt="" className="w-full aspect-square object-cover rounded" />
                    </div>
                    <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5.jpg" alt="" className="w-full aspect-video object-cover rounded" />
                </div>


                <div className="flex-1 flex flex-col gap-4">
                    <span className="text-sm text-gray-500">Men's shoes</span>
                    <h1 className="text-3xl font-extrabold">AIR JORDAN 1 RETRO LOW VOODOO</h1>
                    <span className="text-2xl font-bold mb-2">104,99€</span>
                    <p className="text-gray-700">
                        New signature release for NBA player Zion Williamson, as he gets his first collaboration on a sneaker.
                    </p>
                    <p className="text-gray-700">
                        The Air Jordan 1 Retro Low OG Zion Williamson Voodoo features a highly intricate design with a voodoo doll-inspired theme...
                        <button className="text-blue-600 underline ml-1">See more...</button>
                    </p>

                    <div className="grid grid-cols-6 gap-2 my-4">
                        {["4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13", "14", "15"].map((size, idx) => (
                            <button
                                key={size}
                                className={`border rounded py-2 font-semibold ${idx === 16 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:border-black"}`}
                                disabled={idx === 16}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex border rounded">
                            <button className="px-3 py-2">-</button>
                            <span className="px-4 py-2">1</span>
                            <button className="px-3 py-2">+</button>
                        </div>
                        <button className="flex-1 bg-black text-white py-3 rounded font-bold text-lg hover:bg-gray-800 transition">
                            ADD TO CART
                        </button>
                    </div>
                    <button className="flex items-center justify-center border border-black py-3 rounded font-bold text-lg gap-2 hover:bg-gray-100 transition">
                        <span>♥</span> REMOVE TO THE WISHLIST
                    </button>


                </div>


            </div>
            <section className="px-10 py-10">
                <header className="flex justify-between text-neutral-900">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                        YOU MAY ALSO LIKE
                    </h1>
                </header>

                {/* <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 py-4">
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
                </div> */}
            </section>
        </div>
    );
};

