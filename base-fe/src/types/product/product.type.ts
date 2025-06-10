export type Thumbnail = {
  _id: string;
  url: string;
};

export type Variant = {
  _id: string;
  size: string;
  stock: number;
};
export type ProductCategory = {
  _id: string;
  title: string;
  parent_id: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  product_category_id: string | ProductCategory;
  thumbnails: Thumbnail[];
  variants: Variant[];
  deleted: boolean;
  status: string;
  currentPrice?: number;
  isDiscounted?: boolean;
  discountInfo?: any;
  discountPercentage?: number;
  discountStartDate?: string | null;
  discountEndDate?: string | null;
};