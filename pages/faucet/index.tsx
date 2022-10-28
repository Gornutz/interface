import type { NextPage } from "next";
import Image from "next/image";
import Card from "components/UI/Card/Card";
import CustomButton from "components/UI/CustomButton";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { formatBigNumber } from "utils";
import { ChainId, TOKENS } from "constant";
import { useActiveWeb3React, useTokenBalances } from "hooks";
import { BigNumber, Contract, ethers, utils } from "ethers";
import styles from "pages/lend/lend.module.scss";
import { toast } from "react-toastify";
import { ABIS } from "abi";
import { TokenInfo } from "interfaces";

const Faucet: NextPage = () => {
	const theme = useTheme();
	const balances = useTokenBalances();
	const { active, library, account } = useActiveWeb3React();

	const balance = (addr: string): BigNumber => {
		return balances[addr.toLowerCase()] || ethers.constants.Zero;
	}

	const onFaucet = async (token: TokenInfo) => {
		try {
			if (!library || !active) {
				toast.error("Please connect wallet first!");
				return;
			}
			const signer = await library.getSigner();
			const baseToken = new Contract(token.ADDR, ABIS.BaseToken, library);
			const tx = await baseToken.connect(signer).mint(account, utils.parseUnits('1000', token.DECIMALS));
			await tx.wait();
		} catch (error) {
		}
	}

	return (
		<>
			<Helmet>
				<title>
					Blueberry | Faucet
				</title>
			</Helmet>
			<Card className={styles.mainContainer}>
				<table className={styles.table_bottom}>
					<thead className={styles.header}>
						<tr>
							<td className={styles.tHeading}>Token</td>
							<td className={styles.tHeading}>Balance</td>
							<td className={styles.tHeading}></td>
						</tr>
					</thead>
					<tbody className={styles.tbody}>
						<tr
							className={`border-y-[1px] ${theme.palette.mode === "light"
								? "border-black/[0.2]"
								: "border-white/[0.1]"
								}`}
						>
							<td className={styles.columnRoundLeft}>
								<div className={styles.tableCol}>
									<Image
										src={TOKENS[ChainId.Goerli].BLB.LOGO}
										width={40}
										height={40}
										alt="token logo"
									/>
									<span style={{ paddingLeft: "0.7rem" }}>{TOKENS[ChainId.Goerli].BLB.SYMBOL}</span>
								</div>
							</td>
							<td>
								{formatBigNumber(
									balance(TOKENS[ChainId.Goerli].BLB.ADDR),
									TOKENS[ChainId.Goerli].BLB.DECIMALS,
									2
								)} {TOKENS[ChainId.Goerli].BLB.SYMBOL}
							</td>
							<td>
								<div className={styles.tableCol}>
									<CustomButton
										title="Faucet"
										handleButtonClick={() => onFaucet(TOKENS[ChainId.Goerli].BLB)}
										buttonStyle={styles.depositButton}
									/>
								</div>
							</td>
						</tr>
						<tr
							className={`border-y-[1px] ${theme.palette.mode === "light"
								? "border-black/[0.2]"
								: "border-white/[0.1]"
								}`}
						>
							<td className={styles.columnRoundLeft}>
								<div className={styles.tableCol}>
									<Image
										src={TOKENS[ChainId.Goerli].USDC.LOGO}
										width={40}
										height={40}
										alt="token logo"
									/>
									<span style={{ paddingLeft: "0.7rem" }}>{TOKENS[ChainId.Goerli].USDC.SYMBOL}</span>
								</div>
							</td>
							<td>
								{formatBigNumber(
									balance(TOKENS[ChainId.Goerli].USDC.ADDR),
									TOKENS[ChainId.Goerli].USDC.DECIMALS,
									2
								)} {TOKENS[ChainId.Goerli].USDC.SYMBOL}
							</td>
							<td>
								<div className={styles.tableCol}>
									<CustomButton
										title="Faucet"
										handleButtonClick={() => onFaucet(TOKENS[ChainId.Goerli].USDC)}
										buttonStyle={styles.depositButton}
									/>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</Card>
		</>
	);
};

export default Faucet;
