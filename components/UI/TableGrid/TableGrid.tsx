import styles from './TableGrid.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import TableGridItem from './TableGridItem'
import ProgressBar from '../ProgressBar/ProgressBar'
import ProgressBar1 from '../ProgressBar/ProgressBar1'

// const columns = {
//     CurrentStrategy =
// } 'Current Strategy', 'Total Position', 'Debt Value', 'Equity Value'];
// const items = [{
//     id: 1,
//     icon: '/icons/pic.svg',

// }]

const TableGrid = ({ newPositionOpenHandler }) => {
  return (
    <>
      <div>{/* header  */}</div>
      <span className={styles.title}> Current Strategy</span>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>Current Strategy</th>
            <th>Strategy Net APY %<br/>(Weekly Earnings)</th>
            <th>Total Position</th>
            <th>Debt Value</th>
            <th>Equity Value</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr
            onClick={(event) => newPositionOpenHandler('your-position')}
            className="cursor-pointer"
          >
            <td className={styles.columnRoundLeft}>
              <div className={styles.tableCol}>
                <Image
                  src="/icons/pic.svg"
                  width={40}
                  height={40}
                  alt="image"
                />
                <span
                  style={{ paddingLeft: '0.7rem' }}
                  className={styles.tdSpan}
                >
                  ICHI-USDC Vault
                </span>
              </div>
            </td>
            <td>
              {' '}
              <span className={styles.tdSubtitle}>Strategy Net APY %<br/>(Weekly Earnings)</span>
              <span className={styles.coltd}> 90% ($8.65)</span>
            </td>
            <td>
              {' '}
              <span className={styles.tdSubtitle}>Total Position</span>
              <span className={styles.coltd}> $500 USD</span>
            </td>
            <td>
              {' '}
              <span className={styles.tdSubtitle}>Debt Value</span>{' '}
              <span className={styles.coltd}> $250 USD<span className={styles.smallColtd}> (12%)</span></span>
            </td>
            <td className={styles.tdSubtitle}>
              {' '}
              <span className={styles.tdSubtitle}>Equity Value</span>{' '}
              <span className={styles.coltd}> $250 USD</span>
            </td>
          </tr>
          <tr
            onClick={(event) => newPositionOpenHandler('your-position')}
            className={` ${styles.bottom} ${styles.rowBottom} cursor-pointer`}
          >
            <td>
              <span>Strategy Health: 50%</span>
            </td>
            <td colSpan={4}>
              {/* <div className={styles.innerContainer}>
                            <div className={styles.container}></div>
                        </div> */}
              <ProgressBar
                color={`linear-gradient(89.83deg, #0056e0 0.3%, #57c5e0 99.81%)`}
                value={50}
              ></ProgressBar>
            </td>
          </tr>

          <tr
            onClick={(event) => newPositionOpenHandler('your-position')}
            className="cursor-pointer"
          >
            <td>
              <div className={styles.tableCol}>
                <Image
                  src="/icons/pic1.svg"
                  width={40}
                  height={40}
                  alt="icon"
                />
                <span
                  style={{ paddingLeft: '0.7rem' }}
                  className={styles.tdSpan}
                >
                  {' '}
                  oneICHI
                </span>
              </div>
            </td>
            <td> 90% ($8.65)</td>
            <td> $500 USD</td>
            <td><span className={styles.coltd}> $250 USD<span className={styles.smallColtd}> (12%)</span></span></td>
            <td>$250 USD</td>
          </tr>

          <tr
            onClick={(event) => newPositionOpenHandler('your-position')}
            className={` ${styles.bottom} ${styles.rowBottom} cursor-pointer`}
          >
            <td>
              <span>Strategy Health: 75%</span>
            </td>
            <td colSpan={4}>
              <ProgressBar1
                color={`linear-gradient(63.51deg, #007994 33.26%, #04ac5c 100%)`}
                value={70}
              />
            </td>
          </tr>
          {/* <tr
                    className="cursor-pointer"
                >
                    <td
                        colSpan={4}
                        className={`${styles.columnRoundBottomRight} ${styles.columnRoundBottomLeft}`}
                    >
                        <div className={styles.rowBottom}>
                            <span>Strategy Health: 75%</span>
                            <div className={styles.innerContainer}>
                                <div className={styles.bottomContainer}></div>
                            </div>
                        </div>
                    </td>
                </tr> */}
        </tbody>
      </table>
    </>
  )
}

export default TableGrid
