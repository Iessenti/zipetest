import React, {useState, useEffect} from 'react'
import store from '../store/store'
import OrderForm from '../components/OrderForm'
import pages from './pages.css'

const CartPage = () => {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [formShow, setFormShow] = useState(false)

	useEffect( () => {
		let tot = 0
		setProducts(
			store.getState().cart.map( elem => {

				tot += elem.price * elem.amount

				return (
					<div key={elem.id} className='cart-product'>
						<img src={elem.photoLink} />
						<p style={{fontWeight: 700}}>{elem.title}</p>
						<p>Цена: {elem.price}</p>
						<p>Количество: {elem.amount}</p>
						<p>Размер: {elem.size}</p>
					</div>
				)	
			})
		)
		setTotal(tot)
	}, [])

	const CloseButton = <button onClick={ () => { setFormShow(false)  } } className='closeButton'> 	Закрыть </button>

	return (
		<>

		{	(formShow && (total!=0)) ? <OrderForm totalSum={total} /> : null }
		{ formShow ? CloseButton : null}


		<div className='cart-page-wrapper'> 
			

			<div className='cart-products-wrapper'>
				{products}
			</div>

			<div className='bold-text'>Общая сумма заказа: {total}</div>

			<button 
				onClick={ () => { setFormShow(true) } }
			>
				Заказать
			</button>

		</div>

		</>
	)
}

export default CartPage