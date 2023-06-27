import { useState, useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import swal from "sweetalert";

import classes from "./Addressinput.module.css";

const locationiqKey = "pk.715caf1e4ee375ad5db1db5f9ff277df";


const AddressInput = () => {
    const [address, setAddress] =  useState("");
    const [addresses, setAddresses] =  useState([]);
    const [showOptions, setShowOptions] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);
    const [confirmFormSubmit, setConfirmFormSubmit] = useState(false);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [addressData, setAddressData] = useState({});
    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState("");

    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();

    useEffect(() => {
        const addressHandler = setTimeout(() => {
            fetch(`https://api.locationiq.com/v1/autocomplete?key=${locationiqKey}&q=${address}`)
            .then(res => {
                return res.json()
            })
            .then(resData => {
                setAddresses(resData);
            })
            .catch((err) => {
                console.log(err)
            })
        }, 500)
        return () => {
            clearTimeout(addressHandler);
        }
    }, [address]);


    const firstNameHandler = () => {
        const firstNameValue = firstName.current.value;

        if(firstNameValue === "") {
            setFirstNameValid(false)
        } else {
            setFirstNameValid(true)
        }
    }

    const lastNameHandler = () => {
        const lastNameValue = lastName.current.value;

        if(lastNameValue === "") {
            setLastNameValid(false)
        } else {
            setLastNameValid(true)
        }
    }

    const emailHandler = () => {
        const emailValue = email.current.value;

        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(emailValue)

        if(!emailValid) {
            setEmailValid(false)
        } else {
            setEmailValid(true)
        }
    }

    const addressChangeHandler = (e) => {
        if(!showOptions) {
            setShowOptions(true)
        }

        setAddress(e.target.value)
    }

    // const gatherValueHandler = () => {        
    //     const targetDiv = e.target.closest("div")
    //     const targetButton = targetDiv.querySelector('button')

    // }

    const buttonSelectHandler = (e) => {
            e.preventDefault(), 
            setAddress(e.target.value), 
            setShowOptions(false)
    }

    const closeModalHandler = (e) => {
        e.preventDefault()
        setFormSubmit(false)
    }

    const closeConfirmModal = (e) => {
        e.preventDefault()
        setConfirmSubmit(false)
    }

    const confirmFormSubmitHandler = () => {
        setConfirmFormSubmit(false);

        let map = new maplibregl.Map({
            container: 'map',
            attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
            style: 'https://tiles.locationiq.com/v3/streets/vector.json?key='+locationiqKey,
            zoom: 12,
            center: [-122.42, 37.779]
        });
        
        map.on('load', function () {
            map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': addressData.geojson
                    }
                },
                'layout': {},
                'paint': {
                    'fill-color': '#D20C0C',
                    'fill-opacity': 0.5
                }
            });
        });
        setFormSubmit(true);
    }

    const mapLoadHandler = (e) => {
        e.preventDefault(); 

        if(!address) {
            swal({
                title: "oops!",
                text: "Kindly enter your address.",
                timer: 2000
              });
            return;
        }

        setIsLoading(true)
        fetch(`https://eu1.locationiq.com/v1/search?key=pk.715caf1e4ee375ad5db1db5f9ff277df&q=${address}&format=json&polygon_geojson=1`)
        .then(res => res.json())
        .then(resData => {
            if(resData.error) {
                setError(resData.error);
                setIsLoading(false)
                return;
            } 

            setAddressData(resData[0]);
            setError("")
            setIsLoading(false)
            setConfirmFormSubmit(true)
        })
        .catch(() => {
            setError("oops! something went wrong. please try again")
            setIsLoading(false)
        });     
    }

    const confirmSubmitHandler = (e) => {
        e.preventDefault();
        setIsSubmitLoading(true);

        const firstNameValue = firstName.current.value;
        const lastNameValue = lastName.current.value;
        const emailValue = email.current.value;

        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(emailValue)

        if(!firstNameValue ||
            !lastNameValue ||
            !emailValid
            ) {
                swal({
                    title: "oops!",
                    text: "Kindly fill all fields correctly.",
                    timer: 2000
                  });
                firstNameHandler()
                lastNameHandler()
                emailHandler()
                return;
            }

        if(!addressData.lon || 
            !addressData.lat ||
            !addressData.geojson.coordinates
            ) {
                setSubmitError("opps! something went wrong. Kindly check your address.");
                return;
            }

        const formValue = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            address: address,
            longitude: addressData.lon,
            latitude: addressData.lat,
            coordinates: addressData.geojson.coordinates
        }

        fetch("https://addressvalidator.onrender.com/register", {
            method: "POST",
            body: JSON.stringify(formValue),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            swal({
                title: "Submitted",
                text: "Address registered successfully",
                icon: "success",
                button: "Ok"
              }).then(() => {
                setIsSubmitLoading(false)
                setFormSubmit(false)
                setConfirmSubmit(false)
                setAddress("")
                setSubmitError("")
                firstName.current.value = ""
                lastName.current.value = ""
                email.current.value = ""
              })
            
        })
        .catch(() => {
            setIsSubmitLoading(false)
            setSubmitError("opps! something went wrong. Kindly check your address.");
        })
    }

    const confirmMapHandler = (e) => {
        e.preventDefault()
        setFormSubmit(false)
        setConfirmSubmit(true)
    }

   

    return (
        <div>
            {isLoading && <div className={classes.modal_backdrop}></div>}
            {/* {isLoading && <Modal />} */}
            <form className={classes.add_collection} onSubmit={mapLoadHandler} onClick={() => {setShowOptions(false)}}>
                {error && <p className={classes.error__text}>{error}</p>}
                <textarea cols="40" rows="5" placeholder="Enter your address here" onChange={addressChangeHandler} value={address} /> <br />
                <button className={classes.confirm__btn}>Confirm Address</button>
                {addresses.length > 0 &&
                <div className={classes.add_value} style={!showOptions ? { display: "none" } : null} onBlur={() => {setShowOptions(false)}}>
                    {addresses.length > 0 && addresses.map(address => {
                            return <button value={address.display_address} key={address.osm_id} onClick={buttonSelectHandler} >
                                {address.display_address}
                            </button>
                        }) 
                    }
                </div>}
            </form>
            {confirmFormSubmit && <div className={classes.modal_backdrop}></div>}
            {confirmFormSubmit && <div className={classes.map_confirmation}>   
                <div>
                    <p>Search successful! Address found.</p>
                    <p>Click OK to continue</p>
                    <button onClick={confirmFormSubmitHandler}>OK</button>
                </div>
            </div>}

            {formSubmit && <div className={classes.modal_backdrop} onClick={closeModalHandler}></div>}
            <div className={formSubmit ? `${classes.mappings_sect}` : `${classes.mappings_division}`}>   
                <div id='map'>
                    
                </div>
                <div className={classes.modal_button}>
                    <button className={classes.cancel_btn} onClick={closeModalHandler}>Close</button>
                    <button className={classes.confirm__btn} onClick={confirmMapHandler}>Confirm</button>
                </div>
            </div>
            {confirmSubmit && <div className={classes.modal_backdrop} onClick={closeConfirmModal}></div>}
            <div className={confirmSubmit ? `${classes.confirm_sect}` : `${classes.confirm_division}`}>   
                <form className={classes.confirm_submit}>
                    {submitError && <p className={classes.error__text}>{submitError}</p>}
                    <div>
                        <input type="text" name="First Name" ref={firstName} placeholder="First Name" onChange={firstNameHandler} onBlur={firstNameHandler} />
                    </div>
                    {!firstNameValid && <p className={classes.error__text}>field cannot be empty</p>}
                    <div>
                        <input type="text" name="Last Name" placeholder="Last Name" ref={lastName} onChange={lastNameHandler} onBlur={lastNameHandler} />
                    </div>
                    {!lastNameValid && <p className={classes.error__text}>field cannot be empty</p>}
                    <div>
                        <input type="email" name="email" placeholder="Email" ref={email} onChange={emailHandler} onBlur={emailHandler} />
                    </div>
                    {!emailValid && <p className={classes.error__text}>email is invalid</p>}
                    <div>
                        <input type="email" name="address" placeholder="address" value={address} disabled />
                    </div>
                    {isSubmitLoading && <p className={classes.loading__text}>Loading...</p>}
                    <div className={classes.modal_button}>
                        <button className={classes.cancel_btn} onClick={closeConfirmModal}>Cancel</button>
                        <button className={classes.confirm__btn} onClick={confirmSubmitHandler}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressInput;