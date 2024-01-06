import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import Header from './Header';

const Login = ({ onLogin }) => {

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
    onLogin({email, password});
  }

  // регулярка для E-mail
  const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // Проверка валидности при заполнении полей
  React.useEffect(() => {
    setDisabled(email.length !== 0 && password.length !== 0 && !re.test(String(email).toLowerCase()));
  }, [email, password])

  return (
    <>
      <Header>
        <Link className="header__button" to="/sign-up">Регистрация</Link>
      </Header>
      <Form isDisabled={disabled} onSubmit={handleFormSubmit} labelText="Вход" buttonText="Войти" bottomLink={false}>
        <input className="form__input" type="email" value={email} onChange={handleChangeEmail} required placeholder="Email"/>
        <input className="form__input" type="password" value={password} onChange={handleChangePassword} required placeholder="Пароль" />
      </Form>
    </>
    
  )
}

export default Login;