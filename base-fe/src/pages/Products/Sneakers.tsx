import { useList } from "@/hooks";

const Sneakers = () => {
  const { data, isLoading, error } = useList({ resource: "products" });

  if (isLoading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-500">Lỗi tải dữ liệu</div>;

  return (
    <div className="max-w-4xl mx-auto mt-4 px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Danh sách sản phẩm</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {data?.map((item: any) => (
          <li key={item._id} className="bg-white rounded shadow p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded"
            />
            <div className="flex-1 flex flex-col">
              <h3 className="text-base sm:text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-blue-600 font-bold">{item.price.toLocaleString()}₫</span>
                <span className={`text-xs px-2 py-1 rounded ${item.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.is_available ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Kho: {item.stock_quantity}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sneakers;