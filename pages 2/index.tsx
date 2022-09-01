import type { NextPage } from "next";
import { useState } from 'react'
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Card from "../components/UI/Card/Card";
import Text from "../components/UI/Text/Text";
import Graph from "../components/UI/Graph/Graph";
import CustomButton from "../components/UI/customButton/customButton";
import { useWidth } from "../hooks/useWidth";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import Button from "../components/UI/Button/Button";
import Popup from '../components/UI/Popup/popup';
import YourPosition from './earn/yourPosition/yourPosition';
import ClosePosition from './earn/closePosition/closePosition'
import EditPosition from './earn/editPosition/editPosition'

const Home: NextPage = () => {
  const [YourPosOpen, setYourPosition] = useState(false)
  const [ClosePos, setClosePosition] = useState(false)
  const [EditPosOpen, setEditPosition] = useState(false)
  const width = useWidth();

  const handleClosepositionPopup = (value: string) => {
    setYourPosition(false)
    newPositionOpenHandler(value)
  }
  const newPositionOpenHandler = (title: string) => {
    console.log(title)
    switch (title) {
      case 'your-position':
        setYourPosition(true)
        break
      case 'edit-position':
        setEditPosition(true)
        break
      case 'close-position':
        setClosePosition(true)
        break
      default:
        break
    }
  }
  return (
    <>
      {
        width <= 680 &&
        <header className="md:h-[90px] md:flex items-center md:px-16 sm:px-1 2sm:px0 sm:h-[150px] sm:block">

          <div className="flex justify-between">

            <Text>
              {' '}
              <h3>Overview</h3>
            </Text>
            <Text>
              {' '}
              <h3>TVL $000,000.00</h3>
            </Text>
          </div>

          <div className="flex my-grid items-center">

            <Image
              src="/icons/men.svg"
              alt="Blueberry Web"
              width={40}
              height={40}
              className={styles.menuIcon}
            />

            <Dropdown className={"flex-1"}/>
            <Button type="button" className="bg-white-01">
                <span className={`mr-3`}>100.54 ETH</span>{' '}
              </Button>
           
          </div>
        </header>
      }
      <Card className={styles.mainContainer}>
        <div
          className={
            styles["start-farming-widget"] +
            " my-8 rounded-lg px-8 1sm:block py-5"
          }
        >
          <div className={styles.topContainer}>
            <Image
              src="/icons/farming-home.svg"
              alt="farming image"
              width={234}
              height={138}
            />
            <p className={styles.text}>
              Earn optimal yield on autopilot with Blueberry automatically rebalanced concentrated liquidity pools.
              <br/><br/>
              Supercharge your returns with optional leverage.
            </p>
          </div>

          <CustomButton buttonStyle={`${width <= 768 && 'w-full'}`} title={"Start Earning"} handleButtonClick={() => { }} />
        </div>
        <div className="md:flex gap-8 flex-row my-8 sm:block 2sm:block">
          <div className="net-pay-box basis-1/2 px-6 py-8 ">
            <span className=" small-label">Net Worth</span>
            <Text>
              {" "}
              <h3>$500,000.00 USD</h3>
            </Text>
          </div>
          <div className=" net-pay-box basis-1/2 px-6 pl-8 py-8 ">
            <span className="small-label">Net APY%</span>
            <Text>
              {" "}
              <h3>Net APY %</h3>
            </Text>
          </div>
          <div className=" net-pay-box basis-1/2 px-6 pl-8 py-8 ">
            <span className="small-label">Projected Weekly Earnings</span>
            <Text>
              {" "}
              <h3>$5,000.00 USD</h3>
            </Text>
          </div>
        </div>
        <div className="md:flex gap-8 flex-row rounded-lg my-8 sm:block 2sm:block">
          <div className="basis-1/2 px-6 py-8 ">
            <Text >
              <h6 className="text-muted">Position Value Breakdown</h6>
            </Text>

            <div className={styles.positionValueRow}>
              <div className={styles.lendingRow}>
                <Text >
                  {" "}
                  <span className={styles.heading1}>Lending Deposits</span>{" "}
                </Text>
                <Text>
                  {" "}
                  <span className={styles.heading1}>$5,000.00 USD</span>{" "}
                </Text>
              </div>
              <div className={styles.lendingRow}>
                <Text>
                  {" "}
                  <span className={styles.heading1}>Farming Positions</span>
                </Text>
                <Text>
                  {" "}
                  <span className={styles.heading1}>$5,000.00 USD</span>{" "}
                </Text>
              </div>
              <div className={styles.lendingRow}>
                <Text>
                  <span className={`${styles.heading1} text-rose-500`}>
                    Debt Value
                  </span>
                </Text>
                <Text>
                  <span className={`${styles.heading1} text-rose-500`}>
                    $5,000.00 USD
                  </span>{" "}
                </Text>
              </div>
            </div>

          </div>

          {/* account health graph */}

          <div className="md:flex gap-20 flex-row my-8 sm:block 2sm:block">

          </div>
          <div className={`basis-1/2 px-6 py-8`}>
            <Text>
              <h6 className="text-muted">Position Value Breakdown</h6>
            </Text>
            <div
              className={`${styles.lendingRow} mt-5 ${width <= 768 && 'flex-column'} cursor-pointer`}
              onClick={(event) => newPositionOpenHandler('your-position')}
            >
              <div className={styles.rightRow}>
                <Image src="/icons/pic.svg" width={35} height={35} alt="image" />
                <div className={styles.container}>
                  <span className={styles.title}>ICHI-USDC Vault</span>
                  <span className={styles.subTitle}>$2,500</span>
                </div>
              </div>
              <div className={`py-8 ${styles.pMainContainer}`}>
                <div className={styles.positionContainer}>
                  <div className={styles.pInnercontainer}></div>
                </div>
                <span className={styles.percentage}>50%</span>
              </div>
            </div>
            <div 
              className={`${styles.lendingRow}  ${width <= 768 && 'flex-column'} cursor-pointer`}
              onClick={(event) => newPositionOpenHandler('your-position')}
            >
              <div className={styles.rightRow}>
                <Image src="/icons/pic.svg" width={35} height={35} alt="image" />
                <div className={styles.container}>
                  <span className={styles.title}>ICHI-USDC Vault</span>
                  <span className={styles.subTitle}>$2,500</span>
                </div>
              </div>
              <div className={`py-8 ${styles.pMainContainer}`}>
                <div className={styles.positionContainer}>
                  <div className={styles.pInnercontainer1}></div>
                </div>
                <span className={styles.percentage}>75%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Popup
        isOpen={YourPosOpen}
        title={'Your Position'}
        handleClose={() => {
          setYourPosition(false)
        }}
      >
        <YourPosition handleClosepositionPopup={handleClosepositionPopup} />
      </Popup>
      <Popup
        isOpen={EditPosOpen}
        title={'Edit Position'}
        handleClose={() => {
          setEditPosition(false)
        }}
      >
        <EditPosition
          handleClose={() => {
            setEditPosition(false)
          }}
        />
      </Popup>
      <Popup
        isOpen={ClosePos}
        title={'Close Position'}
        handleClose={() => {
          setClosePosition(false)
        }}
      >
        <ClosePosition
          handleClose={() => {
            setClosePosition(false)
          }}
        />
      </Popup>
    </>
  );
};

export default Home;
