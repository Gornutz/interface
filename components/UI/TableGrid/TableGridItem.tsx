import Image from "next/image";
import styles from './TableGrid.module.scss';

const TableGridItem = () => {

    return <>
        <tr className="cursor-pointer">
            <td className={styles.columnRoundLeft}>
                <div className={styles.tableCol}>
                    <Image
                        src="/icons/pic.svg"
                        width={40}
                        height={40}
                        alt="image"
                    />
                    <span style={{ paddingLeft: '0.7rem' }}>ICHI-USDC Vault</span>
                </div>
            </td>
            <td> <span> $500 USD</span></td>
            <td><span> $250 USD</span></td>
            <td className={styles.columnRoundRight}> <span> $250 USD</span></td>
        </tr>
        <tr
            className={` ${styles.bottom} cursor-pointer`}
        >
            <td colSpan={4}>
                <div className={styles.rowBottom}>
                    <span>Strategy Health: 50%</span>
                    <div className={styles.innerContainer}>
                        <div className={styles.container}></div>
                    </div>
                </div>
            </td>
        </tr>
    </>
}

export default TableGridItem;