import { Tabs, Tab } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../../components/UI/Button/Button'
import Card from '../../components/UI/Card/Card'
import CustomButton from '../../components/UI/customButton/customButton'
import { useWidth } from '../../hooks/useWidth'
import styles from './lend.module.scss'
import MobileTableLend from './mobileTableLend/mobileTableLend'
import DepositModal from './depositModal/depositModal'
import Popup from '../../components/UI/Popup/popup'

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
      <div className={styles.topContainer}>
        <div>
          <h4 className={styles.heading}>Lending</h4>
          <p className={styles.text}>
            Earn competitive interest on single sided deposits with Blueberry Lend
          </p>
        </div>
        <div className={styles.rightContainer}>
          <input className={styles.btnSearch} placeholder={"Search..."}/>
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
            <span style={{ color: value === 0 ? '#19857b' : 'white' }}>
              My Positions
            </span>
          }
        />
        {/* <Tab
          label={
            <span style={{ color: value === 1 ? '#19857b' : 'white' }}>
              Liquidated Positions
            </span>
          }
        /> */}
      </Tabs>
      <div className={styles.divider}></div>
      {value == 0 && (
        <table className={styles.table}>
          <thead className={styles.header}>
            <tr>
              <td className={styles.tHeading}>Pool</td>
              <td className={styles.tHeading}>APY % (Weekly Earnings)</td>
              <td className={styles.tHeading}></td>
              <td className={styles.tHeading}></td>
              <td className={styles.tHeading}>Your Position</td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr className={` ${styles.bottom}`}>
              <td className={styles.columnRoundLeft}>
                <div className={styles.tableCol}>
                  <Image src="/icons/pic.svg" width={30} height={30} />
                  <span style={{ paddingLeft: '0.7rem' }}>ICHI</span>
                </div>
              </td>
              <td>12% <span className={styles.smallAPYText}>($576)</span></td>
              <td></td>
              <td></td>
              <td>
                <p>250,0000 ICHI</p>
                <p className={styles.smallPositionText}>$2,500,000 USD</p>
              </td>
            </tr>

            <tr>
              <td>
                <div className={styles.tableCol}>
                  <Image src="/icons/pic1.svg" width={30} height={30} />
                  <span style={{ paddingLeft: '0.7rem' }}>oneICHI</span>
                </div>
              </td>
              <td>12% <span className={styles.smallAPYText}>($576)</span></td>
              <td></td>
              <td></td>
              <td>
                <p>250,0000 oneICHI</p>
                <p className={styles.smallPositionText}>$2,500,000 USD</p>
              </td>
            </tr>
          </tbody>
        </table>
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
              <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={30} height={30} />
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
              <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic1.svg" width={30} height={30} />
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
                <td className={styles.columnRoundRight}></td>
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
              <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={30} height={30} />
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
                <td className={styles.columnRoundRight}></td>
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
              {/* <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={40} height={40} />
                    <span style={{ paddingLeft: '0.7rem' }}>
                      ICHI-USDC Vault
                    </span>
                  </div>
                </td>
                <td>$500 USD</td>
                <td>$250 USD</td>
                <td>$250 USD</td>
                <td>$250 USD</td>
                <td className={styles.columnRoundRight}>$250 USD</td>
                <td>
                  <CustomButton
                    title="Deposit"
                    handleButtonClick={() => {}}
                    buttonStyle={styles.depositButton}
                  />
                </td>
              </tr> */}
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
