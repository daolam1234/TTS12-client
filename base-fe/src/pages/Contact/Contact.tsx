import { useRegister } from "@/hooks";
import { contact } from "@/services";
import type { FormContact } from "@/types/contact/contact.type";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Contact() {

    const useContact = () => {
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (values: any) => contact(values),
            onSuccess: () => {
                toast.success("Gửi liên hệ thành công!");
                navigate("/homepage");
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Gửi liên hệ thất bại. Vui lòng thử lại.";
                toast.error(message);

            },
        });
    };

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<FormContact>();

    const registerMutation = useContact();

    const onSubmit = async (data: FormContact) => {
        console.log("Dữ liệu gửi đi:", data);
        try {
            registerMutation.mutate(data);
            toast.success("Gửi liên hệ thành công!");
        } catch (error) {
            toast.error("Lỗi khi gửi liên hệ. Vui lòng thử lại.");
        }
    };
    return (
        <div className="bg-gray-50">
            {/* Banner */}
            <section
                className="relative bg-cover bg-center bg-no-repeat h-[400px]"
                style={{
                    backgroundImage: "url('https://th.bing.com/th/id/R.2f41285a3cc32dcd57167f4ee6620bdb?rik=4A%2fxn%2bIWW8Pq1w&pid=ImgRaw&r=0')",
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center items-center px-6 text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Đừng ngần ngại liên hệ nếu bạn cần giúp đỡ.
                    </p>
                </div>
            </section>

            {/* Form Liên Hệ */}
            <section id="contact-form" className="max-w-7xl mx-auto px-4 py-16">

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Form */}
                    <form className="space-y-6 bg-white p-6 rounded-xl shadow" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                type="text"
                                {...register("name")}

                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Nguyễn Văn A"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email")}

                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                {...register("phone")}

                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="0123 456 789"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                            <textarea
                                rows={4}
                                {...register("note")}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Viết tin nhắn..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300 font-semibold"
                        >
                            Gửi liên hệ
                        </button>
                    </form>

                    {/* Video */}
                    <div className="space-y-6">

                        <div className="rounded-xl overflow-hidden shadow aspect-video">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/b0Ezn5pZE7o?autoplay=1&mute=1"
                                title="YouTube video player"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
