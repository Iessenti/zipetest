import React from 'react'
import { NavLink } from 'react-router-dom'
import './components.css'


const ProductPosts = ({products}) => {
	
	return (
		<div className='product-post-wrapper'>

		{
			products.map( elem => {
				return (
					<div key={ elem.productId } className='product-post'>
						<p>{elem.productTitle}</p>

						<p>{elem.price}</p>

						<img src={elem.photoLink} />

						<button>
							<NavLink 
								to={{
									pathname: '/product/' + elem.productId,
									aboutProps: {
										id: elem.productId,
										title: elem.productTitle,
										price: elem.price,
										photoLink: elem.photoLink,
										description: elem.description,
										sizes: elem.sizes
									}
								}} 
								className='navlink'>
							Подробнее
							</NavLink>
						</button>
					</div>
				)
			})

		}

		</div>	
	)
}

export default ProductPosts