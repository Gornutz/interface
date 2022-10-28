import React from "react";
import styles from "./TableGrid.module.scss";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { SAFE_BOX } from "constant";
import { useActiveWeb3React, useLendingPoolInfos } from "hooks";
import { formatBigNumber } from "utils";

const LendingPositionTable = ({ openPosition }: {
  openPosition: (poolName: string) => void
}): React.ReactElement => {
  const theme = useTheme();
  const { chainId } = useActiveWeb3React();
  const lendingPoolInfos = useLendingPoolInfos();

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>Pool</th>
            <th>APY % (Weekly Earnings)</th>
            <th>Your Position</th>
          </tr>
        </thead>
        <tbody
          className={`${styles.tbody} ${theme.palette.mode === "light"
            ? "bg-black/[0.1]"
            : "bg-white/[0.05]"
            }`}
        >
          {Object.keys(SAFE_BOX[chainId])
            .filter(key => lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.myPoolBalance.gt(0))
            .map(key => (key && lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()].myPoolBalance &&
              <tr
                key={key}
                onClick={() => openPosition(key)}
                className={`cursor-pointer border-b-[1px] ${theme.palette.mode === "light"
                  ? "border-black/[0.2]"
                  : "border-white/[0.1]"
                  }`}
              >
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image
                      src={SAFE_BOX[chainId][key]?.LOGO}
                      width={40}
                      height={40}
                      alt="image"
                    />
                    <span
                      style={{ paddingLeft: "0.7rem" }}
                      className={styles.tdSpan}
                    >{key}</span>
                  </div>
                </td>
                <td>
                  {" "}
                  <span className={styles.tdSubtitle}>
                    Strategy Net APY %<br />
                    (Weekly Earnings)
                  </span>
                  <span className={styles.coltd}>
                    {lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.supplyApy.toFixed(2)} %
                    (${formatBigNumber(lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()].myWeeklyEarningsUSD, 18, 2)} USD)
                  </span>
                </td>
                <td className={styles.tdSubtitle}>
                  <p>
                    {formatBigNumber(
                      lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()].myPoolBalance,
                      18, 2
                    )} {SAFE_BOX[chainId][key].SYMBOL}
                  </p>
                  <p className={styles.smallPositionText}>
                    ${formatBigNumber(
                      lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()].myPoolBalanceUSD,
                      18,
                      2
                    )} USD
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default LendingPositionTable;
