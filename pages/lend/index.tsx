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
  const [value, setValue] = useState(0)
  const width = useWidth()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className="md:h-[90px] items-center  mt-3 md:px-16 sm:px-1 2sm:px0 sm:h-[150px] sm:block">
      <div className={styles.topContainer}>
        <div>
          <h4 className={styles.heading}>Lending</h4>
          <p className={styles.text}>
            Blueberry also offers features such as dual borrow which allows for
            strategies such as pseudo delta neutral farming within a single
            position.
          </p>
        </div>
        <div className={styles.rightContainer}>
          <h4 className={styles.title}>TVL</h4>
          <h4 className={styles.title}>$100,000,000.00</h4>
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
              <td className={styles.tHeading}>APY</td>
              <td className={styles.tHeading}></td>
              <td className={styles.tHeading}></td>
              <td className={styles.tHeading}>Your Position</td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr className={` ${styles.bottom}`}>
              <td className={styles.columnRoundLeft}>
                <div className={styles.tableCol}>
                  <Image src="/icons/pic.svg" width={40} height={40} />
                  <span style={{ paddingLeft: '0.7rem' }}>ICHI</span>
                </div>
              </td>
              <td>12%</td>
              <td></td>
              <td></td>
              <td>250,0000 ICHI</td>
            </tr>

            <tr>
              <td>
                <div className={styles.tableCol}>
                  <Image src="/icons/pic1.svg" width={40} height={40} />
                  <span style={{ paddingLeft: '0.7rem' }}>oneICHI</span>
                </div>
              </td>
              <td>12%</td>
              <td></td>
              <td></td>
              <td>250,0000 oneICHI</td>
            </tr>
          </tbody>
        </table>
      )}
      {value == 1 && <div></div>}

      {width <= 680 ? (
        <MobileTableLend tableData={tableData || []} />
      ) : (
        <div className="mt-10">
          <table className={styles.table_bottom}>
            <thead className={styles.header}>
              <tr>
                <td className={styles.tHeading}>Pool</td>
                <td className={styles.tHeading}>APY</td>
                <td className={styles.tHeading}>Total Supply</td>
                <td className={styles.tHeading}>Total Borrowed</td>
                <td className={styles.tHeading}>Utilization</td>
                <td className={styles.tHeading}>APY (14D)</td>
                <td className={styles.tHeading}></td>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={40} height={40} />
                    <span style={{ paddingLeft: '0.7rem' }}>ICHI</span>
                  </div>
                </td>
                <td>12%</td>
                <td>5,000,000 ICHI</td>
                <td>1,236,010 ICHI</td>
                <td>80%</td>
                <td className={styles.columnRoundRight}>80%</td>
                <td>
                  {' '}
                  <div className={styles.tableCol}>
                    <CustomButton
                      title="Deposit"
                      handleButtonClick={() => {}}
                      buttonStyle={styles.depositButton}
                    />
                    <Image src="/icons/union.svg" width={20} height={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={40} height={40} />
                    <span style={{ paddingLeft: '0.7rem' }}>oneICHI</span>
                  </div>
                </td>
                <td>12%</td>
                <td>5,000,000 ICHI</td>
                <td>1,236,010 ICHI</td>
                <td>80%</td>
                <td className={styles.columnRoundRight}>80%</td>
                <td>
                  {' '}
                  <div className={styles.tableCol}>
                    <CustomButton
                      title="Deposit"
                      handleButtonClick={() => {}}
                      buttonStyle={styles.depositButton}
                    />
                    <Image src="/icons/union.svg" width={20} height={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={styles.columnRoundLeft}>
                  <div className={styles.tableCol}>
                    <Image src="/icons/pic.svg" width={40} height={40} />
                    <span style={{ paddingLeft: '0.7rem' }}>USDC</span>
                  </div>
                </td>
                <td>12%</td>
                <td>5,000,000 ICHI</td>
                <td>1,236,010 ICHI</td>
                <td>80%</td>
                <td className={styles.columnRoundRight}>80%</td>
                <td>
                  {' '}
                  <div className={styles.tableCol}>
                    <CustomButton
                      title="Deposit"
                      handleButtonClick={() => {}}
                      buttonStyle={styles.depositButton}
                    />
                    <Image src="/icons/union.svg" width={20} height={20} />
                  </div>
                </td>
              </tr>
              <tr>
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
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Earn
