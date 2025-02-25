import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background "></div>
      <main className="min-h-screen mx-4 sm:mx-8 lg:mx-12">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 w-full text-center bg-gray-800 mt-10">
        Made with 💗 by RoadsideCoder
      </div>
    </div>
  );
};

export default AppLayout;