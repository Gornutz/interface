import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import styles from "styles/Home.module.scss";
import Card from "components/UI/Card/Card";
import Text from "components/UI/Text/Text";
import CustomButton from "components/UI/CustomButton";
import { useWidth } from "hooks/useWidth";
import Popup from "components/UI/Popup/popup";
import YourPosition from "./earn/yourPosition/yourPosition";
import ClosePosition from "./earn/closePosition/closePosition";
import EditPosition from "./earn/editPosition/editPosition";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { BANKS, TOKEN_LOGO } from "constant";
import { ILevPosition } from "interfaces";
import { Helmet } from "react-helmet-async";
import { useActiveWeb3React, useLendingPoolTotalDeposit, useLeverageTotalDebt, useLeverageTotalValue, useMyWeeklyEarnings, useNetAPY, useNetWorth, useTop3LevPositions } from "hooks";
import { formatBigNumber } from "utils";
import ProgressBar from "components/UI/ProgressBar/ProgressBar";

const Home: NextPage = () => {
  // const [YourPosOpen, setYourPosition] = useState(false);
  // const [ClosePos, setClosePosition] = useState(false);
  // const [EditPosOpen, setEditPosition] = useState(false);
  // const [curPosition, setCurPosition] = useState<ILevPosition>();

  const { chainId } = useActiveWeb3React();
  const lendingDeposit = useLendingPoolTotalDeposit();
  const farmingPosValue = useLeverageTotalValue();
  const totalDebt = useLeverageTotalDebt();
  const positions = useTop3LevPositions();
  const weeklyEarnings = useMyWeeklyEarnings();
  const netWorth = useNetWorth();
  const netApy = useNetAPY();

  const width = useWidth();
  const theme = useTheme();
  const router = useRouter();

  // const handleClosepositionPopup = (value: string) => {
  //   setYourPosition(false);
  //   newPositionOpenHandler(value);
  // };
  // const newPositionOpenHandler = (title: string) => {
  //   console.log(title);
  //   switch (title) {
  //     case "your-position":
  //       setYourPosition(true);
  //       break;
  //     case "edit-position":
  //       setEditPosition(true);
  //       break;
  //     case "close-position":
  //       setClosePosition(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  return (
    <>
      <Helmet>
        <title>
          Blueberry | Overview
        </title>
      </Helmet>
      <Card className={styles.mainContainer}>
        <div
          className={
            styles["start-farming-widget"] +
            ` my-8 rounded-lg px-8 1sm:block py-5 ${theme.palette.mode === "light"
              ? "bg-black/[0.05]"
              : "bg-white/[0.05]"
            }`
          }
        >
          <div className={styles.topContainer}>
            <Image
              src="/icons/farming-home.svg"
              alt="farming image"
              width={234}
              height={138}
            />
            <p className={styles.text}>
              Enter multi-step strategies that manage themselves in a single click. 
              <br />
              Borrow, deploy, and earn on autopilot with your perferred assets.
              <br />
              <br />
              Leverage can be applied optionally to boost the yield earned.
            </p>
          </div>

          <CustomButton
            buttonStyle={`${width <= 768 && "w-full"}`}
            title={"Start Earning"}
            handleButtonClick={() => router.push("/earn")}
          />
        </div>
        <div className="md:flex gap-8 flex-row my-8 sm:block 2sm:block">
          <div
            className={`basis-1/2 px-6 py-8 border-b-4 ${theme.palette.mode === "light"
              ? "border-black/[0.1]"
              : "border-white/[0.05]"
              }`}
          >
            <span className=" small-label">Net Worth</span>
            <Text>
              <h3>
                ${formatBigNumber(netWorth, 18, 2)} USD
              </h3>
            </Text>
          </div>
          <div
            className={`basis-1/2 px-6 pl-8 py-8 border-b-4 ${theme.palette.mode === "light"
              ? "border-black/[0.1]"
              : "border-white/[0.05]"
              }`}
          >
            <span className="small-label">Net APY%</span>
            <Text>
              <h3>{netApy}% APY</h3>
            </Text>
          </div>
          <div
            className={`basis-1/2 px-6 pl-8 py-8 border-b-4 ${theme.palette.mode === "light"
              ? "border-black/[0.1]"
              : "border-white/[0.05]"
              }`}
          >
            <span className="small-label">Projected Weekly Earnings</span>
            <Text>
              <h3>${formatBigNumber(weeklyEarnings, 18, 2)} USD</h3>
            </Text>
          </div>
        </div>
        <div className="md:flex gap-8 flex-row rounded-lg my-8 sm:block 2sm:block">
          <div className="basis-1/2 px-6 py-8 ">
            <Text>
              <h6 className="text-muted">Position Value Summary</h6>
            </Text>

            <div className={styles.positionValueRow}>
              <div className={styles.lendingRow}>
                <Text>
                  {" "}
                  <span className={styles.heading1}>Lending Deposits</span>{" "}
                </Text>
                <Text>
                  <span className={styles.heading1}>
                    ${formatBigNumber(lendingDeposit, 18, 2)} USD
                  </span>
                </Text>
              </div>
              <div className={styles.lendingRow}>
                <Text>
                  <span className={styles.heading1}>Farming Positions</span>
                </Text>
                <Text>
                  <span className={styles.heading1}>
                    ${formatBigNumber(farmingPosValue, 18, 2)} USD
                  </span>
                </Text>
              </div>
              <div className={styles.lendingRow}>
                <Text>
                  <span className={`${styles.heading1} text-rose-500`}>
                    Debt Value
                  </span>
                </Text>
                <Text>
                  <span className={`${styles.heading1} text-rose-500`}>
                    ${formatBigNumber(totalDebt, 18, 2)} USD
                  </span>
                </Text>
              </div>
            </div>
          </div>

          {/* account health graph */}

          <div className="md:flex gap-20 flex-row my-8 sm:block 2sm:block"></div>
          <div className={`basis-1/2 px-6 py-8`}>
            <Text>
              <h6 className="text-muted">Vault Positions Health</h6>
            </Text>
            {positions.map(position =>
              <div
                className={`${styles.lendingRow} mt-5 ${width <= 768 && "flex-column"
                  } cursor-pointer`}
                // onClick={(event) => newPositionOpenHandler("your-position")}
                key={position.positionId}
              >
                <div className={styles.rightRow}>
                  <Image
                    src={TOKEN_LOGO.BLB}
                    width={35}
                    height={35}
                    alt="image"
                  />
                  <div className={styles.container}>
                    <span className={styles.title}>{BANKS[chainId][position.bankKey].NAME}</span>
                    <span className={styles.subTitle}>${formatBigNumber(position.cv, 18, 2)}</span>
                  </div>
                </div>
                <div className={`py-1 ${styles.pMainContainer}`}>
                  <div style={{ width: '80%' }}>
                    <ProgressBar
                      color={`linear-gradient(89.83deg, #0056e0 0.3%, #57c5e0 99.81%)`}
                      value={position.health}
                    ></ProgressBar>
                  </div>
                  <span className={styles.percentage}>{position.health}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      {/* <Popup
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
      </Popup> */}
    </>
  );
};

export default Home;
