import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirm({name, title, buttonText, isOpen, isClose, onSubmit, closeTouchOverlay}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm closeTouchOverlay={closeTouchOverlay} onSubmit={handleSubmit} name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose} buttonStatus={true}/>

  )
}