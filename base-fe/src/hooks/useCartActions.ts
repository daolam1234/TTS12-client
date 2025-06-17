import { useState, useRef } from "react";
import { getCart, updateCartItem, removeFromCart } from "@/services/cartService";
import type { CartItem } from "@/types/cart/cart.type";
import { toast } from "react-toastify";

export const useCartActions = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
    const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
    const updateTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    const fetchCart = async () => {
        try {
            const response = await getCart();
            const products = response.products || [];
            const totalPrice = products.reduce((total: number, item: any) => {
                return total + (item.product_id.price * item.quantity);
            }, 0);

            const formattedItems = products.map((p: any) => ({
                productId: p.product_id._id,
                variantId: p.variant_id,
                title: p.product_id.title,
                price: p.product_id.price,
                size: p.variantDetails?.size || "N/A",
                quantity: p.quantity,
                thumbnail: p.product_id.thumbnails?.[0]?.url ?? "",
            }));

            setCartItems(formattedItems);
            setTotalPrice(totalPrice);
        } catch (error) {
            console.error("Error loading cart:", error);
            toast.error("Không thể tải giỏ hàng. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (
        variantId: string,
        productId: string,
        newQuantity: number
    ) => {
        if (newQuantity < 1) {
            const item = cartItems.find(item => item.variantId === variantId);
            if (item) {
                const isConfirmed = window.confirm(
                    `Bạn có muốn xóa "${item.title}" khỏi giỏ hàng?`
                );
                if (isConfirmed) {
                    await handleRemoveItem(variantId, productId);
                }
            }
            return;
        }

        // Optimistic update
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.variantId === variantId 
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        // Update total price immediately
        setTotalPrice(prevTotal => {
            const item = cartItems.find(item => item.variantId === variantId);
            if (!item) return prevTotal;
            
            const priceDifference = (newQuantity - item.quantity) * item.price;
            return prevTotal + priceDifference;
        });

        // Set loading state
        setUpdatingItems(prev => new Set(prev).add(variantId));

        // Call debounced update
        debouncedUpdate(variantId, productId, newQuantity);
    };

    const handleRemoveItem = async (variantId: string, productId: string) => {
        const itemToRemove = cartItems.find(item => item.variantId === variantId);
        if (!itemToRemove) return;

        // Confirm dialog trước khi xóa
        const isConfirmed = window.confirm(
            `Bạn có chắc chắn muốn xóa "${itemToRemove.title}" khỏi giỏ hàng?`
        );
        
        if (!isConfirmed) return;

        // Optimistic update
        setCartItems(prevItems => prevItems.filter(item => item.variantId !== variantId));
        setTotalPrice(prevTotal => prevTotal - (itemToRemove.price * itemToRemove.quantity));

        setRemovingItems(prev => new Set(prev).add(variantId));

        try {
            const response = await removeFromCart({
                product_id: productId,
                variant_id: variantId,
            });

            // Backend trả về populatedCart, cần format lại
            const products = response.products || [];
            const totalPrice = products.reduce((total: number, item: any) => {
                return total + (item.product_id.price * item.quantity);
            }, 0);

            const updatedItems: CartItem[] = products.map((p: any) => ({
                productId: p.product_id._id,
                variantId: p.variant_id,
                title: p.product_id.title,
                price: p.product_id.price,
                size: p.variantDetails?.size || "N/A",
                quantity: p.quantity,
                thumbnail: p.product_id.thumbnails?.[0]?.url ?? "",
            }));

            setCartItems(updatedItems);
            setTotalPrice(totalPrice);

            // Toast thành công
            toast.success(`Đã xóa "${itemToRemove.title}" khỏi giỏ hàng!`);
        } catch (error) {
            console.error("Failed to remove item:", error);
            
            // Revert on error
            setCartItems(prevItems => [...prevItems, itemToRemove]);
            setTotalPrice(prevTotal => prevTotal + (itemToRemove.price * itemToRemove.quantity));
            
            // Toast lỗi
            toast.error("Không thể xóa sản phẩm. Vui lòng thử lại!");
        } finally {
            setRemovingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(variantId);
                return newSet;
            });
        }
    };

    const debouncedUpdate = (variantId: string, productId: string, newQuantity: number) => {
        const existingTimeout = updateTimeouts.current.get(variantId);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
        }

        const timeout = setTimeout(async () => {
            try {
                const response = await updateCartItem({
                    product_id: productId,
                    variant_id: variantId,
                    quantity: newQuantity,
                });

                // Backend trả về populatedCart, cần format lại
                const products = response.products || [];
                const totalPrice = products.reduce((total: number, item: any) => {
                    return total + (item.product_id.price * item.quantity);
                }, 0);

                const updatedItems: CartItem[] = products.map((p: any) => ({
                    productId: p.product_id._id,
                    variantId: p.variant_id,
                    title: p.product_id.title,
                    price: p.product_id.price,
                    size: p.variantDetails?.size || "N/A",
                    quantity: p.quantity,
                    thumbnail: p.product_id.thumbnails?.[0]?.url ?? "",
                }));

                setCartItems(updatedItems);
                setTotalPrice(totalPrice);

                // Toast thành công (chỉ hiển thị khi có thay đổi đáng kể)
             
            } catch (error) {
                console.error("Failed to update quantity:", error);
                
                const originalItem = cartItems.find(item => item.variantId === variantId);
                if (originalItem) {
                    setCartItems(prevItems => 
                        prevItems.map(item => 
                            item.variantId === variantId 
                                ? originalItem
                                : item
                        )
                    );
                    
                    setTotalPrice(prevTotal => {
                        const priceDifference = (originalItem.quantity - newQuantity) * originalItem.price;
                        return prevTotal + priceDifference;
                    });
                }
                
                // Toast lỗi
                toast.error("Không thể cập nhật số lượng. Vui lòng thử lại!");
            } finally {
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(variantId);
                    return newSet;
                });
                
                updateTimeouts.current.delete(variantId);
            }
        }, 500);

        updateTimeouts.current.set(variantId, timeout);
    };

    const cleanup = () => {
        updateTimeouts.current.forEach(timeout => clearTimeout(timeout));
        updateTimeouts.current.clear();
    };

    return {
        // State
        totalPrice,
        cartItems,
        loading,
        updatingItems,
        removingItems,
        
        // Actions
        fetchCart,
        handleUpdateQuantity,
        handleRemoveItem,
        cleanup,
    };
};
