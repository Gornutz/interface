import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import Button from "../Button/Button";
import { useTheme } from "@mui/material/styles";
import { Divider, MenuItem } from "@mui/material";
import { NETWORKS, SUPPORTED_CHAINS } from "constant";
import { useActiveWeb3React } from "hooks";
import { utils } from "ethers";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ChainDropdown({ className }: any) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { chainId } = useActiveWeb3React();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newChainId) => {
    handleClose();
    if (chainId === newChainId)
      return;
    const ethereum = (window as any).ethereum;
    try {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: utils.hexlify(newChainId) }]
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      // if (err.code === 4902) {
      //   ethereum.request({
      //     method: 'wallet_addEthereumChain',
      //     params: [
      //       {
      //         chainName: NETWORKS[chainId].LABEL,
      //         chainId: utils.hexlify(chainId),
      //         nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
      //         rpcUrls: ['https://polygon-rpc.com/']
      //       }
      //     ]
      //   });
      // }
    }
  }

  return (
    <>
      <Button
        type="button"
        className={`${theme.palette.mode === "light" ? "bg-slate-200" : "bg-white-01"
          } ${className}`}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Image
          src={NETWORKS[chainId].LOGO}
          alt="Blueberry Web"
          width={20}
          height={20}
        />
        <span className="px-3">{NETWORKS[chainId].LABEL}</span>
        <Image
          src="/icons/arrowDown.svg"
          alt="Blueberry Web"
          width={15}
          height={15}
        />
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {SUPPORTED_CHAINS.filter(chainId => NETWORKS[chainId].MAINNET).map(chainId => (
          <MenuItem onClick={() => handleChange(chainId)} disabled key={chainId} >
            <Image
              src={NETWORKS[chainId].LOGO}
              alt="Blueberry Web"
              width={20}
              height={20}
            />
            &nbsp;{NETWORKS[chainId].LABEL}
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        {SUPPORTED_CHAINS.filter(chainId => !NETWORKS[chainId].MAINNET).map(chainId => (
          <MenuItem onClick={() => handleChange(chainId)} key={chainId} >
            <Image
              src={NETWORKS[chainId].LOGO}
              alt="Blueberry Web"
              width={20}
              height={20}
            />
            &nbsp;{NETWORKS[chainId].LABEL}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
