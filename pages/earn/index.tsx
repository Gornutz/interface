import { Tabs, Tab } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./earn.module.scss";
import Popup from "components/UI/Popup/popup";
import NewPosition from "./newPosition";
import PositionDetails from "./positionDetails/positionDetails";
import YourPosition from "./yourPosition/yourPosition";
import EditPosition from "./editPosition/editPosition";
import ClosePosition from "./closePosition/closePosition";
import CustomButton from "components/UI/CustomButton";
import { ILevPosition } from "interfaces";
import LeveragePositionTable from "components/UI/LeveragePositionTable";
import { useWidth } from "hooks/useWidth";
import AvailableFaultMobile from "./availableFaultMobile/availableFaultMobile";
import { useTheme } from "@mui/material/styles";
import { BANKS } from "constant";
import { useActiveWeb3React, useLeveragePoolTVLs, useTotalLeverageTVL } from "hooks";
import { formatBigNumber, formatMillionsBigNumber } from "utils";
import { Helmet } from "react-helmet-async";

const Earn: NextPage = () => {
  const [value, setValue] = useState(0);
  const [NewOpen, setNewPosition] = useState(false);
  const [SuccessOpen, setSuccesPosition] = useState(false);
  const [YourPosOpen, setYourPosition] = useState(false);
  const [EditPosOpen, setEditPosition] = useState(false);
  const [ClosePos, setClosePosition] = useState(false);
  const [curPosition, setCurPosition] = useState<ILevPosition>();
  const [poolKey, setPoolKey] = useState('');

  const width = useWidth();
  const theme = useTheme();
  const { chainId } = useActiveWeb3React();
  const tvls = useLeveragePoolTVLs();
  const totalTvl = useTotalLeverageTVL();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openPositionModal = (item) => {
    setCurPosition(item);
    newPositionOpenHandler("your-position");
  };

  const onNewPos = (poolKey) => {
    setNewPosition(true);
    setPoolKey(poolKey);
  }
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
      <Helmet>
        <title>
          Blueberry | Earn
        </title>
      </Helmet>
      <div className={styles.topContainer}>
        <div>
          <h4 className={styles.heading}>Vaults</h4>
          <p className={styles.text}>
            Utilize optional leverage on strategies while maintaining your
            preferred token position as collateral
          </p>
        </div>
        <div className={styles.rightContainer}>
          <h4 className={styles.title}>Vaults TVL</h4>
          <h4 className={styles.title}>${formatBigNumber(totalTvl, 18, 2)}</h4>
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
            >Active Positions</span>
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
            >Liquidated Positions</span>
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
          strategiesTable={[]}
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
              {Object.keys(BANKS[chainId]).map(key => (
                <tr
                  key={key}
                  className={`border-y-[1px] ${theme.palette.mode === "light"
                    ? "border-black/[0.2]"
                    : "border-white/[0.1]"
                    }`}
                >
                  <td className={styles.columnRoundLeft}>
                    <div className={styles.tableCol}>
                      <Image
                        src={BANKS[chainId][key].LOGO}
                        width={40}
                        height={40}
                        alt="image"
                      />
                      <span style={{ paddingLeft: "0.7rem" }}>
                        {BANKS[chainId][key].NAME}
                      </span>
                    </div>
                  </td>
                  <td>${formatMillionsBigNumber(tvls[key])} USD</td>
                  <td className={styles.alignCenter}>12-40%</td>
                  <td className={styles.alignCenter}>12-20%</td>
                  <td>
                    <CustomButton
                      title="New Position"
                      buttonStyle={styles.buttonStyle}
                      handleButtonClick={() => onNewPos(key)}
                    />
                  </td>
                </tr>
              ))}
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
        <NewPosition
          bank={BANKS[chainId][poolKey]}
          handleButtonClick={handleSuccessPosition}
        />
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
