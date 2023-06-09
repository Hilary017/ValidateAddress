import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../store/store";

import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";

import "./Step2.css";
import Step1Footer from "./Step1Footer";
import Steps from "./Steps";
import Backdrop from "./backdrop";
import Modal from "./modal";


const Step2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const completePreviousStep = () => {
        navigate("/")
    }


    const formInfo = useSelector(state => {
        return state.value
    })

    console.log(formInfo)

    const [toggle, setToggle] = useState(formInfo.toggle);
    // const [arFocus, setArFocus] = useState(true);
    // const [adFocus, setAdFocus] = useState(true);
    // const [prFocus, setPrFocus] = useState(true);
    const [arcadeFocus, setArcadeFocus] = useState(formInfo.arcadeFocus || false);
    const [advanceFocus, setAdvanceFocus] = useState(formInfo.advanceFocus || false);
    const [proFocus, setProFocus] = useState(formInfo.proFocus || false);
    const [plan, setPlan] = useState(formInfo.plan || "");
    const [span, setSpan] = useState(formInfo.span || "Monthly");
    const [error, setError] = useState(false);
    const [alterAmount, setAlterAmount] = useState("");

    console.log(span)
    console.log(toggle)

    const arcadeHandler = (e) => {
        e.preventDefault();

        setArcadeFocus(true)
        setAdvanceFocus(false)
        setProFocus(false)
    }

    const arcadeClickHandler = (e) => {
        arcadeHandler(e)
     
        setPlan(e.target.closest("button").value)
    }

    const advanceHandler = (e) => {
        e.preventDefault();

        setAdvanceFocus(true)
        setArcadeFocus(false)
        setProFocus(false)
    }

    const advanceClickHandler = (e) => {
        advanceHandler(e)

        setPlan(e.target.closest("button").value)
    }

    const proHandler = (e) => {
        e.preventDefault();
        
        setProFocus(true)
        setArcadeFocus(false)
        setAdvanceFocus(false)
    }

    const proClickHandler = (e) => {
        e.preventDefault();
        proHandler(e)

        setPlan(e.target.closest("button").value)
    }

    const toggleSpan = (e) => {
        e.preventDefault();
        setToggle(prev => !prev);

        if(toggle) {
            setSpan("Monthly")
        } else {
            setSpan("Yearly")
        }
        
        console.log(span)
    }

    const cancelErrorModal = () => {
        setError(false)
    }

    const returnStepHandler = (e) => {
        e.preventDefault()
        console.log("clicked")
        navigate("/");
        console.log(formInfo)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        let alternativeAmount;
        let amount;
        
        if(!toggle && plan === "Arcade") {
            amount = 9
            alternativeAmount = 90
        } else if(toggle && plan === "Arcade") {
            amount = 90
            alternativeAmount = 9
        } else if(!toggle && plan === "Advanced") {
            amount = 12
            alternativeAmount = 120
        } else if(toggle && plan === "Advanced") {
            amount = 120
            alternativeAmount = 12
        } else if(!toggle && plan === "Pro") {
            amount = 15
            alternativeAmount = 150
        } else if(toggle && plan === "Pro") {
            amount = 150
            alternativeAmount = 15
        }

        const planValue = {
            plan: plan,
            amount: amount,
            alterAmount: alternativeAmount,
            span: span,
            toggle: toggle,
            arcadeFocus,
            advanceFocus,
            proFocus,
            step3: true
        }
        if(!planValue.plan) {
            setError(true)
            return;
        } else {
            console.log(plan, amount, alterAmount, span);
            dispatch(formActions.step2(planValue))
            navigate("/step-3");
        }
    }

    return (
        <>  
        {error && <Backdrop onClick={cancelErrorModal} />}
        {error && <Modal btn={true} error="Kindly select one of the options" onClick={cancelErrorModal}></Modal>}
        {
            formInfo.step2 ? 
            <div className="step2-container">
                <div>
                    <div className="step-two">
                        <div className="step--text">
                            <h2>Select your plan</h2>
                            <p>You have the option of monthly or yearly billing</p>
                        </div>
                        <form className="step2-form">
                            <div className="input-div">
                                <button onClick={arcadeClickHandler} onBlur={arcadeHandler} id={arcadeFocus ? "btn-focus" : ""} value="Arcade"> 
                                    {/* <input type="hidden" value={toggle ? 9 : 90} />
                                    <input type="hidden" value={!toggle ? 9 : 90} /> */}
                                    <div className="step2-img">
                                        <img src={arcade} alt="" className={!toggle ? "step2--img" : null} />
                                    </div>
                                    <div>
                                        <h3>Arcade</h3>
                                        <p className="arcade-p toggle-text">{!toggle ? "$9/mo" : "$90/yr"}</p>
                                        {toggle && <p className="two-months">2 months free</p>}
                                    </div>
                                </button>
                            </div>
                            <div className="input-div">
                                <button onClick={advanceClickHandler} onBlur={advanceHandler} id={advanceFocus ? "btn-focus" : ""} className={advanceFocus ? "button--focus" : ""} value="Advanced">
                                    {/* <input type="hidden" value={toggle ? 12 : 120} />
                                    <input type="hidden" value={!toggle ? 12 : 120} /> */}
                                    <div className="step2-img">
                                        <img src={advanced} alt="" className={!toggle ? "step2--img" : null} />
                                    </div>
                                    <div>
                                        <h3>Advanced</h3>
                                        <p className="advance-p toggle-text">{!toggle ? "$12/mo" : "$120/yr"}</p>
                                        {toggle && <p className="two-months">2 months free</p>}
                                    </div>
                                </button>
                            </div>
                            <div className="input-div">
                                <button onClick={proClickHandler} onBlur={proHandler} id={proFocus ? "btn-focus" : ""} className={proFocus ? "button--focus" : ""} value="Pro">
                                    {/* <input type="hidden" value={toggle ? 15 : 150} />
                                    <input type="hidden" value={!toggle ? 15 : 150} /> */}
                                    <div >
                                        <img src={pro} alt="" className={!toggle ? "step2--img" : null} />
                                    </div>
                                    <div>
                                        <h3 className="pro-p">Pro</h3>
                                        <p className="toggle-text">{!toggle ? "$15/mo" : "$150/yr"}</p>
                                        {toggle && <p className="two-months">2 months free</p>}
                                    </div>
                                </button>
                            </div>
                        </form>
                        <div className={`toggle--div ${!toggle ? "div--toggle" : null}`}>
                            <p>Monthly</p>
                            <div className="toggle--btn">
                                <input type="button" value={!toggle ? "Monthly" : "Yearly"} onClick={toggleSpan} />
                                <span className={!toggle ? "span-left" : "span-right"}></span>
                            </div>
                            <p>Yearly</p>
                        </div>
                    </div>
                    <Step1Footer onClick={formSubmitHandler} return={returnStepHandler} className='static--footer' cancel="true" value="Next Step" />
                </div>
                <div className="desktop-two">
                    <div className="step--text">
                        <h2>Select your plan</h2>
                        <p>You have the option of monthly or yearly billing</p>
                    </div>
                    <form className="step2-form">
                        <div className="input-div">
                            <button onClick={arcadeClickHandler} onBlur={arcadeHandler} id={arcadeFocus ? "btn-focus" : ""} value="Arcade"> 
                                <div className="step2-img">
                                    <img src={arcade} alt="" className={!toggle ? "step2--img" : null} />
                                </div>
                                <div>
                                    <h3>Arcade</h3>
                                    <p className="arcade-p toggle-text">{!toggle ? "$9/mo" : "$90/yr"}</p>
                                    {toggle && <p className="two-months">2 months free</p>}
                                </div>
                            </button>
                        </div>
                        <div className="input-div first-input-div">
                            <button onClick={advanceClickHandler} onBlur={advanceHandler} id={advanceFocus ? "btn-focus" : ""} className={advanceFocus ? "button--focus" : ""} value="Advanced">
                                <div className="step2-img">
                                    <img src={advanced} alt="" className={!toggle ? "step2--img" : null} />
                                </div>
                                <div>
                                    <h3>Advanced</h3>
                                    <p className="advance-p toggle-text">{!toggle ? "$12/mo" : "$120/yr"}</p>
                                    {toggle && <p className="two-months">2 months free</p>}
                                </div>
                            </button>
                        </div>
                        <div className="input-div  second-input-div">
                            <button onClick={proClickHandler} onBlur={proHandler} id={proFocus ? "btn-focus" : ""} className={proFocus ? "button--focus" : ""} value="Pro">
                                <div >
                                    <img src={pro} alt="" className={!toggle ? "step2--img" : null} />
                                </div>
                                <div>
                                    <h3 className="pro-p">Pro</h3>
                                    <p className="toggle-text">{!toggle ? "$15/mo" : "$150/yr"}</p>
                                    {toggle && <p className="two-months">2 months free</p>}
                                </div>
                            </button>
                        </div>
                    </form>
                    <div className={`toggle--div ${!toggle ? "div--toggle" : null}`}>
                        <p>Monthly</p>
                        <div className="toggle--btn">
                            <input type="button" value={!toggle ? "Monthly" : "Yearly"} onClick={toggleSpan} />
                            <span className={!toggle ? "span-left" : "span-right"}></span>
                        </div>
                        <p>Yearly</p>
                    </div>
                    <div className="desktop-footer">
                        <button className="back--btn" onClick={completePreviousStep}>Go Back</button>
                        <button className="next--btn" onClick={formSubmitHandler}>Next Step</button>
                    </div>
                </div>
            </div>
                 :
                 <div className="return-sect">
                    <p>Kindly complete previous step</p>
                    <button onClick={completePreviousStep}>return</button>
                 </div>   
            }
        </>   
    )
}

export default Step2;