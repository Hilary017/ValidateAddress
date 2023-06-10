import Step1Footer from "./Step1Footer";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../store/store";

import "./Step3.css";
import Steps from "./Steps";
import Backdrop from "./backdrop";
import Modal from "./modal";

const Step3 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formInfo = useSelector(state => state.value)

    console.log(formInfo)
    console.log(formInfo.span)

    const [onlineCheck, setOnlineCheck] = useState(formInfo.onlineCheck || false);
    const [largerCheck, setLargerCheck] = useState(formInfo.largerCheck || false);
    const [customCheck, setCustomCheck] = useState(formInfo.customCheck || false);
    const [serviceFocus, setServiceFocus] = useState(formInfo.serviceFocus || false);
    const [largerFocus, setLargerFocus] = useState(formInfo.largerFocus || false);
    const [customFocus, setCustomFocus] = useState(formInfo.customFocus || false);
    const [onlineValue, setOnlineValue] = useState(formInfo.online || "");
    const [largerValue, setLargerValue] = useState(formInfo.larger || "");
    const [customValue, setCustomValue] = useState(formInfo.custom || "");
    const [error, setError] = useState(false)

    console.log(formInfo.span)

    const onlineClickHandler = (e) => {
        e.preventDefault();

        setOnlineCheck(prev => !prev)
        setServiceFocus(prev => !prev)

        if(!onlineCheck) {
            setOnlineValue(e.target.closest("button").value);
        } else {
            setOnlineValue("");
        }
    } 

    const storageClickHandler = (e) => {
        e.preventDefault();

        setLargerCheck(prev => !prev)
        setLargerFocus(prev => !prev)

        
        if(!largerCheck) {
            setLargerValue(e.target.closest("button").value);
        } else {
            setLargerValue("");
        }
    } 

    const completePreviousStep = () => {
        navigate("/step-2")
    }

    const customClickHandler = (e) => {
        e.preventDefault();

        setCustomCheck(prev => !prev)
        setCustomFocus(prev => !prev)

        
        if(!customCheck) {
            setCustomValue(e.target.closest("button").value);
        } else {
            setCustomValue("");
        }
    } 

    const cancelErrorModal = () => {
        setError(false)
    }

    const returnStepHandler = (e) => {
        e.preventDefault()
        console.log("clicked")
        navigate("/step-2");
        console.log(formInfo)
    }

    const formSubmitHandler = () => {
        let onlineAmount;
        let alterOnlineAmount;
        let largerAmount;
        let alterLargerAmount;
        let customAmount;
        let alterCustomAmount;

        if(serviceFocus && formInfo.span === "Monthly") {
            onlineAmount = 1
            alterOnlineAmount = 10
        } else if(serviceFocus && formInfo.span !== "Monthly") {
            onlineAmount = 10
            alterOnlineAmount = 1
        } else {
            onlineAmount = ""
            alterOnlineAmount = ""
        }

        if(largerFocus && formInfo.span === "Monthly") {
            largerAmount = 2
            alterLargerAmount = 20
        } else if(largerFocus && formInfo.span !== "Monthly") {
            largerAmount = 20
            alterLargerAmount = 2
        } else {
            largerAmount = ""
            alterLargerAmount = ""
        }

        if(customFocus && formInfo.span === "Monthly") {
            customAmount = 2
            alterCustomAmount = 20
        } else if(customFocus && formInfo.span !== "Monthly") {
            customAmount = 20
            alterCustomAmount = 2
        } else {
            customAmount = ""
            alterCustomAmount = ""
        }


        const formValue = {
            online: onlineValue,
            onlineAmount: onlineAmount,
            alterOnline: alterOnlineAmount,
            larger: largerValue,
            largerAmount: largerAmount,
            alterLarger: alterLargerAmount,
            custom: customValue,
            customAmount: customAmount,
            alterCustom: alterCustomAmount,
            serviceFocus,
            largerFocus,
            customFocus,
            onlineCheck,
            customCheck,
            largerCheck,
            finishing: true
        }

        if(!serviceFocus && !largerFocus && !customFocus) {
            setError(true)
            return
        }

        console.log(formValue);
        dispatch(formActions.step3(formValue))
        navigate("/finishing")
    }

    return (
        <>  
            {error && <Backdrop onClick={cancelErrorModal} />}
            {error && <Modal btn={true} error="Kindly select atleast one of the options" onClick={cancelErrorModal} />}
            {formInfo.step3 ? 
                <div className="step3-container">
                    <div>
                        <div className="step-three">
                            <div className="step--text">
                                <h2>Pick add-ons</h2>
                                <p>Add-ons help enhance your gaming experience.</p>
                            </div>
                            <form className="step3-form">
                                <div className="first--checkbox">
                                    <button value="Online Service" id={serviceFocus ? "btn-focus" : ""} onClick={onlineClickHandler}>
                                        <div className="checkbox--value">
                                            <input type="checkbox" checked={onlineCheck} id="Online Service" />
                                            <div className="checkbox--option">
                                                <p>Online service</p>
                                                <p className="checkbox-text">Access to multiplayer games</p>
                                            </div>
                                        </div>
                                        {formInfo.span === "Monthly" ? <p className="addons--amount">+$1/mo</p> : <p className="addons--amount">+$10/yr</p> }
                                    </button>
                                </div>
                                <div className="first--checkbox">
                                    <button value="Larger storage" id={largerFocus ? "btn-focus" : ""} onClick={storageClickHandler}>
                                        <div className="checkbox--value">
                                            <input checked={largerCheck} type="checkbox" id="Larger storage" />
                                            <div className="checkbox--option">
                                                <p>Larger storage</p>
                                                <p className="checkbox-text">Extra 1TB of cloud save</p>
                                            </div>
                                        </div>
                                        {formInfo.span === "Monthly" ? <p className="addons--amount">+$2/mo</p> : <p className="addons--amount">+$20/yr</p> }
                                    </button>
                                </div>
                                <div className="first--checkbox">
                                    <button value="Customizable profile" id={customFocus ? "btn-focus" : ""} onClick={customClickHandler}>
                                        <div className="checkbox--value">
                                            <input checked={customCheck} type="checkbox" id="Customizable profile" />
                                            <div className="checkbox--option">
                                                <p>Customizable profile</p>
                                                <p className="checkbox-text">Custom theme on your profile</p>
                                            </div>
                                        </div>
                                        {formInfo.span === "Monthly" ? <p className="addons--amount">+$2/mo</p> : <p>+$20/yr</p> }
                                        {/* <input type="text" value={formInfo.span === "Monthly" && "+$2/mo"} />
                                        <input type="text" value={formInfo.span !== "Monthly" && "+$20/yr"} /> */}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <Step1Footer cancel="true" onClick={formSubmitHandler} return={returnStepHandler} value="Next Step" />
                    </div>
                    <div className="desktop-three">
                        <div className="step--text">
                            <h2>Pick add-ons</h2>
                            <p>Add-ons help enhance your gaming experience.</p>
                        </div>
                        <form className="step3-form">
                            <div className="first--checkbox">
                                <button value="Online Service" id={serviceFocus ? "btn-focus" : ""} onClick={onlineClickHandler}>
                                    <div className="checkbox--value">
                                        <input type="checkbox" checked={onlineCheck} id="Online Service" />
                                        <div className="checkbox--option">
                                            <p>Online service</p>
                                            <p>Access to multiplayer games</p>
                                        </div>
                                    </div>
                                    {formInfo.span === "Monthly" ? <p>+$1/mo</p> : <p>+$10/yr</p> }
                                </button>
                            </div>
                            <div className="first--checkbox">
                                <button value="Larger storage" id={largerFocus ? "btn-focus" : ""} onClick={storageClickHandler}>
                                    <div className="checkbox--value">
                                        <input checked={largerCheck} type="checkbox" id="Larger storage" />
                                        <div className="checkbox--option">
                                            <p>Larger storage</p>
                                            <p>Extra 1TB of cloud save</p>
                                        </div>
                                    </div>
                                    {formInfo.span === "Monthly" ? <p>+$2/mo</p> : <p>+$20/yr</p> }
                                </button>
                            </div>
                            <div className="first--checkbox">
                                <button value="Customizable profile" id={customFocus ? "btn-focus" : ""} onClick={customClickHandler}>
                                    <div className="checkbox--value">
                                        <input checked={customCheck} type="checkbox" id="Customizable profile" />
                                        <div className="checkbox--option">
                                            <p>Customizable profile</p>
                                            <p>Custom theme on your profile</p>
                                        </div>
                                    </div>
                                    {formInfo.span === "Monthly" ? <p>+$2/mo</p> : <p>+$20/yr</p> }
                                </button>
                            </div>
                        </form>
                        <div className="desktop-footer step1--footer">
                            <button className="back--btn" onClick={completePreviousStep}>Go Back</button>
                            <button className="next--btn" onClick={formSubmitHandler}>Next Step</button>
                        </div>
                    </div>
                </div> : 
                <div className="return-sect">
                    <p>Kindly complete previous steps</p>
                    <button onClick={completePreviousStep}>return</button>
                </div>
            }
        </>
    )
}

export default Step3;