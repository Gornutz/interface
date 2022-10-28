import React from "react";
import Image from "next/image";
import { BigNumber } from "ethers";
import { useTheme } from "@mui/material/styles";
import styles from "./TableGrid.module.scss";
import { useActiveWeb3React, useLeveragePositions } from "hooks";
import ProgressBar from "../ProgressBar/ProgressBar";
import { formatBigNumber } from "utils";
import { BANKS } from "constant";

const LeveragePositionTable = ({ openPosition }) => {
  const { chainId } = useActiveWeb3React();
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
            <th>Collateral Value</th>
            <th>Total Position</th>
            <th>Debt Value</th>
            <th>Net Equity</th>
            <th>Strategy Net APY %<br />
              (Weekly Earnings)
            </th>
          </tr>
        </thead>
        <tbody
          className={`${styles.tbody} ${theme.palette.mode === "light"
            ? "bg-black/[0.1]"
            : "bg-white/[0.05]"
            }`}
        >
          {positions.map((position, index) => {
            return <React.Fragment key={index}>
              <tr
                onClick={() => openPosition(position)}
                className="cursor-pointer"
              >
                <td className={`${index == 0 ? styles.columnRoundLeft : ""}`}>
                  <div className={styles.tableCol}>
                    <Image
                      src={BANKS[chainId][position.bankKey].LOGO}
                      width={40}
                      height={40}
                      alt="image"
                    />
                    <span
                      style={{ paddingLeft: "0.7rem" }}
                      className={styles.tdSpan}
                    >
                      {BANKS[chainId][position.bankKey].NAME}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={styles.coltd}>
                    ${formatBigNumber(position.underlyingAmount)}
                  </span>
                </td>
                <td>
                  <span className={styles.coltd}>
                    ${formatBigNumber(position.cv, 18, 2)}
                  </span>
                </td>
                <td>
                  <span className={styles.coltd}>
                    &nbsp;${formatBigNumber(position.debtValue)}&nbsp;
                    <span className={styles.smallColtd}>
                      ({(
                        BigNumber.from(position.debtValue).mul(10000)
                          .div(position.collateralSize).toNumber() / 100
                      ).toFixed(2)
                      }%)
                    </span>
                  </span>
                </td>
                <td
                  className={`${index == 0 ? styles.columnRoundRight : ""} ${styles.tdSubtitle
                    }`}
                >
                  <span className={styles.coltd}>
                    ${formatBigNumber(position.equitySum)}
                  </span>
                </td>
                <td>
                  {" "}
                  <span className={styles.tdSubtitle}>
                    Strategy Net APY %<br />
                    (Weekly Earnings)
                  </span>
                  <span className={styles.coltd}> {position.apy}% (${formatBigNumber(position.weeklyEarningsUSD)})</span>
                </td>
              </tr>
              <tr
                onClick={() => openPosition(position)}
                className={`${index + 1 === positions.length
                  ? "border-b-[0px]"
                  : "border-b-[1px]"
                  } ${theme.palette.mode === "light"
                    ? "border-black/[0.2]"
                    : "border-white/[0.1]"
                  } ${styles.rowBottom} cursor-pointer`}
              >
                <td
                  className={`${index + 1 === positions.length
                    ? styles.columnRoundBottomLeft
                    : ""
                    }`}
                >
                  <span>Strategy Health: {position.health}%</span>
                </td>
                <td
                  colSpan={5}
                  className={`${index + 1 === positions.length
                    ? styles.columnRoundBottomRight
                    : ""
                    }`}
                >
                  {/* <div className={styles.innerContainer}>
                            <div className={styles.container}></div>
                        </div> */}
                  <ProgressBar
                    color={`linear-gradient(89.83deg, #0056e0 0.3%, #57c5e0 99.81%)`}
                    value={position.health}
                  ></ProgressBar>
                </td>
              </tr>
            </React.Fragment>
          })}
        </tbody>
      </table>
    </>
  );
};

export default LeveragePositionTable;
