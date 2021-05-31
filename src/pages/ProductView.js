import React, {useState} from 'react'
import store from '../store/store'
import action_add_new_value from '../store/actions/action_add_new_value'
import {useLocation} from 'react-router-dom'
import './pages.css'


const ProductView = () => {
	let location = useLocation();
	const [amount, setAmount] = useState(1)
	const [size, setSize] = useState(false)
	const [message, setMessage] = useState(false)

	const countHandler = (e) => {
		setAmount(e.target.value)
	}

	const clickHandler = () => {
		if (size === false) {
			setMessage('Пожалуста, выберите размер')				
		} else {
			
			const productForCart = {
				id: location.aboutProps.id,
				title: location.aboutProps.title,
				photoLink: location.aboutProps.photoLink,
				price: location.aboutProps.price,
				amount: amount,
				size: size
			}
			
			store.dispatch( action_add_new_value(productForCart) )

			setSize(false)
			setAmount(1)
			setMessage(false)					
		}


	}

	return (
		<div className='product-view-wrapper'>

			<div className='product-view'>
				<img src={location.aboutProps.photoLink} className='product-page-img'/>
				
				<div className='product-view-text-wrapper'>
					<p className='bold-text'>{location.aboutProps.title}</p>
					<p className='bold-text'>{location.aboutProps.price}</p>
					<p>{location.aboutProps.description}</p>
				</div>
			</div>

			<div className='product'>

				

				<div className='sizes-list'>
				{
					location.aboutProps.sizes.map( elem => {
						console.log(size == elem)
						return (
							<div 
								key={elem}
								onClick={ 
									() => { setSize(elem) }
								}
								className={ ( size == elem ) ? 'activeSize' : 'sizeElem'}
							>
								{elem}
							</div>	
						)
					})

				}
				</div>

				<input type='number' min='1' value={amount} onChange={countHandler}/>
				
				{message}

				<button
					onClick={clickHandler}
				>
					Добавить в корзину
				</button>
			</div>
		</div>
	)
}

export default ProductView