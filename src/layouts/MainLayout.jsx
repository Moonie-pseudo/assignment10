import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Header />
      <div className="min-h-[80vh] pt-5">
        <Outlet />
      </div>
      <Footer />
      
    </div>
  );
}
