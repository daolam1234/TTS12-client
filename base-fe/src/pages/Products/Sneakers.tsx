import React, { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { useList } from "@/hooks";
import type { Product } from "@/types/product/product.type";
import { useSearchParams, useParams } from "react-router-dom";

export default function Sneakers() {
  const { categoryId: paramCategoryId } = useParams(); // Lấy categoryId từ URL

  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const size = searchParams.get("size") ? Number(searchParams.get("size")) : null;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const sort = searchParams.get("sort") || null;

  const limit = 12;

  const [filters, setFilters] = useState({ page, size, minPrice, maxPrice, sort, categoryId });


  const { data, isLoading, error } = useList({
    resource: "products",
    params: {
      page: filters.page,
      limit,
      ...(filters.categoryId && { product_category_id: filters.categoryId }),
      ...(filters.size && { "variants.size": filters.size }),
      ...(filters.minPrice !== null && { "priceRange.min": filters.minPrice }),
      ...(filters.maxPrice !== null && { "priceRange.max": filters.maxPrice }),
      ...(filters.sort && { sort: filters.sort }),
    }
  });

  const [showSizeFilter, setShowSizeFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);

  const updateFilters = (newFilters: Record<string, any>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const newParams = new URLSearchParams();
    if (updatedFilters.page) newParams.set("page", String(updatedFilters.page));
    if (updatedFilters.size) newParams.set("size", String(updatedFilters.size));
    if (updatedFilters.minPrice !== null) newParams.set("minPrice", String(updatedFilters.minPrice));
    if (updatedFilters.maxPrice !== null) newParams.set("maxPrice", String(updatedFilters.maxPrice));
    if (updatedFilters.sort) newParams.set("sort", updatedFilters.sort);

    setSearchParams(newParams);
  };

  // Khi chọn category, cập nhật cả state và filter


  // Đảm bảo filters.categoryId luôn đồng bộ với categoryId state
  useEffect(() => {
    setFilters({ page, size, minPrice, maxPrice, sort, categoryId });
  }, [page, size, minPrice, maxPrice, sort, categoryId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div className="py-10">
      <span className="text-4xl font-extrabold px-10 py-10 sm:text-6xl sm:text-center">
        NEW ARRIVALS
      </span>

      <div className="flex justify-between items-center px-10 py-6">
        <div className="flex w-full justify-between gap-4 md:hidden">
          <button className="border px-4 py-2 rounded flex items-center gap-2">
            Filters (0)
            <span>∘=∘</span>
          </button>
          {/* <button className="border px-4 py-2 rounded flex items-center gap-2">
            Sort by
            <span>▼</span>
          </button> */}
        </div>

        <div className="hidden md:flex w-full gap-2 flex-wrap">
          {/* <button
            className="border px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setShowSizeFilter((v) => !v)}
          >
            Size <span>▼</span>
          </button> */}
          <button
            className="border px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setShowPriceFilter((v) => !v)}
          >
            Price <span>▼</span>
          </button>
          <button
            className="border px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setShowSortFilter((v) => !v)}
          >
            Sort <span>▼</span>
          </button>
          <div className="flex-1" />

        </div>
      </div>

      {showSizeFilter && (
        <div className="px-10 pb-4">
          <div className="bg-white border rounded shadow p-4 w-64">
            <div className="font-bold mb-2">Chọn size</div>
            <div className="flex flex-wrap gap-2">
              {[23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43].map((s) => (
                <button
                  key={s}
                  className={`border px-3 py-1 rounded ${filters.size === s ? "bg-gray-200" : ""}`}
                  onClick={() => updateFilters({ size: filters.size === s ? null : s, page: 1 })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPriceFilter && (
        <div className="px-10 pb-4">
          <div className="bg-white border rounded shadow p-4 w-64">
            <div className="font-bold mb-2">Sắp xếp theo giá</div>
            <div className="flex flex-col gap-2">
              <button onClick={() => updateFilters({ sort: "price:asc", minPrice: null, maxPrice: null, page: 1 })} className="border px-3 py-1 rounded">
                Giá tăng dần
              </button>
              <button onClick={() => updateFilters({ sort: "price:desc", minPrice: null, maxPrice: null, page: 1 })} className="border px-3 py-1 rounded">
                Giá giảm dần
              </button>
            </div>
          </div>
        </div>
      )}

      {showSortFilter && (
        <div className="px-10 pb-4">
          <div className="bg-white border rounded shadow p-4 w-64">
            <div className="font-bold mb-2">Sắp xếp theo tên</div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => updateFilters({ sort: "title:asc", minPrice: null, maxPrice: null, page: 1 })}
                className="border px-3 py-1 rounded"
              >
                Tên (A - Z)
              </button>
              <button
                onClick={() => updateFilters({ sort: "title:desc", minPrice: null, maxPrice: null, page: 1 })}
                className="border px-3 py-1 rounded"
              >
                Tên (Z - A)
              </button>

            </div>
          </div>
        </div>
      )}

      {/* <div className="px-10 pb-4">
        <select onChange={handleCategoryChange} value={categoryId ?? ""}>
          <option value="">Tất cả</option>
          <option value="6847265b7287bc6f1dad15ac">Men</option>
          <option value="68472a4426f919a84b33eb89">Kids</option>
          <option value="684725e07287bc6f1dad1592">Womens</option>
        </select>
      </div> */}

      <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data?.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="border px-4 py-2 rounded"
          onClick={() => updateFilters({ page: Math.max(1, filters.page - 1) })}
          disabled={filters.page === 1}
        >
          Previous
        </button>
        <span>Page {filters.page}</span>
        <button
          className="border px-4 py-2 rounded"
          onClick={() => updateFilters({ page: filters.page + 1 })}
          disabled={data && data.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}
