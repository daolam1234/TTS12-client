import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instanceAxios from "@/utils/axios";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product/product.type";

export default function Favorites() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await instanceAxios.get("/wishlist");
        setData(res.data.data || []); // Sửa ở đây: lấy từ res.data.data
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 px-10">Danh sách yêu thích</h1>
      <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`}>
            <ProductCard product={product as Product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
