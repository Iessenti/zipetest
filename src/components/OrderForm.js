import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import store from '../store/store'
import action_clean_cart from '../store/actions/action_clean_cart'
import './components.css'

const OrderForm = ({totalSum}) => {
	const [form, setForm] = useState({name: '', address: '', phone: ''})
	const [redirect, setRedirect] = useState(false)
	const [message, setMessage] = useState(false)

	const changeHandler = (e) => {
		setForm({...form, [e.target.name]: e.target.value })
	}

	const onSubmit = async () => {
		if ( (form.name === '') && (form.address === '') && (form.phone === '') ) { //Здесь должна быть нормальная валидация, но, как я понял, не это сейчас важно
			setMessage('Пожалуйста, введите корректные данные')
			setRedirect(false)
			return true
		} 

			await fetch('URL', {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			  },
			  body: JSON.stringify(form)
			})

			alert('Заказ оформлен')

			store.dispatch( action_clean_cart() )

			setRedirect(true)

		
	}

	if (redirect) {
		return <Redirect to='/pages/1' />
	}

	return (
		<div className='order-form-wrapper'>
				<p> Общая сумма заказа: {totalSum} </p>

				<input 
					name='name'
					type='text' 
					placeholder='Введите Ваше имя' 
					value={form.name}
					onChange={changeHandler}
				/>

				<input 
					name='address'
					type='text' 
					placeholder='Введите Ваш адрес' 
					value={form.address}
					onChange={changeHandler}
				/>

				<input 
					name='phone'
					type='text' 
					placeholder='Введите Ваш номер телефона' 
					value={form.phone}
					onChange={changeHandler}
				/>

				{message}

				<button onClick={onSubmit} >
					Заказать
				</button>
		</div>
	)
}

export default OrderForm