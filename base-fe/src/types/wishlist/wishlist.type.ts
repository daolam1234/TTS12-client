export type IWishlistProduct = {
  product_id: string;
  addedAt: string; // hoặc Date nếu bạn convert về Date
}

export type IWishlist = {
  _id: string;     // MongoDB document id
  user_id: string;
  products: IWishlistProduct[];
}
