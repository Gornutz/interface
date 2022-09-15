import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core"
import NButton from "../UI/Button/Button";
import Style from "./web3button.module.scss"
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connectors } from "./connectors";
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Web3Provider } from '@ethersproject/providers'
import { useWidth } from '../../hooks/useWidth'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // backgroundColor: 'rgb(0 0 0 / 80%)',
  backdropFilter: 'blur(10px)',
  '& .MuiDialog-paper': {
    backgroundColor: '#161522',
    border: '1px solid #202231',
    width: '28rem',
    borderRadius: '0.75rem',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, color: '#e3e3ff' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#e3e3ff',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface ConnectProps {
  // connect: (() => Promise<void>) | null,
  // active: boolean,
  openConnectDlg: boolean,
  title: string,
}
const ConnectButton = ({ title, openConnectDlg }: ConnectProps) => {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React<Web3Provider>()
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type)
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(openConnectDlg)
  }, [openConnectDlg])

  return (
    <>
      <Button
        onClick={handleClickOpen}
        className={`${Style.container} ${Style.button}`}
      >
        {title}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Select a wallet
        </BootstrapDialogTitle>
        <DialogContent>
          <div className='grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2'>
            <div
              onClick={async () => {
                await activate(connectors.coinbaseWallet);
                setProvider("coinbaseWallet");
                setOpen(false);
              }}
              className='cursor-pointer bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 justify-between w-full px-4 py-3 rounded border border-slate-700 hover:border-blue-600'
            >
              <div className='flex flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-bold text-[#e3e3ff]'>
                    Coinbase Wallet
                  </div>
                </div>
              </div>
              <Image
                src="/wallet/cbw.png"
                alt="Coinbase Wallet Logo"
                width={25}
                height={25}
                style={{borderRadius: '3px'}}
              />
            </div>
            <div
              onClick={async () => {
                await activate(connectors.walletConnect);
                setProvider("walletConnect");
                setOpen(false);
              }}
              className='cursor-pointer bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 justify-between w-full px-4 py-3 rounded border border-slate-700 hover:border-blue-600'
            >
              <div className='flex flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-bold text-[#e3e3ff]'>
                    Wallet Connect
                  </div>
                </div>
              </div>
              <Image
                src="/wallet/wc.png"
                alt="Wallet Connect Logo"
                width={25}
                height={25}
                style={{borderRadius: '3px'}}
              />
            </div>
            <div
              onClick={async () => {
                await activate(connectors.injected);
                setProvider("injected");
                setOpen(false);
              }}
              className='cursor-pointer bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 justify-between w-full px-4 py-3 rounded border border-slate-700 hover:border-blue-600'
            >
              <div className='flex flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-bold text-[#e3e3ff]'>
                  MetaMask
                  </div>
                </div>
              </div>
              <Image
                src="/wallet/mm.png"
                alt="MetaMask Logo"
                width={25}
                height={25}
                style={{borderRadius: '3px'}}
              />
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <span className='text-xs leading-4 font-medium text-[#7f7f7f]'>
              New to Ethereum?
              <span className='text-xs leading-4 font-medium text-blue-600'>
                <Link href={"https://ethereum.org/wallets/"}>
                  <a className='text-baseline whitespace-nowrap text-blue-600 opacity-80 hover:opacity-100 focus:opacity-100' target="_blank">
                    Learn more about wallets
                  </a>
                </Link>
              </span>
            </span>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

interface DisconnectProps {
  // disconnect: (() => Promise<void>) | null,
  // active: boolean,
  showConnectDlg: (() => void),
  balance: number,
}

const DisconnectButton = ({ showConnectDlg, balance }: DisconnectProps) => {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React<Web3Provider>()

  const [open, setOpen] = React.useState(false)
  const [provider, setProvider] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) {
      setProvider(provider)
    }
  }, []);
  return (
    <>
      <NButton
        type="button"
        className="bg-white-01"
        onClick={handleClickOpen}
      >
        <span className={`mr-3`}>{`${balance.toFixed(4)} ETH`}</span>{' '}
        <span>{account.substring(0, 6) + "..." + account.substring(account.length - 4)}</span>
      </NButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Account
        </BootstrapDialogTitle>
        <DialogContent>
          <div className='flex flex-col gap-3 border border-[#20223199] rounded p-4'>
            <div className='flex items-center justify-between'>
              <div className='text-xs leading-4 font-bold text-[#7f7f7f]'>
                Connected with
                {provider == 'injected' ? ' MetaMask' : (provider == 'coinbaseWallet' ? ' Coinbase' : ' WalletConnect')}
              </div>
              <button className="border-2 disabled:pointer-events-none disabled:opacity-40 border-none bg-blue-600/20 hover:bg-blue-600/40 active:bg-blue-600/60 text-blue-600 focus:bg-blue-600/40 text-xs rounded-full px-2 h-[28px] !border font-bold flex items-center justify-center gap-1" onClick={showConnectDlg}>Change</button>
            </div>
            <div className='flex flex-col justify-center gap-4'>
              <div className='flex items-center gap-4'>
                <div className='overflow-hidden rounded-full'>
                  <Image src={'/icons/home.svg'} width={50} height={50} />
                </div>
                <div className='text-lg leading-6 font-bold text-white'>
                  {account.substring(0, 6) + "..." + account.substring(account.length - 4)}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 space-x-3'>
              <Link href={"https://etherscan.io/address/0xC12F5cB5F3b7C7E5e0f632DadA6E029d20c5BE0d"}>
                <a className='text-baseline whitespace-nowrap text-blue-600 opacity-80 hover:opacity-100 focus:opacity-100 space-x-1 flex items-center justify-center' target="_blank">
                  <OpenInNewIcon sx={{fontSize: '16px'}}/>
                  <div className='text-xs leading-4 font-bold currentColor'>
                    View on explorer
                  </div>
                </a>
              </Link>
              <div>
                <div className='flex items-center gap-1 cursor-pointer text-[#bfbfbf]'>
                  <div className='text-xs leading-4 font-bold currentColor'>Copy Address</div>
                  <ContentCopyIcon sx={{fontSize: '16px'}}/>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 border border-[#20223199] rounded p-4 mt-4'>
            <div className='flex items-center justify-between'>
              <div className='text-xs leading-4 font-bold text-[#7f7f7f]'>
                Recent Transactions
              </div>
              <button className="border-2 disabled:pointer-events-none disabled:opacity-40 border-none bg-blue-600/20 hover:bg-blue-600/40 active:bg-blue-600/60 text-blue-600 focus:bg-blue-600/40 text-xs rounded-full px-2 h-[28px] !border font-bold flex items-center justify-center gap-1">Clear all</button>
            </div>
            <div className='flex flex-col divide-y divide-dark-800'>
              <div className='text-xs leading-4 font-bold text-[#7f7f7f]'>
                Your transactions will appear here...
              </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export function Web3Button() {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React<Web3Provider>()

  const [openConnectDlg, setOpenConnectDlg] = React.useState(false)
  const [ethBalance, setEthBalance] = useState<number>(0)

  const handleShowConnectDlg = () => {
    window.localStorage.setItem("provider", undefined)
    deactivate()
    setOpenConnectDlg(true)
  }
  const width = useWidth()

  useEffect(() => {
    if(active && account){
      library?.getBalance(account).then((result)=>{
        const balance = Number.parseFloat(ethers.utils.formatEther(result))
        setEthBalance(balance)
      })
    }
  })

  return (
    <>
      {
        active ? (
          <DisconnectButton balance={ethBalance} showConnectDlg={handleShowConnectDlg}/>
        ) : (
          <ConnectButton title={width < 680 ? "Connect" : 'Connect Wallet'} openConnectDlg={openConnectDlg}/>
        )
      }
    </>
  )
}
