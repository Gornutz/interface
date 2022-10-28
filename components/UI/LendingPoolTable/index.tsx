import { useTheme } from "@mui/material";
import Image from "next/image";
import { SAFE_BOX } from "constant";
import { useActiveWeb3React, useLendingPoolInfos } from "hooks";
import styles from "pages/lend/lend.module.scss";
import { formatBigNumber } from "utils";
import CustomButton from "../CustomButton";

const LendingPoolTable = ({
	onDeposit
}: {
	onDeposit: (poolKey: string) => void
}) => {
	const theme = useTheme();
	const { chainId } = useActiveWeb3React();
	const lendingPoolInfos = useLendingPoolInfos();

	return (
		<table className={styles.table_bottom}>
			<thead className={styles.header}>
				<tr>
					<td className={styles.tHeading}>Pool</td>
					<td className={styles.tHeading}>APY</td>
					<td className={styles.tHeading}>Total Supply</td>
					<td className={styles.tHeading}>Total Borrowed</td>
					<td className={styles.tHeading}>Utilization</td>
					<td className={styles.tHeading}></td>
					<td className={styles.tHeading}></td>
				</tr>
			</thead>
			<tbody className={styles.tbody}>
				{Object.keys(SAFE_BOX[chainId]).map(key => (
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
									src={SAFE_BOX[chainId][key].LOGO}
									width={40}
									height={40}
									alt={key}
								/>
								<span style={{ paddingLeft: "0.7rem" }}>{key}</span>
							</div>
						</td>
						<td>{lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.supplyApy.toFixed(2)} %</td>
						<td>
							<p>
								{formatBigNumber(
									lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.totalSupply,
									SAFE_BOX[chainId][key].DECIMAL,
									2
								)} {SAFE_BOX[chainId][key].cTOKEN.uTOKEN.SYMBOL}
							</p>
							<p className={styles.smallPositionText}>
								${formatBigNumber(lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.tvl, 18, 2)} USD
							</p>
						</td>
						<td>
							<p>
								{formatBigNumber(
									lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.totalBorrow,
									SAFE_BOX[chainId][key].DECIMAL,
									2
								)} {SAFE_BOX[chainId][key].cTOKEN.uTOKEN.SYMBOL}
							</p>
							<p className={styles.smallPositionText}>
								${formatBigNumber(lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.totalBorrowUSD,
									SAFE_BOX[chainId][key].DECIMAL,
									2
								)} USD
							</p>
						</td>
						<td>
							{(lendingPoolInfos[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.utilization / 100).toFixed(2)} %
						</td>
						<td></td>
						<td>
							{" "}
							<div className={styles.tableCol}>
								<CustomButton
									title="Deposit"
									handleButtonClick={() => onDeposit(key)}
									buttonStyle={styles.depositButton}
								/>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default LendingPoolTable;