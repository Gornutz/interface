import Style from './yourPosition.module.scss'
const YourPosition = ({ handleClosepositionPopup }: any) => {
  const handleClick = () => {
    handleClosepositionPopup('close-position')
  }

  return (
    <div className={`mt-5 ${Style.container}`}>
      <div className="p-3">
        <div className={`${Style.rowContent} ${Style.headingRow}`}>
          <span>Your Collateral ($ Value)</span>
          <span className="text-right">$300 USDC</span>
        </div>
        <div className={Style.seprator}> </div>
        <div>
          <div className={Style.rowContent}>
            <span>Total Position Value</span>
            <span className="text-right">$1,000 USDC</span>
          </div>
          <div className={Style.rowContent}>
            <span>Borrowing</span>
            <span className="text-right">900 USDC ($900)</span>
          </div>
          <div className={Style.rowContent}>
            <span>Borrow Rate</span>
            <span className="text-right">5%</span>
          </div>
          <div className={Style.rowContent}>
            <span>Net APY</span>
            <span className="text-right">110%</span>
          </div>
        </div>
        <div className={Style.seprator}></div>
        <div>
          <div className={Style.rowContent}>
            <span>Leverage Factor</span>
            <span className="text-right">3x</span>
          </div>
          <div className={Style.rowContent}>
            <span>ROI From Entry</span>
            <span className="text-right">$100</span>
          </div>
          <div className={Style.rowContent}>
            <span>ICHI Liquidation Price</span>
            <span className="text-right">$1.50</span>
          </div>
        </div>
      </div>

      <button className={`mt-4 ${Style.button}`} onClick={handleClick}>
        Close Positon
      </button>
    </div>
  )
}
export default YourPosition
