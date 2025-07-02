// src/pages/Cart/Cart.tsx
import { useEffect } from "react";
import { useCartActions, useList } from "@/hooks";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product/product.type";

export default function Cart() {
    const navigate = useNavigate();
    const {
        totalPrice,
        cartItems,
        loading,
        updatingItems,
        removingItems,
        fetchCart,
        handleUpdateQuantity,
        handleRemoveItem,
        cleanup,
    } = useCartActions();

    useEffect(() => {
        fetchCart();

        // Cleanup function để clear timeouts khi component unmount
        return cleanup;
    }, []);

    const { data } = useList({ resource: "products" });

    // Lấy đúng mảng sản phẩm từ response
    const products = data || [];

    return (
        <div className="bg-white min-h-screen px-4 py-10">
            <div className="max-w-5xl mx-auto flex gap-10 max-sm:flex-col">
                {/* Cart List */}
                <div className="w-1/2 max-sm:w-full mt-6">
                    <h2 className="text-3xl font-bold mb-10">Shopping Cart</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.variantId}
                                className="flex gap-6 border-b pb-6 mb-6"
                            >
                                <div>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-36 h-36 object-contain rounded"
                                    />
                                    <div className="flex justify-center items-center gap-2 mt-2">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.variantId, item.productId, item.quantity - 1)}
                                            className="border rounded-full w-8 h-8 text-lg hover:bg-gray-50 flex items-center justify-center relative"
                                        >
                                            {updatingItems.has(item.variantId) && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <span className={updatingItems.has(item.variantId) ? "opacity-0" : ""}>−</span>
                                        </button>
                                        <span className="min-w-[20px] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.variantId, item.productId, item.quantity + 1)}
                                            className="border rounded-full w-8 h-8 text-lg hover:bg-gray-50 flex items-center justify-center relative"
                                        >
                                            {updatingItems.has(item.variantId) && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <span className={updatingItems.has(item.variantId) ? "opacity-0" : ""}>+</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="font-bold text-2xl">{item.title}</div>
                                            <div className="font-semibold text-lg text-black">
                                                {item.price.toLocaleString()}₫
                                            </div>
                                            <div className="text mt-1">
                                                Size: <span className="font-semibold text-red-400">{item.size}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <button
                                                onClick={() => handleRemoveItem(item.variantId, item.productId)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={removingItems.has(item.variantId)}
                                            >
                                                {removingItems.has(item.variantId) ? "Đang xóa..." : "Xóa"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary */}
                {!loading && cartItems.length > 0 && (
                    <div className="w-full max-w-sm bg-gray-50 p-6 rounded-xl shadow-sm space-y-3 ml-auto max-sm:ml-0">
                        <h2 className="text-3xl font-bold mb-10">Order Summary</h2>
                        
                        
                        <hr />
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Order Total</span>
                            <span>{totalPrice.toLocaleString()}₫</span>
                        </div>
                        <button className="btn w-full mt-4" onClick={() => navigate('/checkout')}>Checkout →</button>
                    </div>
                )}

                
            
            </div>
            {/* trend */}
            <section className="px-10 py-10">
                <header className="flex justify-between text-neutral-900">
                    <h1 className="text-3xl font-bold max-md:text-4xl">
                    BẠN CÓ THỂ THÍCH
                    </h1>
                </header>

                <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 py-4">
                    {products.map((product: Product) => (
                        <div className="min-w-[380px] max-w-xs flex-shrink-0" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
