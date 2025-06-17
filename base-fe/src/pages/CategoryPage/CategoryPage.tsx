import React, { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { useList } from "@/hooks";
import type { Product } from "@/types/product/product.type";
import { useSearchParams, useParams, Link } from "react-router-dom";

export default function CategoryPage() {
  const { id: categoryId } = useParams(); // Lấy id từ URL
  const [categoryData, setCategoryData] = useState<any>(null);


  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const size = searchParams.get("size") ? Number(searchParams.get("size")) : null;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const sort = searchParams.get("sort") || null;

  const limit = 12;

  const [filters, setFilters] = useState({
    page,
    size,
    minPrice,
    maxPrice,
    sort,
    categoryId,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {

        const res = await fetch(`http://localhost:8888/api/categories/${categoryId}`);
        const json = await res.json();
        setCategoryData(json.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (categoryId) fetchCategory();
  }, [categoryId]);

  // Đồng bộ filters với categoryId mới
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      page,
      size,
      minPrice,
      maxPrice,
      sort,
      categoryId,
    }));
  }, [page, size, minPrice, maxPrice, sort, categoryId]);

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

  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);

  const handleSortChange = (value: string) => {
    updateFilters({
      sort: value,
      page: 1,
    });
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div className="flex gap-6 px-10 py-10">
      {/* === SIDEBAR === */}
      <div className="w-64 p-4 bg-white rounded-lg shadow space-y-6 border border-gray-200">
        {/* === FILTER: PRICE ===
        <div>
          <h3
            className="font-semibold mb-2 cursor-pointer flex justify-between items-center"
            onClick={() => setShowPriceFilter(!showPriceFilter)}
          >
            Giá <span>{showPriceFilter ? "▲" : "▼"}</span>
          </h3>
          {showPriceFilter && (
            <div className="space-y-2 pl-1">
              {[
                { label: "100,000₫ - 1,000,000₫", min: 100000, max: 1000000 },
                { label: "1,000,000₫ - 2,000,000₫", min: 1000000, max: 2000000 },
                { label: "2,000,000₫ - 4,000,000₫", min: 2000000, max: 4000000 },
                { label: "Trên 4,000,000₫", min: 4000000, max: 1000000000 },
              ].map((range, index) => (
                <label key={index} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={
                      filters.minPrice === range.min &&
                      filters.maxPrice === range.max
                    }
                    onChange={() => handlePriceChange(range.min, range.max)}
                  />
                  {range.label}
                </label>
              ))}
            </div>
          )}
        </div> */}

        {/* === FILTER: SIZE ===
        <div>
          <h3
            className="font-semibold mb-2 cursor-pointer flex justify-between items-center"
            onClick={() => setShowSizeFilter(!showSizeFilter)}
          >
            Size <span>{showSizeFilter ? "▲" : "▼"}</span>
          </h3>
          {showSizeFilter && (
            <div className="space-y-2 pl-1">
              {["38", "39", "40", "41", "42"].map((sizeOption) => (
                <label key={sizeOption} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.size === sizeOption}
                    onChange={() => handleSizeToggle(sizeOption)}
                  />
                  {sizeOption}
                </label>
              ))}
            </div>
          )}
        </div> */}

        {/* === SORT OPTIONS === */}
        <div>
          <h3
            className="font-semibold mb-2 cursor-pointer flex justify-between items-center"
            onClick={() => setShowSortFilter(!showSortFilter)}
          >
            Sắp xếp <span>{showSortFilter ? "▲" : "▼"}</span>
          </h3>
          {showSortFilter && (
            <div className="space-y-2 pl-1">
              {[
                { label: "Giá tăng dần", value: "price:asc" },
                { label: "Giá giảm dần", value: "price:desc" },
                { label: "Tên (A - Z)", value: "title:asc" },
                { label: "Tên (Z - A)", value: "title:desc" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="sort"
                    checked={filters.sort === option.value}
                    onChange={() => handleSortChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        {/* === PRODUCT LIST === */}
        <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {categoryData.products?.map((product: Product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard product={product} />
            </Link>
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


    </div>
  );
}
