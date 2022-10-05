import { ethers } from "ethers";

import spell_abi from "./abi/IchiSpellVault_abi.json";
import bank_abi from "./abi/BlueBerryBank_abi.json";
import sToken_abi from "./abi/SupplyToken_abi.json";
import bToken_abi from "./abi/BaseToken_abi.json";
// import erc20_abi from './abi/ERC20.json';

import {
  ICHI_VAULT_SPELL_ADDR,
  USDC_ADDR,
  ICHI_ADDR,
  BANK_ADDR,
} from "./constants";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const openPosition = async (
  collateral: string,
  amount: number,
  amount1: number
) => {
  let { ethereum } = window;
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();

    let bank_contract = new ethers.Contract(BANK_ADDR, bank_abi, signer);

    let spell_iface = new ethers.utils.Interface(spell_abi);

    let token_contract =
      collateral == "ICHI"
        ? new ethers.Contract(ICHI_ADDR, bToken_abi, signer)
        : new ethers.Contract(USDC_ADDR, sToken_abi, signer);
    const tx = await token_contract.approve(
      BANK_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await bank_contract.execute(
      0,
      ICHI_VAULT_SPELL_ADDR,
      spell_iface.encodeFunctionData("deposit", [
        collateral == "ICHI" ? ICHI_ADDR : USDC_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18),
        ethers.utils.parseUnits(amount1.toString(), 18),
      ])
    );
    await tx1.wait();
  }
};

export const getPositionList = async () => {
  let { ethereum } = window;
  var positions = [];
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let signer_address = await signer.getAddress();

    let bank_contract = new ethers.Contract(BANK_ADDR, bank_abi, signer);
    let _nextPositionId = await bank_contract.nextPositionId();
    let nextPositionId = _nextPositionId.toString();

    for (let i = 0; i < nextPositionId; i++) {
      var result = await bank_contract.positions(i.toString());
      var debtValue = await bank_contract.getDebtValue(i.toString());

      if (result[0] === signer_address) {
        var obj = {
          owner: result[0], // The owner of this position.
          collToken: result[1], // The ERC1155 token used as collateral for this position.
          underlyingToken: result[2],
          underlyingAmount: ethers.utils.formatEther(result[3]),
          underlyingcTokenAmount: ethers.utils.formatEther(result[4]),
          collId: ethers.utils.formatEther(result[5]), // The token id used as collateral.
          collateralSize: ethers.utils.formatEther(result[6]), // The size of collateral token for this position.
          debtMap: ethers.utils.formatEther(result[7]), // Bitmap of nonzero debt. i^th bit is set iff debt share of i^th bank is nonzero.
          positionId: i,
          debtValue: parseFloat(ethers.utils.formatEther(debtValue)).toFixed(3),
        };
        positions.push(obj);
      }
    }
  }
  return positions;
};

export const addCollateral = async (
  position_id: number,
  amount: number,
  leverage: number
) => {
  let { ethereum } = window;
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();

    let bank_contract = new ethers.Contract(BANK_ADDR, bank_abi, signer);

    let spell_iface = new ethers.utils.Interface(spell_abi);

    // add collateral
    let token_contract = new ethers.Contract(USDC_ADDR, sToken_abi, signer);
    const tx = await token_contract.approve(
      BANK_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await bank_contract.execute(
      position_id,
      ICHI_VAULT_SPELL_ADDR,
      spell_iface.encodeFunctionData("deposit", [
        USDC_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18),
        ethers.utils.parseUnits((amount * leverage).toString(), 18),
      ])
    );
    await tx1.wait();
  }
};

export const removeCollateral = async (
  position_id: number,
  amount: number,
  leverage: number
) => {
  let { ethereum } = window;
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();

    let bank_contract = new ethers.Contract(BANK_ADDR, bank_abi, signer);

    let spell_iface = new ethers.utils.Interface(spell_abi);

    let token_contract = new ethers.Contract(USDC_ADDR, sToken_abi, signer);
    const tx = await token_contract.approve(
      BANK_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await bank_contract.execute(
      position_id,
      ICHI_VAULT_SPELL_ADDR,
      spell_iface.encodeFunctionData("withdraw", [
        USDC_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18),
        ethers.utils.parseUnits("0", 18),
        ethers.utils.parseUnits("0", 18),
        ethers.utils.parseUnits("0", 18),
      ])
    );

    await tx1.wait();
  }
};

export const depositToken = async (
  position_id: number,
  amount: number,
  leverage: number
) => {
  let { ethereum } = window;
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();

    let bank_contract = new ethers.Contract(BANK_ADDR, bank_abi, signer);

    let spell_iface = new ethers.utils.Interface(spell_abi);

    let token_contract = new ethers.Contract(USDC_ADDR, sToken_abi, signer);
    const tx = await token_contract.approve(
      BANK_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await bank_contract.execute(
      position_id,
      ICHI_VAULT_SPELL_ADDR,
      spell_iface.encodeFunctionData("deposit", [
        USDC_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18),
        ethers.utils.parseUnits((amount * leverage).toString(), 18),
      ])
    );

    await tx1.wait();
  }
};
