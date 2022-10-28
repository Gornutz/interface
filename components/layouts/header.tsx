import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useWidth } from "hooks/useWidth";
import ChainDropdown from "../UI/ChainDropdown";
import Text from "../UI/Text/Text";
import styles from "./header.module.scss";
import Sidebar from "./sidebar";
import { Web3Button } from "../web3/Web3Button";
import ColorModeContext from "context/ColorModeContext";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import { useTotalTvl } from "hooks";
import { formatBigNumber } from "utils";

const Header = () => {
  const [title, setTitle] = useState("Overview");
  const [open, setOpen] = useState(false);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const width = useWidth();
  const router = useRouter();
  const pathName = router.pathname;

  const totalTvl = useTotalTvl();

  useEffect(() => {
    switch (pathName) {
      case "/earn":
        setTitle("Earn");
        break;
      case "/lend":
        setTitle("Lend");
        break;
      case "/faucet":
        setTitle("Faucet");
        break;
      default:
        setTitle("Overview");
        break;
    }
  }, [pathName]);

  const handleSidebarClick = (value: string) => {
    setOpen(false);
  };

  return (
    <>
      {width > 680 && (
        <header className="md:h-[90px] md:flex items-center md:px-16 sm:px-1 2sm:px0 sm:h-[150px] sm:block">
          <Text>
            {" "}
            <h3>{title}</h3>
          </Text>

          <div className="flex my-grid items-center">
            <Text className="mr-4">
              <h4>TVL ${formatBigNumber(totalTvl, 18, 2)}</h4>
            </Text>
            <IconButton
              sx={{ marginRight: '10px', display: 'none' }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              <Image
                src={
                  theme.palette.mode === 'light'
                    ? '/icons/crescent.svg'
                    : '/icons/sun.svg'
                }
                alt=""
                width={34}
                height={34}
              />
            </IconButton>

            {/* <div
              className={`hide rounded-[12px] p-[7px] ${theme.palette.mode === "light" ? "bg-[#e2e8f0]" : "bg-[#214554]"
                }`}
            >
              <NotificationsIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "1.6rem",
                  color: theme.palette.mode === "light" ? "#0B2845" : "#fff",
                }}
              />
            </div> */}

            {/* <Image
              src="/icons/notification.svg"
              alt="Blueberry Web"
              width={40}
              height={40}
            /> */}

            <ChainDropdown className={"flex-1"}></ChainDropdown>

            <Web3Button />
          </div>
        </header>
      )}
      {width <= 680 && (
        <>
          <div
            className={`flex items-center pl-2 pr-4 ${styles.mobileNavbar} h-20`}
          >
            {!open ? (
              <Image
                src="/icons/menu-icon.svg"
                alt="Blueberry Web"
                width={30}
                onClick={() => setOpen(true)}
                height={30}
              />
            ) : (
              <Image
                src="/icons/close.svg"
                width={30}
                alt="icon"
                onClick={() => setOpen(false)}
                height={30}
              />
            )}

            <div className={styles["m-auto"]}>
              <Image
                src="/icons/home.svg"
                alt="Blueberry Web"
                width={40}
                height={40}
              />
            </div>

            {/* <IconButton
              sx={{ marginRight: '10px' }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              <Image
                src={
                  theme.palette.mode === 'light'
                    ? '/icons/crescent.svg'
                    : '/icons/sun.svg'
                }
                alt=""
                width={34}
                height={34}
              />
            </IconButton> */}
          </div>
          <div
            className={`absolute top-20 left-0 h-screen w-screen  transform ${styles.mobileNavbarBg
              } ${open ? "-translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
          >
            <div className={`${styles.mobileNavbarContainer} h-[90px]`}>
              <div className="flex flex-col h-full">
                <Sidebar handleSidebarClick={handleSidebarClick} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
