import "./Step1Footer.css";

const Step1Footer = (props) => {
    return (
        <div className={`${props.className} ${!props.cancel ? "step-footer" : "footer--step"}`}>
            {props.cancel && <button className="back--btn" onClick={props.return}>Go Back</button>}
            <button className="next--btn" onClick={props.onClick}>{props.value}</button>
        </div>
    )
}

export default Step1Footer;