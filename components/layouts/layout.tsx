import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import styles from "./layout.module.scss";
import { useWidth } from "../../hooks/useWidth";
import { useTheme } from '@mui/material/styles'

type LayoutProps = {
  children: NonNullable<ReactNode>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const width = useWidth()
  const theme = useTheme()

  const handleSidebarClick = (value: string) => {
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row flex-1">
      {width > 680 ? <Sidebar handleSidebarClick={handleSidebarClick}/> :<></>}
      <div className={`flex flex-col flex-1 ${theme.palette.mode === 'light' ? 'bg-main-light' : 'bg-main-dark'}`}>
        <Header />
        <div className={styles.bottomContainer}>
          <main className={styles.rightLayout}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
