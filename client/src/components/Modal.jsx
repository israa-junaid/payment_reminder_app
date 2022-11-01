import cross from "../images/modal/close-circle.svg";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="custom-modal  p-4">
      <div
        className={`modal-content overflow-auto max-h-90% p-4 animated fadeIn fixed z-50 pin bg-smoke-dark ${props.className}`}
      >
        <div className="flex flex-row justify-end items-end">
          <img
            onClick={props.close}
            className="h-6 cursor-pointer hover:opacity-70"
            src={cross}
            alt=""
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
