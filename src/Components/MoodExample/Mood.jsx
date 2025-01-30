import React from "react";
import resting from '../../Images/resting.png';
import working from '../../Images/working.png';
import passenger from '../../Images/passenger.png';
import "./Mood.css";

const Mood = () => {
    return (
        <div className="homeContainer">
            <div className="homeSection alignTop">
                <h2 className="h2 centerText">For when you really<br />need to <span className="focus">focus...</span></h2>
                <img src={working} alt="" width={"250px"} height={"250px"} />
            </div>
            {/* Section 3 */}
            <div className="homeSection alignCenter reverseInMobile">
                <img src={passenger} alt="" width={"250px"} height={"250px"} />
                <h2 className="h2 centerText">...or when you are <br /><span className="focus">on the go...</span></h2>
            </div>
            {/* Section 4 */}
            <div className="homeSection alignBottom">
                <h2 style={{ paddingBottom: "5%" }} className="h2 centerText">...or when you just<br />want to <span className="focus">relax</span></h2>
                <img src={resting} alt="" width={"250px"} height={"250px"} />
            </div>
        </div>
    );
};
export default Mood;
