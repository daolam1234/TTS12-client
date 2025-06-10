import ProductCard from "@/components/products/ProductCard";
import { useOne } from "@/hooks";
import type { Product } from "@/types/product/product.type";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

export default function ProductDetail() {
    const { id } = useParams();
    const { data, isLoading } = useOne({ resource: "products", id });
    const product: Product | undefined = data?.data?.product;

    const [thumbnails, setthumbnails] = useState(0);

    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Không tìm thấy sản phẩm</div>;

    return (

        <div className="px-10 py-10">
            <div className=" flex flex-col md:flex-row gap-10">

                <div className="flex-1 flex flex-col gap-4">
                    {/* Ảnh chính */}
                    <img
                        src={product.thumbnails?.[thumbnails]?.url || "/default-image.jpg"}
                        alt={product.title}
                        className="w-full aspect-square object-cover rounded"
                    />
                    {/* Các ảnh nhỏ */}
                    <div className="grid grid-cols-4 gap-4">
                        {product.thumbnails?.map((thumb, i) => (
                            <img
                                key={thumb._id || i}
                                src={thumb.url}
                                alt={`${product.title} thumbnail ${i + 1}`}
                                className={`w-full aspect-square object-cover rounded cursor-pointer border ${thumbnails === i ? "border-black" : "border-transparent"}`}
                                onClick={() => setthumbnails(i)}
                            />
                        ))}
                    </div>
                </div>


                <div className="flex-1 flex flex-col gap-4">
                    <span className="text-sm text-gray-500">
                        {typeof product.product_category_id === "object"
                            ? product.product_category_id.title
                            : "Danh mục"}
                    </span>
                    <h1 className="text-3xl font-extrabold">{product.title}</h1>
                    <span className="text-2xl font-bold mb-2">
                        {product.price?.toLocaleString()}₫
                    </span>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-gray-700">
                        The Air Jordan 1 Retro Low OG Zion Williamson Voodoo features a highly intricate design with a voodoo doll-inspired theme...
                        <button className="text-blue-600 underline ml-1">See more...</button>
                    </p>

                    <div className="grid grid-cols-6 gap-2 my-4">
                        {product.variants?.map((variant) => (
                            <button
                                key={variant._id}
                                className={`border rounded py-2 font-semibold ${variant.stock === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:border-black"}`}
                                disabled={variant.stock === 0}
                            >
                                {variant.size}
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

