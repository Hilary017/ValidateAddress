import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Backdrop from "./backdrop";

import "./Steps.css";

import Step1 from "./Step1";

const Steps = (props) => {
    const formInfo = useSelector(state => state.value)

    return (
        <>
            {/* <Backdrop /> */}
            <div className={`nav-top ${props.className}`}>
                <NavLink to="/"  >1</NavLink>
                <NavLink to="step-2" className={({ isActive }) => 
                    isActive ? "active" : ""} >2</NavLink>
                <NavLink to="step-3" className={({ isActive }) => 
                    isActive ? "active" : ""}>3</NavLink>
                <NavLink to="finishing" className={({ isActive }) => 
                    isActive ? "active" : ""}>4</NavLink>
            </div>
            <div className={`desktop-nav ${props.className}`}>
                <li>
                    <NavLink to="/"  >1</NavLink>
                    <div className="desktop--step">
                        <p className="desktop--steps">STEP 1</p>
                        <p>YOUR INFO</p>
                    </div>
                </li>
                <li>
                    <NavLink to="step-2" className={`steps--bar ${({ isActive }) => 
                        isActive ? "active" : ""}`} >2</NavLink>
                    <div className="desktop--step">
                        <p className="desktop--steps">STEP 2</p>
                        <p>SELECT PLAN</p>
                    </div>
                </li>
                <li>
                    <NavLink to="step-3" className={({ isActive }) => 
                        isActive ? "active" : ""}>3</NavLink>
                    <div className="desktop--step">
                        <p className="desktop--steps">STEP 3</p>
                        <p>ADD-ONS</p>
                    </div>
                </li>
                <li>
                    <NavLink to="finishing" className={({ isActive }) => 
                        isActive ? "active" : ""}>4</NavLink>
                    <div className="desktop--step">
                        <p className="desktop--steps">STEP 4</p>
                        <p>SUMMARY</p>
                    </div>
                </li>
            </div>
        </>
    )
}

export default Steps;

