import styles from './TableGrid.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

const TableGrid = () => {
  const theme = useTheme()
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>Pool</th>
            <th>APY % (Weekly Earnings)</th>
            <th>Your Position</th>
          </tr>
        </thead>
        <tbody className={`${styles.tbody} ${theme.palette.mode === 'light' ?'bg-black/[0.1]' : 'bg-white/[0.05]'}`}>
          <tr className={`border-b-[1px] ${theme.palette.mode === 'light' ? 'border-black/[0.2]':'border-white/[0.1]'}`}>
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
                  ICHI
                </span>
              </div>
            </td>
            <td>
              {' '}
              <span className={styles.tdSubtitle}>Strategy Net APY %<br/>(Weekly Earnings)</span>
              <span className={styles.coltd}> 12% ($576)</span>
            </td>
            <td className={styles.tdSubtitle}>
              <p>250,0000 oneICHI</p>
              <p className={styles.smallPositionText}>$2,500,000 USD</p>
            </td>
          </tr>

          <tr className={`border-b-[1px] ${theme.palette.mode === 'light' ? 'border-black/[0.2]':'border-white/[0.1]'}`}>
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
            <td> 12% ($576)</td>
            <td>
              <p>250,0000 oneICHI</p>
              <p className={styles.smallPositionText}>$2,500,000 USD</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TableGrid
