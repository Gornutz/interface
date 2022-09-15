import { Tabs, Tab } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import CustomButton from '../../components/UI/customButton/customButton'
import { useWidth } from '../../hooks/useWidth'
import styles from './lend.module.scss'
import MobileTableLend from './mobileTableLend/mobileTableLend'
import DepositModal from './depositModal/depositModal'
import Popup from '../../components/UI/Popup/popup'
import { Web3Button } from '../../components/web3/Web3Button'
import Text from '../../components/UI/Text/Text'
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import { useTheme } from '@mui/material/styles'
import TableGrid from './TableGrid/TableGrid'

const tableData = [
  {
    name: 'ICHI',
    image: '/icons/pic.svg',
    apy: '12%',
    totalSupplyIchi: '5,000,000 ICHI',
    totalSupplyusd: '5,000,000 USD',
    totalBorrowedIchi: '4,000,000 ICHI',
    totalBorrowedUsd: '4,000,000 USD',
    utilization: '80%',
  },
  {
    name: 'oneICHI',
    image: '/icons/pic1.svg',
    apy: '12%',
    totalSupplyIchi: '5,000,000 ICHI',
    totalSupplyusd: '5,000,000 USD',
    totalBorrowedIchi: '4,000,000 ICHI',
    totalBorrowedUsd: '4,000,000 USD',
    utilization: '80%',
  },
  {
    name: 'ICHI',
    image: '/icons/pic.svg',
    apy: '12%',
    totalSupplyIchi: '5,000,000 ICHI',
    totalSupplyusd: '5,000,000 USD',
    totalBorrowedIchi: '4,000,000 ICHI',
    totalBorrowedUsd: '4,000,000 USD',
    utilization: '80%',
  },
]

