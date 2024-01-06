import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import Header from './Header';

const Register = ({ handleRegister }) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  }

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  }

  // Отправка формы
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleRegister({email, password});
  }
  
  // Регулярка для проверки E-mail
  const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  
  // Проверка валидности при заполнении полей
  React.useEffect(() => {
    if(email.length !== 0 && password.length !== 0 && re.test(String(email).toLowerCase())) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password])

  return (
    <>
      <Header>
        <Link className='header__button' to="/sign-in">Войти</Link>
      </Header>
      <Form isDisabled={disabled} onSubmit={handleFormSubmit} labelText="Регистрация" buttonText="Зарегистрироваться" bottomLink={true}> 
        <input className="form__input" value={email} onChange={handleChangeEmail} type="email" required autoComplete="off" placeholder="Email" />
        <input className="form__input" value={password} onChange={handleChangePassword} type="password" required autoComplete="off" placeholder="Пароль" />
      </Form>
    </>
  )
}

export default Register;