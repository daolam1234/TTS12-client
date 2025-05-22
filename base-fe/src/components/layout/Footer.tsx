export default function Footer() {
    return (
        <div>
            <footer className="bg-white  px-10 py-10 text-sm ">
                <div className="grid grid-cols-1 md:grid-cols-4 ">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold py-5 ">TRỢ GIÚP</span>
                        <span>Trạng thái đơn hàng</span>
                        <span>Giao hàng</span>
                        <span>Trả hàng</span>
                        <span>Tuỳ chọn thanh toán</span>
                        <span>Liên hệ</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold py-5">LIÊN KẾT</span>
                        <span>Chính sách hoàn trả</span>
                        <span>Chính sách bảo mật</span>
                        <span>Chính sách vận chuyển</span>
                        <span>Chính sách đổi size</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold py-5">THÔNG TIN LIÊN HỆ</span>
                        <span>Địa chỉ: Số 128 Đống Đa, Hà Nội</span>
                        <span>Điện thoại: 01299688706</span>
                        <span>Instagram: 12SNEAKER.VN</span>
                        <span>Email: Trungtran0108@gmail.com</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold py-5">MẠNG XÃ HỘI</span>
                      <div className="flex gap-4 h-40 w-40" >
                          <a href=""><img src="https://cdn-icons-png.flaticon.com/128/145/145802.png" alt="" /></a>
                        <a href=""><img src="https://cdn-icons-png.flaticon.com/128/174/174883.png" alt="" /></a>
                        <a href=""><img src="https://cdn-icons-png.flaticon.com/128/3116/3116491.png" alt="" /></a>
                        <a href=""><img src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" alt="" /></a>
                      </div>
                    </div>
                </div>

            </footer>
            <p className="text-center  bg-black text-white">Copyright &copy; 2025 12 Sneaker</p>

        </div>


    );
}