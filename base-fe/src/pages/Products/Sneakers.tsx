import ProductCard from "@/components/products/ProductCard";
import { useList } from "@/hooks";



export default function Sneakers() {

  return (
    <div className="py-10">
      <span className="text-4xl font-extrabold px-10 py-10  sm:text-6xl sm:text-center ">
        NEW ARIVALS
      </span>

      <div className="flex justify-between items-center px-10 py-6">
        {/* Mobile: chỉ hiện 2 nút */}
        <div className="flex w-full justify-between gap-4 md:hidden">
          <button className="border px-4 py-2 rounded flex items-center gap-2">
            Filters (0)
            <span>∘=∘</span>
          </button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">
            Sort by
            <span>▼</span>
          </button>
        </div>

        {/* Desktop: hiện đủ filter */}
        <div className="hidden md:flex w-full gap-2 flex-wrap">
          <button className="border px-4 py-2 rounded flex items-center gap-2">Gender <span>▼</span></button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">Category <span>▼</span></button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">Product type <span>▼</span></button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">Size <span>▼</span></button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">Prize <span>▼</span></button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">Color <span>▼</span></button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">More filters <span>+</span></button>
          <div className="flex-1" />
          <button className="border px-4 py-2 rounded flex items-center gap-2">Sort by <span>▼</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-4 gap-6">

        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />

      </div>
    </div>

  );
};

