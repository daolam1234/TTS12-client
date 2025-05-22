import { useList } from "@/hooks";



const Sneakers = () => {
  const { data, isLoading, error } = useList({ resource: "products" });

  if (isLoading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-500">Lỗi tải dữ liệu</div>;

  return (
    <div className="max-w-[1200px] mx-auto flex gap-6 px-4 py-6">
      <aside className="w-1/4 hidden md:block">
        {/* <SidebarProducts/> */}
      </aside>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase">Sneaker</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((item: any) => (
            <li key={item._id} className="bg-white p-2 flex flex-col items-center text-center">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-[200px] object-cover rounded"
              />
              <h3 className="text-sm mt-2 font-medium line-clamp-2">{item.name}</h3>
              <div className="text-sm mt-1">
                <span className="text-red-600 font-semibold mr-2">
                  {item.sale_price ? item.sale_price.toLocaleString() + "₫" : item.price.toLocaleString() + "₫"}
                </span>
                {item.sale_price && (
                  <span className="line-through text-gray-400 text-xs">
                    {item.price.toLocaleString()}₫
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sneakers;