import { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import maplibregl from 'maplibre-gl';
import swal from "sweetalert";

import classes from "./Addressinput.module.css";

const locationiqKey = "pk.715caf1e4ee375ad5db1db5f9ff277df";

const Backdrop = props => {
    return <div onClick={props.onClick} className={classes.modal_backdrop}></div>
}


const AddressInput = () => {
    const [address, setAddress] =  useState("");
    const [addresses, setAddresses] =  useState([]);
    const [showOptions, setShowOptions] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [showMap, setShowMap] = useState(false);
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
        if(!address) {
            return;
        }
        
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

    const buttonSelectHandler = (e) => {
            e.preventDefault(), 
            setAddress(e.target.value), 
            setShowOptions(false)
    }

    const closeConfirmModal = (e) => {
        e.preventDefault()

        if(isSubmitLoading) {
            return;
        }

        setConfirmSubmit(false)
        setIsSubmitLoading(false);
        setIsLoading(false);
        setFirstNameValid(true);
        setLastNameValid(true);
        setEmailValid(true);
        setSubmitError("")
        firstName.current.value = ""
        lastName.current.value = ""
        email.current.value = ""
    }

    const confirmFormSubmitHandler = () => {
        setConfirmFormSubmit(false);
        setShowForm(false);

        const endPoint = []

        endPoint.push(addressData.lon)
        endPoint.push(addressData.lat)

        if(!addressData.geojson) {
            const map = new maplibregl.Map({
                container: 'map',
                style:
                    'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
                center: endPoint,
                zoom: 16
            });
        
            new maplibregl.Marker()
                .setLngLat(endPoint)
                .addTo(map);
            return;
        }
 
        // let start = [-74.5, 40];
        // let end = endPoint;

        let map = new maplibregl.Map({
            container: 'map',
            attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
            style: 'https://tiles.locationiq.com/v3/light/vector.json?key='+locationiqKey,
            zoom: 16,
            center: endPoint
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
    }

    const mapLoadHandler = (e) => {
        e.preventDefault(); 
        setShowMap(true);

        if(!address) {
            swal({
                title: "oops!",
                text: "Kindly enter your address.",
                timer: 2000
              });
            return;
        }

        setIsLoading(true)

        // console.log(`https://us1.locationiq.com/v1/search?key=pk.715caf1e4ee375ad5db1db5f9ff277df&q=${address}&format=json&polygon_geojson=1`)
        // fetch(`https://eu1.locationiq.com/v1/search?key=pk.715caf1e4ee375ad5db1db5f9ff277df&q=${address}&format=json&polygon_geojson=1`)
        fetch(`https://us1.locationiq.com/v1/search?key=pk.715caf1e4ee375ad5db1db5f9ff277df&q=${address}&format=json&polygon_geojson=1`)
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

        setIsSubmitLoading(true);

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
                // setFormSubmit(false)
                setShowMap(false);
                setShowForm(true)
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
        setConfirmSubmit(true)
    }

    const closeMapHandler = () => {
        setShowForm(true);
        setShowMap(false)
    }

   

    return (
        <div>
            {isLoading && ReactDom.createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
            {showForm && 
            <form className={classes.add_collection} onSubmit={mapLoadHandler} onClick={() => {setShowOptions(false)}}>
                {error && <p className={classes.error__text}>{error}</p>}
                <textarea cols="40" rows="5" placeholder="Enter your address here" onChange={addressChangeHandler} value={address} /> <br />
                <button className={classes.confirm__btn}>Confirm Address</button>
                {addresses.length > 0 &&
                <div className={classes.add_value} style={!showOptions ? { display: "none" } : null} onBlur={() => {setShowOptions(false)}}>
                    {addresses.length > 0 && addresses.map(address => {
                            return <button value={address.display_address} key={address.osm_id + Math.random()} onClick={buttonSelectHandler} >
                                {address.display_address}
                            </button>
                        }) 
                    }
                </div> }
            </form> 
            }
            {showMap && 
            <div className={`${classes.mappings_sec}${classes.mappings_divisio}`}>   
                <div id='map'>
                    
                </div>
                <p style={{textAlign: "center", marginBottom: "0px", fontSize: "0.7rem"}}>Kindly adjust the map (zoom in or out) to confirm you address.</p>
                <div className={classes.modal_button}>
                    <button className={classes.cancel_btn} onClick={closeMapHandler}>Close</button>
                    <button className={classes.confirm__btn} onClick={confirmMapHandler}>Confirm</button>
                </div>
            </div>
            }
            {confirmFormSubmit && <div className={classes.modal_backdrop}></div>}
            {confirmFormSubmit && <div className={classes.map_confirmation}>   
                <div>
                    <p>Search successful! Address found.</p>
                    <p>Click OK to continue</p>
                    <button onClick={confirmFormSubmitHandler}>OK</button>
                </div>
            </div>}
            {confirmSubmit && ReactDom.createPortal(<Backdrop  onClick={closeConfirmModal} />, document.getElementById("backdrop-root"))}
            <div className={confirmSubmit ? `${classes.confirm_sect}` : `${classes.confirm_division}`}>   
                <form className={classes.confirm_submit}>
                    {submitError && <p className={classes.text__error}>{submitError}</p>}
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
                        <button className={classes.confirm__btn} onClick={confirmSubmitHandler}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressInput;