import React, { useState } from "react";
import axios from "@/utils/axios";
import ProductCard from "@/components/products/ProductCard";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/products?keyword=${encodeURIComponent(keyword)}`);
      setResults(res.data?.data?.products || []);
    } catch (err) {
      setError("Không tìm thấy sản phẩm hoặc có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1"
            placeholder="Nhập từ khóa sản phẩm..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Tìm kiếm</button>
        </form>
        {loading && <div>Đang tìm kiếm...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
          {results.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {results.length === 0 && !loading && !error && <div>Không có kết quả.</div>}
      </div>
    </div>
  );
};

export default SearchModal; 