import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Step1Footer from "./Step1Footer";
import { formActions } from "../store/store";
import "./Finishing.css";
import Backdrop from "./backdrop";
import Modal from "./modal";
import img from "../assets/images/icon-thank-you.svg";

const Finishing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [finished, setFinished] = useState(false);


    const valueArr = [];

    const formInfo = useSelector(state => state.value);

    console.log(formInfo);
    valueArr.push(formInfo);

    console.log(valueArr)

    const returnStepHandler = (e) => {
        e.preventDefault()
        console.log("clicked")
        navigate("/step-3");
        console.log(formInfo)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            dispatch(formActions.finishing())
            setFinished(true)
        }, 2000)
    }

    const completePreviousStep = () => {
        navigate("/step-3")
    }

    return (
       <>
            {isLoading && <Backdrop />}
            {isLoading && <Modal error="Loading..." />}
            {
                !finished ?
                <div className="finishing-container">
                    {valueArr.map(value => {
                        if(formInfo.finishing) {
                            return <div>
                            <div>
                                <div className="finishing--up">
                                    <div className="step--text">
                                            <h2>Finishing up</h2>
                                            <p>Double-check everything looks OK before confirming.</p>
                                        </div>
                                        <div className="confirm-sect">
                                            <div id="confirm-plan" className="confirm--div">
                                                <div>
                                                    <p className="plan--bold">{value.plan} <span>({value.span})</span></p>
                                                    <Link to="/step-2">Change</Link>
                                                </div>
                                                <p className="plan--bold"><span>${value.amount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                            </div>
                                        {value.online &&  
                                            <div className="confirm--div">
                                                <div>
                                                    <p className="confirm--p">{value.online}</p>
                                                </div>
                                                <p>+$<span className="amount--p">{value.onlineAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                            </div>}
                                        {value.larger &&
                                            <div className="confirm--div" id="larger--store">
                                                <div>
                                                    <p className="confirm--p">{value.larger}</p>
                                                </div>
                                                <p>+$<span className="amount--p">{value.largerAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                            </div>
                                        }
                                        {value.custom &&
                                            <div className="confirm--div" id="larger--store">
                                                <div>
                                                    <p className="confirm--p">{value.custom}</p>
                                                </div>
                                                <p>+$<span className="amount--p">{value.customAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                            </div>
                                        }
                                    </div>
                                    <div className="total--div">
                                        <p className="confirm--p">Total (per {value.span === "Yearly" ? "year" : "month"})</p>
                                        <p className="total-p"><span>${+value.amount + 
                                                                            +value.onlineAmount + 
                                                                            +value.largerAmount + 
                                                                            +value.customAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                    </div>
                                </div>
                                <div className="footer--step">
                                    <button onClick={returnStepHandler} className="back--btn">Go Back</button>
                                    <button onClick={formSubmitHandler} className="confirm--btn">Confirm</button>
                                </div>
                            </div>

                            <div className="desktop-finishing">
                                <div className="step--text">
                                        <h2>Finishing up</h2>
                                        <p>Double-check everything looks OK before confirming.</p>
                                    </div>
                                    <div className="confirm-sect">
                                        <div id="confirm-plan" className="confirm--div">
                                            <div>
                                                <p className="plan--bold">{value.plan} <span>({value.span})</span></p>
                                                <Link to="/step-2">Change</Link>
                                            </div>
                                            <p className="plan--bold"><span>${value.amount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                        </div>
                                    {value.online &&  
                                        <div className="confirm--div">
                                            <div>
                                                <p className="confirm--p">{value.online}</p>
                                            </div>
                                            <p>+$<span className="amount--p">{value.onlineAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                        </div>}
                                    {value.larger &&
                                        <div className="confirm--div" id="larger--store">
                                            <div>
                                                <p className="confirm--p">{value.larger}</p>
                                            </div>
                                            <p>+$<span className="amount--p">{value.largerAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                        </div>
                                    }
                                    {value.custom &&
                                        <div className="confirm--div" id="larger--store">
                                            <div>
                                                <p className="confirm--p">{value.custom}</p>
                                            </div>
                                            <p>+$<span className="amount--p">{value.customAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                        </div>
                                    }
                                </div>
                                <div className="total--div">
                                    <p className="confirm--p">Total (per {value.span === "Yearly" ? "year" : "month"})</p>
                                    <p className="total-p"><span>${+value.amount + 
                                                                        +value.onlineAmount + 
                                                                        +value.largerAmount + 
                                                                        +value.customAmount}/{value.span === "Yearly" ? "yr" : "mo"}</span></p>
                                </div>
                                <div className="desktop-footer">
                                    <button className="back--btn" onClick={completePreviousStep}>Go Back</button>
                                    <button className="next--btn" onClick={formSubmitHandler}>Next Step</button>
                                </div>
                            </div>
                    </div>
                        } else {
                            return <div className="return-sect">
                                <p>Kindly complete previous steps</p>
                                <button onClick={completePreviousStep}>return</button>
                            </div>
                        }   
                    })}  
                </div> : 
                <div className="confirm--sect">
                    <div className="confirm--sub">
                        <img src={img} alt="Thank You" />
                        <h2>Thank you!</h2>
                        <p>
                            Thanks for confirm your subscription!
                            We hope you have fun using our platform. If you ever need support, 
                            please feel free to email us at support@loremgaming.com
                        </p>
                    </div>
                    <div className="desktop-confirm">
                        <img src={img} alt="Thank You" />
                        <h2>Thank you!</h2>
                        <p>
                            Thanks for confirm your subscription!
                            We hope you have fun using our platform. If you ever need support, 
                            please feel free to email us at support@loremgaming.com
                        </p>
                    </div>
                </div>
            }   
       </>
    )
}

export default Finishing;