import { useState, useRef } from "react";
import { getCart, updateCartItem, removeFromCart as removeFromCartAPI } from "@/services/cartService";
import type { CartItem } from "@/types/cart/cart.type";
import { toast } from "react-toastify";
import { useCartStore } from "@/stores/cart.store";

export const useCartActions = () => {
    const {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCartStore();
    const [loading, setLoading] = useState(true);
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
    const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
    const updateTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    // Calculate total price from cartItems
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await getCart();
            const products = response.products || [];
            const formattedItems: CartItem[] = products.map((p: any) => ({
                productId: p.product_id._id,
                variantId: p.variant_id,
                title: p.product_id.title,
                price: p.product_id.price,
                size: p.variantDetails?.size || "N/A",
                quantity: p.quantity,
                thumbnail: p.product_id.thumbnails?.[0]?.url ?? "",
            }));
            setCartItems(formattedItems);
        } catch (error) {
            toast.error("Không thể tải giỏ hàng. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = (variantId: string, productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            const item = cartItems.find(item => item.variantId === variantId);
            if (item) {
               
                    handleRemoveItem(variantId, productId);
                
            }
            return;
        }
        setUpdatingItems(prev => new Set(prev).add(variantId));
        updateQuantity(variantId, newQuantity);
        debouncedUpdate(variantId, productId, newQuantity);
    };

    const handleRemoveItem = (variantId: string, productId: string) => {
        const itemToRemove = cartItems.find(item => item.variantId === variantId);
        if (!itemToRemove) return;
        const isConfirmed = window.confirm(
            `Bạn có chắc chắn muốn xóa "${itemToRemove.title}" khỏi giỏ hàng?`
        );
        if (!isConfirmed) return;
        setRemovingItems(prev => new Set(prev).add(variantId));
        removeFromCart(variantId);
        removeFromCartAPI({ product_id: productId, variant_id: variantId })
            .then((response) => {
                const products = response.products || [];
                const formattedItems: CartItem[] = products.map((p: any) => ({
                    productId: p.product_id._id,
                    variantId: p.variant_id,
                    title: p.product_id.title,
                    price: p.product_id.price,
                    size: p.variantDetails?.size || "N/A",
                    quantity: p.quantity,
                    thumbnail: p.product_id.thumbnails?.[0]?.url ?? "",
                }));
                setCartItems(formattedItems);
                toast.success(`Đã xóa "${itemToRemove.title}" khỏi giỏ hàng!`);
            })
            .catch(() => {
                addToCart(itemToRemove);
                toast.error("Không thể xóa sản phẩm. Vui lòng thử lại!");
            })
            .finally(() => {
                setRemovingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(variantId);
                    return newSet;
                });
            });
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
                const products = response.products || [];
                const formattedItems: CartItem[] = products.map((p: any) => ({
                    productId: p.product_id._id,
                    variantId: p.variant_id,
                    title: p.product_id.title,
                    price: p.product_id.price,
                    size: p.variantDetails?.size || "N/A",
                    quantity: p.quantity,
                    thumbnail: p.product_id.thumbnails?.[0]?.url ?? "",
                }));
                setCartItems(formattedItems);
            } catch (error) {
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
        cartItems,
        loading,
        updatingItems,
        removingItems,
        fetchCart,
        handleUpdateQuantity,
        handleRemoveItem,
        cleanup,
        totalPrice,
    };
};
