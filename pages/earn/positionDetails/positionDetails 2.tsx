
import Button from '../../../components/UI/Button/Button';
import Style from './positionDetails.module.scss';

const PositionDetails = ()=>{
    return (
        <div className="mt-5">
            <div className={Style.container}>
                <h5 className={`text-white text-center ${Style.title}`}>Position Details</h5>
                <div className={Style.details}>
                    <div className="flex flex-col">
                        <span className={`${Style.text1}`}>Position Value</span>
                        <span className={`text-white  ${Style.text2}`}>$900.00</span>
                    </div>
                    <div className="flex flex-col">
                        <span className={`${Style.text1}`}>Expected ROI</span>
                        <span className={`text-white  ${Style.text2} ${Style.flexEnd}`}>$810/yr</span>
                        <span className={`text-white  ${Style.text3} ${Style.flexEnd}`}>$15.57/wk</span>
                    </div>
                </div>

            </div>
            <div className={`mt-5 text-white flex justify-between py-2 px-3`}>
                <span>ICHI Liquidation Price</span>
                <span>$2.00</span>
            </div>
        </div>
    )

}
export default PositionDetails;