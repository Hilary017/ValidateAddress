import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formActions } from "../store/store";
import "./Step1.css";

import Step1Footer from "./Step1Footer";
import Steps from "./Steps";

const Step1 = () => {
    let nameVal;
    let emailVal;
    let phoneVal;

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const formInfo = useSelector(state => {
        return state.value
    })

    console.log(formInfo)

    const [formValue, setFormValue] = useState({});
    const [nameValid, setNameValid] = useState(true);
    const [desktopNameValid, setDesktopNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [desktopEmailValid, setDesktopEmailValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [desktopPhoneValid, setDesktopPhoneValid] = useState(true);

    const name = useRef()
    const desktopName = useRef()
    const email = useRef()
    const desktopEmail = useRef()
    const phone = useRef()
    const desktopPhone = useRef()

    const nameChangeHandler = (e) => {
        const nameValue = name.current.value;
        console.log(nameValue)

        if(nameValue === "") {
            setNameValid(false)
        } else {
            setNameValid(true);
        }
    }

    const desktopNameChangeHandler = () =>{
        const desktopNameValue = desktopName.current.value;
        console.log(desktopNameValue)

        if(desktopNameValue === "") {
            setDesktopNameValid(false)
        } else {
            setDesktopNameValid(true);
        }
    }

    const emailChangeHandler = (e) => {
        const emailValue = email.current.value;

        const regex = /^\S+@\S+\.\S+/
        const regexTest = regex.test(emailValue);

        if(!regexTest) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
        
        console.log(regexTest)
    }

    const desktopEmailChangeHandler = () => {
        const desktopEmailValue = desktopEmail.current.value;

        const regex = /^\S+@\S+\.\S+/
        const regexTest = regex.test(desktopEmailValue);

        if(!regexTest) {
            setDesktopEmailValid(false);
        } else {
            setDesktopEmailValid(true);
        }
        
        console.log(regexTest)
    }

    const phoneNumberHandler = (e) => {
        const phoneValue = phone.current.value;
        
        if(phoneValue === "" || isNaN(phoneValue)) {
            setPhoneValid(false);
        } else {
            setPhoneValid(true)
        }
    }

    const desktopPhoneNumberHandler = (e) => {
        const desktopPhoneValue = desktopPhone.current.value;
        
        if(desktopPhoneValue === "" || isNaN(desktopPhoneValue)) {
            setDesktopPhoneValid(false);
        } else {
            setDesktopPhoneValid(true)
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const nameValue = name.current.value;
        const emailValue = email.current.value;
        const phoneValue = phone.current.value;

        const regex = /^\S+@\S+\.\S+/
        const regexTest = regex.test(emailValue);

        if(nameValue === ""||
            !regexTest||
            !phoneValue ||
            isNaN(phoneValue) 
        ) {
            nameChangeHandler();
            emailChangeHandler();
            phoneNumberHandler();
            return;
        } else {
            const formValue = {
                name: nameValue,
                email: emailValue,
                phone: phoneValue,
                step2: true
            }
            console.log(formValue);
            dispatch(formActions.step1(formValue))
            console.log(formInfo);
            nameVal = "formInfo.name";
            emailVal = formInfo.email;
            phoneVal = formInfo.phone;

            console.log(nameVal, emailVal, phoneVal)
            navigate("step-2");
        }
    }

    const desktopFormSubmitHandler = (e) => {
        e.preventDefault();

        const desktopNameValue = desktopName.current.value;
        const desktopEmailValue = desktopEmail.current.value;
        const desktopPhoneValue = desktopPhone.current.value;

        const regex = /^\S+@\S+\.\S+/
        const desktopRegTest = regex.test(desktopEmailValue);

        if(desktopNameValue === "" ||
            !desktopRegTest ||
            !desktopPhoneValue ||
            isNaN(desktopPhoneValue) 
        ) {
            desktopNameChangeHandler();
            desktopEmailChangeHandler();
            desktopPhoneNumberHandler()
            return;
        } else {
            const formValue = {
                name: desktopNameValue,
                email: desktopEmailValue,
                phone: desktopPhoneValue,
                step2: true
            }
            console.log(formValue);
            dispatch(formActions.step1(formValue))
            console.log(formInfo);
            nameVal = "formInfo.name";
            emailVal = formInfo.email;
            phoneVal = formInfo.phone;

            console.log(nameVal, emailVal, phoneVal)
            navigate("step-2");
        }
    }

    return (
        <>      
            <div>
                <div className="step-one">
                    <div className="step--text">
                        <h2>Personal info</h2>
                        <p>Please provide your name, email, address and phone number.</p>
                    </div>
                    <form>
                        <div className="input-div">
                            <label htmlFor="name">Name</label> <br />
                            <input 
                                type="text" 
                                id="name" 
                                ref={name} 
                                defaultValue={formInfo.name}
                                className={!nameValid ? "error--state" : ""} 
                                onBlur={nameChangeHandler} onChange={nameChangeHandler} 
                                placeholder="e.g. Stephen King" />
                            {!nameValid && <p className="error-text">name cannot be empty</p>}
                        </div>
                        <div className="input-div">
                            <label htmlFor="email">Email Address</label> <br />
                            <input 
                                type="email" 
                                id="email" 
                                ref={email} 
                                defaultValue={formInfo.email}
                                className={!emailValid ? "error--state" : ""} 
                                onBlur={emailChangeHandler} 
                                onChange={emailChangeHandler} 
                                placeholder="e.g. stephenking@lorem.com" />
                            {!emailValid && <p className="error-text">invalid email</p>}
                        </div>
                        <div className="input-div">
                            <label htmlFor="number">Phone Number</label> <br />
                            <input 
                                type="number" 
                                id="number" 
                                ref={phone} 
                                value={phoneVal}
                                defaultValue={formInfo.phone}
                                className={!phoneValid ? "error--state" : ""} 
                                onBlur={phoneNumberHandler} 
                                onChange={phoneNumberHandler} 
                                placeholder="e.g. +1 234 567 890" />
                            {!phoneValid && <p className="error-text">invalid phone number</p>}
                        </div>
                    </form>
                </div>
                <Step1Footer value="Next Step" onClick={formSubmitHandler} />
            </div>
            <div className="desktop-one">
                <div className="step--text">
                    <h2>Personal info</h2>
                    <p>Please provide your name, email, address and phone number.</p>
                </div>
                <form>
                    <div className="input-div">
                        <label htmlFor="name">Name</label> <br />
                        <input 
                            type="text" 
                            id="name" 
                            ref={desktopName} 
                            defaultValue={formInfo.name}
                            className={!desktopNameValid ? "error--state" : ""} 
                            onBlur={desktopNameChangeHandler} onChange={desktopNameChangeHandler} 
                            placeholder="e.g. Stephen King" />
                        {!desktopNameValid && <p className="error-text">name cannot be empty</p>}
                    </div>
                    <div className="input-div">
                        <label htmlFor="email">Email Address</label> <br />
                        <input 
                            type="email" 
                            id="email" 
                            ref={desktopEmail} 
                            defaultValue={formInfo.email}
                            className={!desktopEmailValid ? "error--state" : ""} 
                            onBlur={desktopEmailChangeHandler} 
                            onChange={desktopEmailChangeHandler} 
                            placeholder="e.g. stephenking@lorem.com" />
                        {!desktopEmailValid && <p className="error-text">invalid email</p>}
                    </div>
                    <div className="input-div">
                        <label htmlFor="number">Phone Number</label> <br />
                        <input 
                            type="number" 
                            id="number" 
                            ref={desktopPhone} 
                            defaultValue={formInfo.phone}
                            className={!desktopPhoneValid ? "error--state" : ""} 
                            onBlur={desktopPhoneNumberHandler} 
                            onChange={desktopPhoneNumberHandler} 
                            placeholder="e.g. +1 234 567 890" />
                        {!desktopPhoneValid && <p className="error-text">invalid phone number</p>}
                    </div>
                    <div className="step1--footer">
                        <button className="next--btn" onClick={desktopFormSubmitHandler}>Next Step</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Step1;