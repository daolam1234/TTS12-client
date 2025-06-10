import type { Product } from "@/types/product/product.type";

// ProductCard.tsx

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.thumbnails[0]?.url || "/default-image.jpg"}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-neutral-700">
        {product.price?.toLocaleString("vi-VN")} ₫
      </p>
    </div>
  );
}