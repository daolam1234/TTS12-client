export interface IProductReview {
  _id: string;
  user_id: string;
  product_id: string;
  rating: number;        // Số sao (1 -> 5)
  comment: string;
  review_date: string;   // ISO date string (hoặc Date nếu bạn parse về Date)
}
