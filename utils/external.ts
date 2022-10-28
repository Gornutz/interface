import axios from 'axios';

export const getIchiAngelVaultInfo = async (poolId: number): Promise<number> => {
	try {
		const url = `https://api.ichi.org/v1/farms/${poolId}`;
		const res: any = await axios.get(url);
		return res.data.vaultIRR;
	} catch (err) {
		console.error(err);
		return 0;
	}
}