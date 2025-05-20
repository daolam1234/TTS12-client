export default function SidebarProducts() {
    const brandList = [
      "PUMA", "MLB", "Jeep", "Champion", "nike", "vans", "ASICS", "ADIDAS", "NIKE", "Onitsuka Tiger", "NEW BALANCE", "Reebok"
    ];
    
    const priceList = [
      "Dưới 1,000,000₫",
      "1,000,000₫ - 2,000,000₫",
      "2,000,000₫ - 3,500,000₫",
      "3,000,000₫ - 5,000,000₫",
      "Trên 5,000,000₫"
    ];
    
    const sizeList = [
      "35", "35.5", "36", "36.5", "37", "37.5", "38",
      "38.5", "39", "39.5", "40", "40.5", "41", "41.5",
      "42", "42.5", "43", "44", "44.5", "45", "45.5",
      "46", "47", "S", "M", "L", "XL"
    ];
    return (
        <div>
            <nav className="mb-8">
          <ul className="space-y-2 text-base font-normal text-black border-b pb-4">
            <li className="py-1">Sneaker</li>
            <li className="py-1">Slide</li>
            <li className="py-1 flex items-center justify-between">
              NƯỚC HOA <span className="font-bold">+</span>
            </li>
            <li className="py-1">Clothing</li>
            <li className="py-1">BAG/ TOYS</li>
            <li className="py-1">OUTLET</li>
            <li className="py-1">Member</li>
            <li className="py-1">Liên Hệ</li>
          </ul>
        </nav>

        <div className="mb-6">
          <h3 className="text-base font-bold mb-3">THƯƠNG HIỆU <span className="font-normal">–</span></h3>
          <ul className="space-y-1 text-sm">
            {brandList.map((brand) => (
              <li key={brand}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-black" />
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-bold mb-3">GIÁ SẢN PHẨM <span className="font-normal">–</span></h3>
          <ul className="space-y-1 text-sm">
            {priceList.map((price) => (
              <li key={price}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-black" />
                  {price}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold mb-3">KÍCH THƯỚC <span className="font-normal">–</span></h3>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {sizeList.map((size) => (
              <div
                key={size}
                className="border text-center py-1 cursor-pointer hover:bg-gray-100"
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        </div>


    );
}