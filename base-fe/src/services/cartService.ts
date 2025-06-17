import axios from "axios";
import instanceAxios from "@/utils/axios";
import type { AddCart } from "@/types/cart/cart.type";

export const addToCart = async (data: AddCart) => {
  const res = await instanceAxios.post("cart/add", data);
  return res.data;
};

export const getCart = async () => {
  const res = await instanceAxios.get("cart");
  return res.data.data; // Trả về populatedCart object
};

export async function updateCartItem(data: {
  product_id: string;
  variant_id: string;
  quantity: number;
}) {
  const res = await instanceAxios.put("/cart/update", data);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to update cart item");
  }

  return res.data.data; // Trả về populatedCart object
}

export async function removeFromCart(data: {
  product_id: string;
  variant_id: string;
}) {
  const res = await instanceAxios.delete("/cart/delete", { data });

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to remove cart item");
  }

  return res.data.data; // Trả về populatedCart object
}

