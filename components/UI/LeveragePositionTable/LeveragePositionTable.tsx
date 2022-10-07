import React from "react";
import Image from "next/image";
import { BigNumber, utils } from "ethers";
import { useTheme } from "@mui/material/styles";
import styles from "./TableGrid.module.scss";
import { useLeveragePositions } from "../../../hooks";
import ProgressBar from "../ProgressBar/ProgressBar";

const LeveragePositionTable = ({ openPosition }) => {
  const theme = useTheme();
  const positions = useLeveragePositions();

  return (
    <>
      <div>{/* header  */}</div>
      <span className={styles.title}> Current Strategy</span>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>Current Strategy</th>
            <th>
              Strategy Net APY %<br />
              (Weekly Earnings)
            </th>
            <th>Total Position</th>
            <th>Debt Value</th>
            <th>Equity Value</th>
          </tr>
        </thead>
        <tbody
          className={`${styles.tbody} ${
            theme.palette.mode === "light"
              ? "bg-black/[0.1]"
              : "bg-white/[0.05]"
          }`}
        >
          {positions.map((position, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => openPosition(position)}
                className="cursor-pointer"
              >
                <td className={`${index == 0 ? styles.columnRoundLeft : ""}`}>
                  <div className={styles.tableCol}>
                    <Image
                      src="/icons/pic.svg"
                      width={40}
                      height={40}
                      alt="image"
                    />
                    <span
                      style={{ paddingLeft: "0.7rem" }}
                      className={styles.tdSpan}
                    >
                      ICHI-USDC Vault
                    </span>
                  </div>
                </td>
                <td>
                  {" "}
                  <span className={styles.tdSubtitle}>
                    Strategy Net APY %<br />
                    (Weekly Earnings)
                  </span>
                  <span className={styles.coltd}> 90% ($8.65)</span>
                </td>
                <td>
                  {" "}
                  <span className={styles.tdSubtitle}>Total Position</span>
                  <span className={styles.coltd}>
                    ${utils.formatEther(position.collateralSize)} USD
                  </span>
                </td>
                <td>
                  {" "}
                  <span className={styles.tdSubtitle}>Debt Value</span>{" "}
                  <span className={styles.coltd}>
                    {" "}
                    ${parseFloat(utils.formatEther(position.debtValue)).toFixed(3)} USD
                    <span className={styles.smallColtd}>
                      ({BigNumber.from(position.debtValue).mul(100).div(position.collateralSize).toNumber().toFixed(2)}%)
                    </span>
                  </span>
                </td>
                <td
                  className={`${index == 0 ? styles.columnRoundRight : ""} ${
                    styles.tdSubtitle
                  }`}
                >
                  {" "}
                  <span className={styles.tdSubtitle}>Equity Value</span>{" "}
                  <span className={styles.coltd}>
                    {" "}
                    ${utils.formatEther(position.underlyingAmount)} USD
                  </span>
                </td>
              </tr>
              <tr
                onClick={() => openPosition(position)}
                className={`${
                  index + 1 === positions.length
                    ? "border-b-[0px]"
                    : "border-b-[1px]"
                } ${
                  theme.palette.mode === "light"
                    ? "border-black/[0.2]"
                    : "border-white/[0.1]"
                } ${styles.rowBottom} cursor-pointer`}
              >
                <td
                  className={`${
                    index + 1 === positions.length
                      ? styles.columnRoundBottomLeft
                      : ""
                  }`}
                >
                  <span>Strategy Health: {100 - position.risk}%</span>
                </td>
                <td
                  colSpan={4}
                  className={`${
                    index + 1 === positions.length
                      ? styles.columnRoundBottomRight
                      : ""
                  }`}
                >
                  {/* <div className={styles.innerContainer}>
                            <div className={styles.container}></div>
                        </div> */}
                  <ProgressBar
                    color={`linear-gradient(89.83deg, #0056e0 0.3%, #57c5e0 99.81%)`}
                    value={100 - position.risk}
                  ></ProgressBar>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LeveragePositionTable;
