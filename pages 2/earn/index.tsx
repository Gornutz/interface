import { Tabs, Tab } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import Card from "../../components/UI/Card/Card";
import styles from "./earn.module.scss";
import Popup from "../../components/UI/Popup/popup";
import NewPosition from "./newPosition/newPosition";
import PositionDetails from "./positionDetails/positionDetails";
import YourPosition from "./yourPosition/yourPosition";
import EditPosition from "./editPosition/editPosition";
import ClosePosition from "./closePosition/closePosition";
import CustomButton from "../../components/UI/customButton/customButton";
import { IPosition, StrategiesTable } from "../../interfaces";
import LeveragePositionTable from "../../components/UI/LeveragePositionTable/LeveragePositionTable";
import Button from "../../components/UI/Button/Button";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import Text from "../../components/UI/Text/Text";
import { useWidth } from "../../hooks/useWidth";
import AvailableFaultMobile from "./availableFaultMobile/availableFaultMobile";
import { Web3Button } from "../../components/web3/Web3Button";
import { useTheme } from "@mui/material/styles";

const strategiesTable = [
  {
    id: 1,
    name: "ICHI-USDC Vault",
    tvl: "$4.5 M USD",
    Stablecoin: "12-40%",
    Token: "12-20%",
  },
  {
    id: 2,
    name: "ICHI-USDC Vault",
    tvl: "$4.5 M USD",
    Stablecoin: "12-40%",
    Token: "12-20%",
  },
  {
    id: 3,
    name: "ICHI-USDC Vault",
    tvl: "$4.5 M USD",
    Stablecoin: "12-40%",
    Token: "12-20%",
  },
  {
    id: 4,
    name: "ICHI-USDC Vault",
    tvl: "$4.5 M USD",
    Stablecoin: "12-40%",
    Token: "12-20%",
  },
] as StrategiesTable[];

const Earn: NextPage = () => {
  const [value, setValue] = useState(0)
  const [NewOpen, setNewPosition] = useState(false)
  const [SuccessOpen, setSuccesPosition] = useState(false)
  const [YourPosOpen, setYourPosition] = useState(false)
  const [EditPosOpen, setEditPosition] = useState(false)
  const [ClosePos, setClosePosition] = useState(false)
  const [curPosition, setCurPosition] = useState<IPosition>();

  const width = useWidth();
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //
  const openPositionModal = (item) => {
    setCurPosition(item);
    newPositionOpenHandler("your-position");
  };
  const newPositionOpenHandler = (title: string) => {
    console.log(title);
    switch (title) {
      case "new-position":
        setNewPosition(true);
        break;
      case "success-position":
        setSuccesPosition(true);
        break;
      case "your-position":
        setYourPosition(true);
        break;
      case "edit-position":
        setEditPosition(true);
        break;
      case "close-position":
        setClosePosition(true);
        break;

      default:
        break;
    }
  };
  const handleSuccessPosition = (value: string) => {
    console.log("handleSuccessPosition?", value);
    closeNewPosition();
    if (value == "success-position") {
      newPositionOpenHandler(value);
    }
  };
  const closeNewPosition = () => {
    setNewPosition(false);
  };

  const handleClosepositionPopup = (value: string) => {
    setYourPosition(false);
    newPositionOpenHandler(value);
  };
  return (
    <div
      className={`${width <= 680 ? "h-fit" : "h-full"
        } items-center my-4 md:px-16 sm:px-1 2sm:px0 sm:block`}
    >
      {width <= 680 && (
        <header className="md:h-[90px] pb-4 md:flex items-center md:px-16 sm:px-1 2sm:px0 sm:h-[150px] sm:block">
          <Text>
            {" "}
            <h3>Earn</h3>
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
          <h4 className={styles.heading}>Vaults</h4>
          <p className={styles.text}>
            Utilize up to 3x leverage on LP strategies while maintaining your
            preferred token position as collateral
          </p>
        </div>
        <div className={styles.rightContainer}>
          <h4 className={styles.title}>Vaults TVL</h4>
          <h4 className={styles.title}>$100,000,000.00</h4>
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
              Active Positions
            </span>
          }
        />
        <Tab
          label={
            <span
              style={{
                color:
                  value === 1
                    ? "#19857b"
                    : theme.palette.mode === "light"
                      ? "#000"
                      : "#fff",
              }}
            >
              Liquidated Positions
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
      {value == 0 && (
        <LeveragePositionTable
          openPosition={openPositionModal}
        ></LeveragePositionTable>
      )}
      {value == 1 && <div></div>}

      {width <= 680 ? (
        <AvailableFaultMobile
          strategiesTable={strategiesTable || []}
          onBtnNewClick={newPositionOpenHandler}
        />
      ) : (
        <div className="mt-10 pb-40">
          <table className={styles.table_bottom}>
            <thead className={styles.header}>
              <tr>
                <td className={styles.tHeading}>Strategies</td>
                <td className={styles.tHeading}>TVL</td>
                <td className={`${styles.tHeading} ${styles.tCenter}`}>
                  Stablecoin Collateral Yield (1x - 3x)
                </td>
                <td className={`${styles.tHeading} ${styles.tCenter}`}>
                  Token Collateral Yield (1x-1.5x)
                </td>
                <td className={styles.tHeading}></td>
              </tr>
            </thead>
            <tbody className={`${styles.tbody}`}>
              {strategiesTable.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={`border-y-[1px] ${theme.palette.mode === "light"
                        ? "border-black/[0.2]"
                        : "border-white/[0.1]"
                      }`}
                  >
                    <td className={styles.columnRoundLeft}>
                      <div className={styles.tableCol}>
                        <Image
                          src="/icons/pic.svg"
                          width={40}
                          height={40}
                          alt="image"
                        />
                        <span style={{ paddingLeft: "0.7rem" }}>
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td>{row.tvl}</td>
                    <td className={styles.alignCenter}>{row.Stablecoin}</td>
                    <td className={styles.alignCenter}>{row.Token}</td>
                    <td>
                      <CustomButton
                        title="New Position"
                        buttonStyle={styles.buttonStyle}
                        handleButtonClick={() =>
                          newPositionOpenHandler("new-position")
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Popup
        // onClick={(e) => newPositionOpenHandler('success-position')}
        isOpen={NewOpen}
        handleClose={closeNewPosition}
        title={"New Position"}
      >
        <NewPosition handleButtonClick={handleSuccessPosition} />
      </Popup>
      <Popup
        isOpen={SuccessOpen}
        title={"Success!"}
        handleClose={() => {
          setSuccesPosition(false);
        }}
      >
        <PositionDetails />
      </Popup>
      <Popup
        isOpen={YourPosOpen}
        title={"Your Position"}
        handleClose={() => {
          setYourPosition(false);
        }}
      >
        <YourPosition
          handleClosepositionPopup={handleClosepositionPopup}
          position={curPosition}
        />
      </Popup>
      <Popup
        isOpen={EditPosOpen}
        title={"Edit Position"}
        handleClose={() => {
          setEditPosition(false);
        }}
      >
        <EditPosition
          handleClose={() => {
            setEditPosition(false);
          }}
          position={curPosition}
        />
      </Popup>
      <Popup
        isOpen={ClosePos}
        title={"Close Position"}
        handleClose={() => {
          setClosePosition(false);
        }}
      >
        <ClosePosition
          handleClose={() => {
            setClosePosition(false);
          }}
          position={curPosition}
        />
      </Popup>
    </div>
  );
};

export default Earn;
