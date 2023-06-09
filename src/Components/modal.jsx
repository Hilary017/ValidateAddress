import "./modal.css";

const Modal = (props) => {
    return <div className="error-modal">
        <p>{props.error}</p>
        <div className="error--button">
            {props.btn && <button onClick={props.onClick}>Ok</button>}
        </div>
    </div>
}

export default Modal;