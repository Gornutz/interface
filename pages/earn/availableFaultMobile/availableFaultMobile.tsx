import Image from 'next/image'
import CustomButton from '../../../components/UI/customButton/customButton'
import styles from './availableFaultMobile.module.scss'

const AvailableFaultMobile = ({
  strategiesTable,
  onBtnNewClick,
}: {
  strategiesTable: any,
  onBtnNewClick: (value:string) => void,
}) => {

  const handleSuccessPosition = () => {
    onBtnNewClick?.("new-position");
  };

  return (
    <div className={`mt-8 ${styles.mainContainer1}`}>
      <h1 className={`mb-5 ${styles.title}`}>Available Vaults</h1>
      <span className={styles.subtitle}>Strategy</span>
      {strategiesTable?.map((row: any, index: number) => {
        return (
          <div className={`mt-3 ${styles.mainContainer}`} key={index}>
            <div className={`flex justify-between ${styles.container}`}>
              <div className="flex items-center">
                <Image src="/icons/pic1.svg" width={40} height={40} alt="icon" />
                <span>{row.name}</span>
              </div>
              <div>
                <CustomButton
                  buttonStyle={styles.button}
                  title="New"
                  handleButtonClick={handleSuccessPosition}
                />
              </div>
            </div>

            <div className={`flex justify-between ${styles.container} mt-3`}>
              <span className={styles.containerTitle}>TVL</span>
              <span className={styles.containerSubTitle}>{row.tvl}</span>
            </div>
            <div className={`flex justify-between ${styles.container} `}>
              <span className={styles.containerTitle}>
                Stablecoin Collateral Yield (1x - 3x)
              </span>
              <span className={styles.containerSubTitle}>{row.Stablecoin}</span>
            </div>
            <div className={`flex justify-between ${styles.container} `}>
              <span className={styles.containerTitle}>Token Collateral Yield (1x-1.5x)</span>
              <span className={styles.containerSubTitle}>{row.Token}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default AvailableFaultMobile
