import { Outlet } from "react-router-dom";
import Home from "../../pages/Home";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default UserLayout;
