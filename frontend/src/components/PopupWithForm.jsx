function PopupWithForm({name, title, buttonText, isOpen, isClose, onSubmit, children, buttonStatus, closeTouchOverlay}) {
  return (
    <div onClick={closeTouchOverlay} className={`popup popup_${name} ${isOpen ? "popup_opened" : ''}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={isClose}></button>
          <form
            className={`popup__form popup__form_${name}`}
            action="#"
            noValidate
            onSubmit={onSubmit}
          >
            <fieldset className="popup__fieldset">
              <label className="popup__label">{title}</label>
              {children}
            </fieldset>
            <button
              disabled={!buttonStatus}
              className={`popup__save-btn popup__save-btn_${name} ${!buttonStatus && 'popup__save-btn_disabled'}`}
              type="submit"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
}

export default PopupWithForm;