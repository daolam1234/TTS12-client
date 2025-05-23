import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Member from "@/components/layout/Member";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      {/* <Member /> */}
      <Outlet />
      
      <Footer />
    </div>
  );
}
