import instanceAxios from "@/utils/axios";

export const addToWishlist = async (product_id: string) => {
  return instanceAxios.post("/wishlist", { product_id });
};

export const removeFromWishlist = async (product_id: string) => {
  return instanceAxios.delete(`/wishlist`, { data: { product_id } });
};