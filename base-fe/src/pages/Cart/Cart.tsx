// src/pages/Cart/Cart.tsx
import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeFromCart } from "@/services/cartService";
import type { CartItem } from "@/types/cart/cart.type";


export default function Cart() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set()); // Track which items are being updated

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart();
                const products = response.products || [];
                const total = response.totalPrice || 0;



                const formattedItems = products.map((p: any) => ({
                    productId: p.product_id._id,
                    variantId: p.variant_id,
                    title: p.product_id.title,
                    price: p.product_id.price,
                    size: p.variantDetails.size,
                    quantity: p.quantity,
                    thumbnail: p.product_id.thumbnails[0]?.url ?? "",
                }));

                setCartItems(formattedItems);
                setTotalPrice(total);
            } catch (error) {
                console.error("Error loading cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleUpdateQuantity = async (
        variantId: string,
        productId: string,
        newQuantity: number
    ) => {
        if (newQuantity < 1) {
            // Nếu quantity = 0, có thể hiển thị confirm dialog để xóa item
            if (confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
                await handleRemoveItem(variantId, productId);
            }
            return;
        }

        // Set loading state for this specific item
        setUpdatingItems(prev => new Set(prev).add(variantId));

        try {
            const response = await updateCartItem({
                product_id: productId,
                variant_id: variantId,
                quantity: newQuantity,
            });

            // Backend trả về: { products, totalPrice }
            const { products, totalPrice } = response;

            const updatedItems: CartItem[] = products.map((p: any) => ({
                productId: p.product_id._id,
                variantId: p.variant_id,
                title: p.product_id.title,
                price: p.product_id.price,
                size: p.variantDetails.size,
                quantity: p.quantity,
                thumbnail: p.product_id.thumbnails[0]?.url ?? "",
            }));

            setCartItems(updatedItems);
            setTotalPrice(totalPrice);
        } catch (error) {
            console.error("Failed to update quantity:", error);
            // Có thể thêm toast notification ở đây
            alert("Không thể cập nhật số lượng. Vui lòng thử lại!");
        } finally {
            // Remove loading state for this item
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(variantId);
                return newSet;
            });
        }
    };

    const handleRemoveItem = async (variantId: string, productId: string) => {
        // Set loading state for this specific item
        setUpdatingItems(prev => new Set(prev).add(variantId));

        try {
            const response = await removeFromCart({
                product_id: productId,
                variant_id: variantId,
            });

            // Backend trả về: { products, totalPrice }
            const { products, totalPrice } = response;

            const updatedItems: CartItem[] = products.map((p: any) => ({
                productId: p.product_id._id,
                variantId: p.variant_id,
                title: p.product_id.title,
                price: p.product_id.price,
                size: p.variantDetails.size,
                quantity: p.quantity,
                thumbnail: p.product_id.thumbnails[0]?.url ?? "",
            }));

            setCartItems(updatedItems);
            setTotalPrice(totalPrice);
        } catch (error) {
            console.error("Failed to remove item:", error);
            alert("Không thể xóa sản phẩm. Vui lòng thử lại!");
        } finally {
            // Remove loading state for this item
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(variantId);
                return newSet;
            });
        }
    };

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
                                            className="border rounded-full w-8 h-8 text-lg disabled:opacity-50"
                                            disabled={updatingItems.has(item.variantId)}
                                        >
                                            {updatingItems.has(item.variantId) ? "..." : "−"}
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.variantId, item.productId, item.quantity + 1)}
                                            className="border rounded-full w-8 h-8 text-lg disabled:opacity-50"
                                            disabled={updatingItems.has(item.variantId)}
                                        >
                                            {updatingItems.has(item.variantId) ? "..." : "+"}
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
                                                className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                                                disabled={updatingItems.has(item.variantId)}
                                            >
                                                {updatingItems.has(item.variantId) ? "Đang xóa..." : "Xóa"}
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
                        <div className="flex justify-between">
                            <span>Order Subtotal</span>
                            <span>{totalPrice.toLocaleString()}₫</span>
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
                            <span>{totalPrice.toLocaleString()}₫</span>
                        </div>
                        <button className="btn w-full mt-4">Checkout →</button>
                    </div>
                )}
            </div>
        </div>
    );
}
