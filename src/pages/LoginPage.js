import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import './pages.css'

const correctLoginData = {login: 'admin', password:'1234567890'}

const LoginPage = () => {
	const auth = useContext(AuthContext)
	const [form, setForm] = useState({login: '', password:''})
	const [message, setMessage] = useState(false)
	const [errorClass, setErrorClass] = useState(false)
	const [redirect, setRedirect] = useState(false)


	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const loginHandler = async () => {
			if ( (form.login !== correctLoginData.login) || (form.password !== correctLoginData.password) ) {
				setMessage('Неверный логин и/или пароль')
				setErrorClass(true)
			} else {
				auth.login(form.login, form.login)
				setRedirect(true)				
			}


			return true
	}

	if (redirect) {
		return <Redirect to='/pages/1' />
	}

	return (
		<div className='loginpage-wrapper'>
			<div className='login-wrapper'>

				<input 
					placeholder="Введите логин"
                	id="login"
                	type="text"
                	name="login"
                	value={form.login}
                	onChange={changeHandler}
                	className={'input ' + (errorClass ? 'errorInputClass' : '' )}
				/>

				<input 
					placeholder="Введите пароль"
                	id="password"
                	type="password"
                	name="password"
                	value={form.password}
                	onChange={changeHandler}
                	className={'input ' + (errorClass ? 'errorInputClass' : '' )}
				/>

				{message}

				<button 
					onClick={loginHandler}
				>
					Войти
				</button>

			</div>
		</div>
	)
}

export default LoginPage