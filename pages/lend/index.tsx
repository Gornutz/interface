import { Tabs, Tab } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useWidth } from "hooks/useWidth";
import styles from "./lend.module.scss";
import MobileTableLend from "./mobileTableLend/mobileTableLend";
import DepositModal from "./depositModal/depositModal";
import YourPosition from "./yourPosition/yourPosition";
import Popup from "components/UI/Popup/popup";
import { Web3Button } from "components/web3/Web3Button";
import Text from "components/UI/Text/Text";
import Dropdown from "components/UI/ChainDropdown";
import { useTheme } from "@mui/material/styles";
import LendingPositionTable from "components/UI/LendingPositionTable";
import LendingPoolTable from "components/UI/LendingPoolTable";
import { Helmet } from "react-helmet-async";

const Earn: NextPage = () => {
  const [depositDlgOpen, setDepositDlgOpen] = useState(false);
  const [YourPosOpen, setYourPosition] = useState('');
  const [poolName, setPoolName] = useState("");
  const [value, setValue] = useState(0);

  const width = useWidth();
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const closeDepositModal = () => {
    setDepositDlgOpen(false);
  };

  const handleSuccessPosition = () => {
    closeDepositModal();
  };

  const handleMobileDeposit = (value: string) => {
    setDepositDlgOpen(true);
  };

  return (
    <div
      className={`${width <= 680 ? "h-fit" : "h-full"
        } items-center my-4 md:px-16 sm:px-1 2sm:px0 sm:block`}
    >
      <Helmet>
        <title>
          Blueberry | Lend
        </title>
      </Helmet>
      {width <= 680 && (
        <header className="md:h-[90px] pb-4 md:flex items-center md:px-16 sm:px-1 2sm:px0 sm:h-[150px] sm:block">
          <Text>
            {" "}
            <h3>Lend</h3>
          </Text>

          <div className="flex my-grid items-center">
            <Image
              src="/icons/men.svg"
              alt="Blueberry Web"
              width={40}
              height={40}
              className={styles.menuIcon}
            />

            <Dropdown className={"flex-1"} />
            <Web3Button />
          </div>
        </header>
      )}
      <div className={styles.topContainer}>
        <div>
          <h4 className={styles.heading}>Lending Pools</h4>
          <p className={styles.text}>
            Earn competitive interest on single sided deposits with Blueberry
            Lend
          </p>
        </div>
        <div className={styles.rightContainer}>
          <input
            className={`${styles.btnSearch} ${theme.palette.mode === "light"
              ? "bg-black/[0.1]"
              : "bg-white/[0.1]"
              }`}
            placeholder={"Search..."}
          />
        </div>
      </div>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab
          label={
            <span
              style={{
                color:
                  value === 0
                    ? "#19857b"
                    : theme.palette.mode === "light"
                      ? "#000"
                      : "#fff",
              }}
            >
              My Positions
            </span>
          }
        />
      </Tabs>
      <div
        className={`${theme.palette.mode === "light"
          ? styles.dividerLight
          : styles.dividerDark
          } ${styles.divider}`}
      ></div>
      {value == 0 && <LendingPositionTable openPosition={setYourPosition} />}
      {value == 1 && <div></div>}

      {width <= 680 ? (
        <MobileTableLend
          tableData={[]}
          onBtnNewClick={handleMobileDeposit}
        />
      ) : (
        <div className="mt-10 pb-40">
          <LendingPoolTable
            onDeposit={(poolKey) => {
              setDepositDlgOpen(true);
              setPoolName(poolKey);
            }}
          />
        </div>
      )}

      <Popup
        isOpen={depositDlgOpen}
        handleClose={closeDepositModal}
        title={"Deposit"}
      >
        <DepositModal
          poolName={poolName}
          handleButtonClick={handleSuccessPosition}
        />
      </Popup>

      <Popup
        isOpen={YourPosOpen !== ''}
        title={"Your Position"}
        handleClose={() => setYourPosition('')}
      >
        <YourPosition
          handleClosepositionPopup={() => setYourPosition('')}
          poolKey={YourPosOpen}
        />
      </Popup>
    </div>
  );
};

export default Earn;
