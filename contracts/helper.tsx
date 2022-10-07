import { ethers } from "ethers";
import { toast } from "react-toastify";

import { ABIS } from "./abi";

import {
  ICHI_VAULT_SPELL_ADDR,
  USDC_ADDR,
  ICHI_ADDR,
  BANK_ADDR,
  SAFEBOX_ADDR,
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
    try {
      let provider = new ethers.providers.Web3Provider(ethereum);
      let signer = provider.getSigner();
      let signer_address = await signer.getAddress();

      let bank_contract = new ethers.Contract(BANK_ADDR, ABIS.Bank, signer);

      let spell_iface = new ethers.utils.Interface(ABIS.IchiSpell);

      let token_contract =
        collateral == "ICHI"
          ? new ethers.Contract(ICHI_ADDR, ABIS.ERC20, signer)
          : new ethers.Contract(USDC_ADDR, ABIS.ERC20, signer);

      const _tokenValue = await token_contract.balanceOf(signer_address);
      const mytokenValue = ethers.utils.formatEther(_tokenValue);
      if (Number(mytokenValue) < amount) {
        toast.error(`Your max amount is ${mytokenValue}`);
        return false;
      }

      const tx = await token_contract.approve(
        BANK_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18)
      );
      await tx.wait();

      let tx1 = await bank_contract.execute(
        0,
        ICHI_VAULT_SPELL_ADDR,
        spell_iface.encodeFunctionData("openPosition", [
          collateral == "ICHI" ? ICHI_ADDR : USDC_ADDR,
          ethers.utils.parseUnits(amount.toString(), 18),
          ethers.utils.parseUnits(amount1.toString(), 18),
        ])
      );
      await tx1.wait();
      return true;
    } catch (error) {
      console.log("openPosition", error);
      return false;
    }
  }
  return false;
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

    let bank_contract = new ethers.Contract(BANK_ADDR, ABIS.Bank, signer);

    let spell_iface = new ethers.utils.Interface(ABIS.IchiSpell);

    // add collateral
    let token_contract = new ethers.Contract(USDC_ADDR, ABIS.ERC20, signer);
    const tx = await token_contract.approve(
      BANK_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await bank_contract.execute(
      position_id,
      ICHI_VAULT_SPELL_ADDR,
      spell_iface.encodeFunctionData("increasePosition", [
        USDC_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18),
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

    let bank_contract = new ethers.Contract(BANK_ADDR, ABIS.Bank, signer);

    let spell_iface = new ethers.utils.Interface(ABIS.IchiSpell);

    let token_contract = new ethers.Contract(USDC_ADDR, ABIS.ERC20, signer);
    const tx = await token_contract.approve(
      BANK_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await bank_contract.execute(
      position_id,
      ICHI_VAULT_SPELL_ADDR,
      spell_iface.encodeFunctionData("reducePosition", [
        USDC_ADDR,
        ethers.utils.parseUnits(amount.toString(), 18),
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

    let bank_contract = new ethers.Contract(BANK_ADDR, ABIS.Bank, signer);

    let spell_iface = new ethers.utils.Interface(ABIS.IchiSpell);

    let token_contract = new ethers.Contract(USDC_ADDR, ABIS.ERC20, signer);
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

export const lendDeposit = async (amount: number) => {
  let { ethereum } = window;
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();

    let safebox_contract = new ethers.Contract(
      SAFEBOX_ADDR,
      ABIS.SafeBox,
      signer
    );

    let token_contract = new ethers.Contract(USDC_ADDR, ABIS.ERC20, signer);
    const tx = await token_contract.approve(
      SAFEBOX_ADDR,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    let tx1 = await safebox_contract.deposit(
      ethers.utils.parseUnits(amount.toString(), 18)
    );

    await tx1.wait();
  }
};

export const lendClose = async () => {
  let { ethereum } = window;
  if (typeof window.ethereum !== undefined && window.ethereum) {
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let signer_address = await signer.getAddress();

    let safebox_contract = new ethers.Contract(
      SAFEBOX_ADDR,
      ABIS.SafeBox,
      signer
    );

    let amount = await safebox_contract.balanceOf(signer_address);
    let tx = await safebox_contract.withdraw(amount.toString());

    await tx.wait();
  }
};
