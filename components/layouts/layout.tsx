import { ReactNode, useEffect, useState } from "react";
import BottomNavbar from "./bottomNavbar";
import Sidebar from "./sidebar";
import Header from "./header";
import styles from "./layout.module.scss";
import { useWidth } from "../../hooks/useWidth";
type LayoutProps = {
  children: NonNullable<ReactNode>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const width = useWidth();

  const handleSidebarClick = (value: string) => {
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col md:flex-row flex-1">
      {width > 680 ? <Sidebar handleSidebarClick={handleSidebarClick}/> :<></>}
      <div className="flex bg-main flex-col flex-1">
        <Header />
        <div className={styles.bottomContainer}>
          <main className={styles.rightLayout}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
