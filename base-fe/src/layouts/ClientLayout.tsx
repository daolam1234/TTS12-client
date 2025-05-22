import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <div>
        <div><Outlet/></div>
    </div>
  );
}
