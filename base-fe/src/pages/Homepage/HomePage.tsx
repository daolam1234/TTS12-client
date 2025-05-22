import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/products/ProductCard";

export default function HomePage() {
    return (
        <div>
            {/* <div><Header /></div> */}
            <div><Banner /></div>

            {/* san pham */}
            <section className=" px-10 py-10">
                <header className="flex  justify-between  text-neutral-900 ">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                        NEW ARRIVALS
                    </h1>
                    <a href="#" className="my-auto text-xl font-bold underline">
                        See all items
                    </a>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />

                </div>

            </section>

            {/* dang muc */}
            <section className="px-10 py-10">
                <div className="flex justify-between text-neutral-900 py-10">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                        SHOP BY COLLECTION
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-3 ">
                    <div className="relative group overflow-hidden">
                        <img src="https://static.nike.com.cn/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/04feea87-f4ae-4fb0-88f9-2ee0eaef2603/AS+W+NK+SWSH+MED+SPT+BRA.png"
                            alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition duration-300"></div>
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-bold">WOMENS</div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <img src="https://img01.ztat.net/article/spp-media-p1/837f2ad1ebde4b0abfd46ba01bd6285b/ea12113daf4343e8af5d4b08e5329651.jpg"
                            alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition duration-300"></div>
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-bold">MENS</div>
                    </div>

                    <div className="relative group overflow-hidden">
                        <img src="https://i.pinimg.com/736x/6e/59/c3/6e59c31f1b1352f58e9956e076529c21.jpg"
                            alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition duration-300"></div>
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-bold">KIDS</div>
                    </div>
                </div>
            </section>

            <section className="px-10 py-10  flex flex-col  items-center ">
               <div className="py-5 flex flex-col items-center">
                 <span >
                    Jordan Air Rev
                </span>
                <span className="text-6xl font-extrabold max-md:text-4xl FONTB ">
                    LOCK IN & LET IT FLY
                </span>
                <span >
                    Perfect for the court or the street
                </span>
               </div>
                <button className="bg-black text-white rounded-full w-20 h-10 ">
                    Shop
                </button>
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

            <section className="px-10 py-10">
                <div className="flex justify-between text-neutral-900 ">
                    <div className="text-3xl font-bold max-md:text-4xl FONTB ">
                        OUR NEW COLLECTION
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col py-10  p-4">
                        <img
                            src="https://authentic-shoes.com/wp-content/uploads/2023/04/c47fb3bdcf2f16e4111f11f6563b596d_8cfb645b73464ecdb1c8c6b1f129fd65-600x600.png"
                            alt=""
                            className="w-full h-[500px]  object-cover"
                        />
                        <span className="text-3xl font-bold mt-4">
                            NIKE X SPACE JAM : A NEW LEGACY
                        </span>
                        <span className="mt-2">
                            To celebrate the release of Space Jam: A New Legacy, Nike and Converse have joined forces to create an apparel and footwear collection worthy of Bugs Bunny and LeBron.
                        </span>
                    </div>
                    <div className="flex flex-col py-10 p-4">
                        <img
                            src="https://authentic-shoes.com/wp-content/uploads/2023/04/c47fb3bdcf2f16e4111f11f6563b596d_8cfb645b73464ecdb1c8c6b1f129fd65-600x600.png"
                            alt=""
                            className="w-full h-[500px]  object-cover"
                        />
                        <span className="text-3xl font-bold mt-4">
                            Nike Black History Month
                        </span>
                        <span className="mt-2">
                            Nike is celebrating Black History Month with a new collection highlighted by customizable Air Force 1 sneakers.
                        </span>
                    </div>
                </div>
            </section>

          

            {/* footer */}
            {/* <div><Footer /></div> */}
        </div>

    );
}
