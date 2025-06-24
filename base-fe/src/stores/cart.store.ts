import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart/cart.type";

interface CartState {
  cartItems: CartItem[];

  setCartItems: (items: CartItem[]) => void;
  clearCart: () => void;

  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      setCartItems: (items) => set({ cartItems: items }),
      clearCart: () => set({ cartItems: [] }),

      addToCart: (item) => {
        const cart = get().cartItems;
        const existing = cart.find((i) => i.variantId === item.variantId);

        if (existing) {
          const updated = cart.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
          set({ cartItems: updated });
        } else {
          set({ cartItems: [...cart, item] });
        }
      },

      removeFromCart: (variantId) => {
        set({
          cartItems: get().cartItems.filter((i) => i.variantId !== variantId),
        });
      },

      updateQuantity: (variantId, quantity) => {
        const updated = get().cartItems.map((i) =>
          i.variantId === variantId ? { ...i, quantity } : i
        );
        set({ cartItems: updated });
      },
    }),
    {
      name: "cart-storage", // 👈 tên key trong localStorage
      partialize: (state) => ({ cartItems: state.cartItems }), // chỉ lưu cartItems
    }
  )
);
