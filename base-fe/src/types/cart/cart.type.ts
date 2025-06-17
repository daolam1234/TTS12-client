export type CartItem = {
    
    productId: string;
    title: string;
    price: number;
    variantId: string;
    thumbnail: string;      // Lấy ảnh đầu tiên từ mảng thumbnails
    size: string;
    quantity: number;       // Số lượng người dùng đã thêm vào giỏ
};

export type AddCart = {
    
  product_id: string;
  variant_id: string;
  quantity: number;
};

