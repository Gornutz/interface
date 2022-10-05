import styles from "./TableGrid.module.scss";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import TableGridItem from "./TableGridItem";
import ProgressBar from "../ProgressBar/ProgressBar";
import ProgressBar1 from "../ProgressBar/ProgressBar1";
import { useTheme } from "@mui/material/styles";

import { getPositionList } from "../../../contracts/helper";
// const columns = {
//     CurrentStrategy =
// } 'Current Strategy', 'Total Position', 'Debt Value', 'Equity Value'];
// const items = [{
//     id: 1,
//     icon: '/icons/pic.svg',

// }]

const TableGrid = ({ yourPositionOpenHandler }) => {
  const theme = useTheme();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function getPositions() {
      return await getPositionList();
    }
    getPositions().then((res) => {
      console.log("positions? ", res);
      setPositions(res);
    });
  }, []);

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
          {positions.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr
                  onClick={() => yourPositionOpenHandler(item)}
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
                      {" "}
                      ${item.collateralSize} USD
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className={styles.tdSubtitle}>Debt Value</span>{" "}
                    <span className={styles.coltd}>
                      {" "}
                      ${item.collateralSize - item.underlyingAmount} USD
                      <span className={styles.smallColtd}>
                        {" "}
                        (
                        {Number(
                          ((item.collateralSize - item.underlyingAmount) /
                            item.collateralSize) *
                            100
                        ).toFixed(2)}
                        %)
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
                      ${item.underlyingAmount} USD
                    </span>
                  </td>
                </tr>
                <tr
                  onClick={() => yourPositionOpenHandler(item)}
                  className={`${
                    positions.length == index + 1
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
                      positions.length == index + 1
                        ? styles.columnRoundBottomLeft
                        : ""
                    }`}
                  >
                    <span>Strategy Health: 50%</span>
                  </td>
                  <td
                    colSpan={4}
                    className={`${
                      positions.length == index + 1
                        ? styles.columnRoundBottomRight
                        : ""
                    }`}
                  >
                    {/* <div className={styles.innerContainer}>
                              <div className={styles.container}></div>
                          </div> */}
                    <ProgressBar
                      color={`linear-gradient(89.83deg, #0056e0 0.3%, #57c5e0 99.81%)`}
                      value={50}
                    ></ProgressBar>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableGrid;
