import "./Modal.scss";

const Modal = ({ header, children, closeModal }) => {
  return (
    <div className="modalWrapper">
      <div className="backdrop" onClick={closeModal}></div>
      <div className="modalContainer">
        <div className="modalHeader">
          <h3>{header}</h3>
        </div>
        <div className="modalContent">{children}</div>
        <div className="modalFooter">
          <button className="ugasi" onClick={closeModal}>
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
