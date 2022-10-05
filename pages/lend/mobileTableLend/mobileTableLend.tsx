import Image from "next/image";
import CustomButton from "../../../components/UI/customButton/customButton";
import styles from "./mobileTableLend.module.scss";

const MobileTableLend = ({
  tableData,
  onBtnNewClick,
}: {
  tableData: any;
  onBtnNewClick: (value: string) => void;
}) => {
  const handleSuccessPosition = () => {
    onBtnNewClick?.("new-position");
  };
  return (
    <div className={`mt-8 ${styles.mainContainer1}`}>
      <span className={styles.subtitle}></span>
      {tableData?.map((row: any, index: number) => {
        return (
          <div className={`mt-3 ${styles.mainContainer}`} key={index}>
            <div className={`flex justify-between ${styles.container}`}>
              <div className="flex items-center">
                <Image src={row.image} width={40} height={40} alt="icon" />
                <span>{row.name}</span>
              </div>
              <div className="flex">
                <CustomButton
                  buttonStyle={` ${styles.button}`}
                  title="Deposit"
                  handleButtonClick={handleSuccessPosition}
                />
                {/* <Image src="/icons/union.svg" width={20} height={20} /> */}
              </div>
            </div>

            <div className={`flex justify-between ${styles.container} mt-3`}>
              <span className={styles.containerTitle}>Apy</span>
              <span className={styles.containerSubTitle}>{row.apy}</span>
            </div>
            <div className={`flex justify-between ${styles.container} `}>
              <span className={styles.containerTitle}>Total Supply</span>
              <div className={styles.rightContainer}>
                <span className={styles.containerSubTitle}>
                  {row.totalSupplyIchi}
                </span>
                <span className={styles.containerSubTitle1}>
                  {row.totalSupplyusd}
                </span>
              </div>
            </div>
            <div className={`flex justify-between ${styles.container} `}>
              <span className={styles.containerTitle}>Total Borrowed</span>
              <div className={styles.rightContainer}>
                <span className={styles.containerSubTitle}>
                  {row.totalBorrowedIchi}
                </span>
                <span className={styles.containerSubTitle1}>
                  {row.totalBorrowedUsd}
                </span>
              </div>
            </div>
            <div className={`flex justify-between ${styles.container} `}>
              <span className={styles.containerTitle}>Utilization</span>
              <div>
                <span className={styles.containerSubTitle}>
                  {row.utilization}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MobileTableLend;