const Earn: NextPage = () => {
  const [depositDlgOpen, setDepositDlgOpen] = useState(false)
  const [tokenName, setTokenName] = useState("ICHI")
  const [value, setValue] = useState(0)
  const width = useWidth()
  const theme = useTheme()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const closeDepositModal = () => {
    setDepositDlgOpen(false)
  }
  const handleSuccessPosition = (value: string) => {
    closeDepositModal()
  }
  const handleMobileDeposit = (value: string) => {
    setDepositDlgOpen(true)
  }
  return (
    <div className={`${width <= 680 ? 'h-fit' : 'h-full'} items-center my-4 md:px-16 sm:px-1 2sm:px0 sm:block`}>
      {width <= 680 && (
        <header className="md:h-[90px] pb-4 md:flex items-center md:px-16 sm:px-1 2sm:px0 sm:h-[150px] sm:block">
          <Text>
            {' '}
            <h3>Lend</h3>
          </Text>

          <div className="flex my-grid items-center">
            <Image
              src="/icons/men.svg"
              alt="Blueberry Web"
              width={40}
              height={40}
              className={styles.menuIcon}
            />

            <Dropdown className={'flex-1'} />
            <Web3Button />
          </div>
        </header>
      )}
      <div className={styles.topContainer}>
        <div>
          <h4 className={styles.heading}>Lending</h4>
          <p className={styles.text}>
            Earn competitive interest on single sided deposits with Blueberry Lend
          </p>
        </div>
        <div className={styles.rightContainer}>
          <input className={`${styles.btnSearch} ${theme.palette.mode === 'light' ? 'bg-black/[0.1]':'bg-white/[0.1]'}`} placeholder={"Search..."}/>
        </div>
      </div>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab
          label={
            <span style={{ color: value === 0 ? '#19857b' : (theme.palette.mode === 'light' ? '#000' : '#fff') }}>
              My Positions
            </span>
          }
        />
        {/* <Tab
          label={
            <span style={{ color: value === 1 ? '#19857b' : (theme.palette.mode === 'light' ? '#000' : '#fff') }}>
              Liquidated Positions
            </span>
          }
        /> */}
      </Tabs>
      <div className={`${theme.palette.mode === 'light' ? styles.dividerLight : styles.dividerDark} ${styles.divider}`}></div>
      {value == 0 && (
        <TableGrid />
      )}
      {value == 1 && <div></div>}

      {width <= 680 ? (
        <MobileTableLend tableData={tableData || []} onBtnNewClick={handleMobileDeposit} />
      ) : (
        <div className="mt-10 pb-40">
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
              <tr className={`border-y-[1px] ${theme.palette.mode === 'light' ? 'border-black/[0.2]':'border-white/[0.1]'}`}>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={30} height={30} alt={"ICHI"}/>
                    <span style={{ paddingLeft: '0.7rem' }}>ICHI</span>
                  </div>
                </td>
                <td>12%</td>
                <td>
                  <p>5,000,000 ICHI</p>
                  <p className={styles.smallPositionText}>$50,000,000 USD</p>
                </td>
                <td>
                  <p>4,000,000 ICHI</p>
                  <p className={styles.smallPositionText}>$12,360,100 USD</p>
                </td>
                <td>80%</td>
                <td></td>
                <td>
                  {' '}
                  <div className={styles.tableCol}>
                    <CustomButton
                      title="Deposit"
                      handleButtonClick={() => {setDepositDlgOpen(true); setTokenName("ICHI");}}
                      buttonStyle={styles.depositButton}
                    />
                    {/* <Image src="/icons/union.svg" width={20} height={20} /> */}
                  </div>
                </td>
              </tr>
              <tr className={`border-y-[1px] ${theme.palette.mode === 'light' ? 'border-black/[0.2]':'border-white/[0.1]'}`}>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic1.svg" width={30} height={30} alt={"oneICHI"}/>
                    <span style={{ paddingLeft: '0.7rem' }}>oneICHI</span>
                  </div>
                </td>
                <td>12%</td>
                <td>
                  <p>5,000,000 oneICHI</p>
                  <p className={styles.smallPositionText}>$50,000,000 USD</p>
                </td>
                <td>
                  <p>4,000,000 oneICHI</p>
                  <p className={styles.smallPositionText}>$12,360,100 USD</p>
                </td>
                <td>80%</td>
                <td></td>
                <td>
                  {' '}
                  <div className={styles.tableCol}>
                    <CustomButton
                      title="Deposit"
                      handleButtonClick={() => {setDepositDlgOpen(true); setTokenName("oneICHI");}}
                      buttonStyle={styles.depositButton}
                    />
                    {/* <Image src="/icons/union.svg" width={20} height={20} /> */}
                  </div>
                </td>
              </tr>
              <tr className={`border-y-[1px] ${theme.palette.mode === 'light' ? 'border-black/[0.2]':'border-white/[0.1]'}`}>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={30} height={30} alt={"USDC"}/>
                    <span style={{ paddingLeft: '0.7rem' }}>USDC</span>
                  </div>
                </td>
                <td>12%</td>
                <td>
                  <p>5,000,000 USDC</p>
                  <p className={styles.smallPositionText}>$50,000,000 USD</p>
                </td>
                <td>
                  <p>4,000,000 USDC</p>
                  <p className={styles.smallPositionText}>$12,360,100 USD</p>
                </td>
                <td>80%</td>
                <td></td>
                <td>
                  {' '}
                  <div className={styles.tableCol}>
                    <CustomButton
                      title="Deposit"
                      handleButtonClick={() => {setDepositDlgOpen(true); setTokenName("USDC");}}
                      buttonStyle={styles.depositButton}
                    />
                    {/* <Image src="/icons/union.svg" width={20} height={20} /> */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Popup
        // onClick={(e) => newPositionOpenHandler('success-position')}
        isOpen={depositDlgOpen}
        handleClose={closeDepositModal}
        title={'Deposit'}
      >
        <DepositModal tokenName={tokenName} handleButtonClick={handleSuccessPosition} />
      </Popup>
    </div>
  )
}

export default Earn
