import { BottomNavigation, Paper, BottomNavigationAction } from "@mui/material";
import { useRouter } from "next/router";
import Style from "./bottomNavbar.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const BottomNavbar = ({}) => {
  const router = useRouter();
  const pathName = router.pathname;
  const [menuItems, setMenuItems] = useState([
    {
      href: "/",
      title: "Overview",
      icon: (
        <Image
          src={"/icons/overview.svg"}
          width={40}
          height={40}
          alt={"Overview"}
        />
      ),
      selectedIcon: "/icons/selectedOverview.svg",
      isSelected: false,
    },
    {
      href: "/earn",
      title: "Earn",
      icon: (
        <Image src={"/icons/earn.svg"} width={40} height={40} alt={"Earn"} />
      ),
      selectedIcon: "/icons/selectedEarn.svg",
      isSelected: false,
    },
    {
      href: "/lend",
      title: "Lend",
      icon: (
        <Image src={"/icons/lend.svg"} width={40} height={40} alt={"Lend"} />
      ),
      selectedIcon: "/icons/selectedLend.svg",
      isSelected: false,
    },
  ]);

  useEffect(() => {
    if (pathName) {
      activeRoute(pathName);
    }
  }, [pathName]);

  const activeRoute = (route: string) => {
    let _routes = [...menuItems];
    _routes = _routes.map((item) => {
      return {
        ...item,
        isSelected: item.href === route ? true : false,
      };
    });
    setMenuItems([..._routes]);
  };
  const handleNavigation = (href: string) => {
    router.push(href);
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      className={`${Style.mainContainer}`}
    >
      <BottomNavigation showLabels className={`${Style.bottomContainer}`}>
        {menuItems.map((item) => {
          return (
            <BottomNavigationAction
              key={Math.random()}
              onClick={() => handleNavigation(item.href)}
              className={`${Style.navItem}`}
              icon={
                item.isSelected ? (
                  <Image
                    src={item.selectedIcon}
                    width={44}
                    height={44}
                    alt={""}
                  />
                ) : (
                  item.icon
                )
              }
              label={item.title}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
};
export default BottomNavbar;
