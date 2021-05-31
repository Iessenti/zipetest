import React from 'react'
import './components.css'
import { NavLink } from 'react-router-dom'

const Pagination = ({productsPerPage, totalProducts, paginate, currentPage}) => {
	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    	pageNumbers.push(i);
  	}

  	return (
  		<div className='pagination'>

  			{
  				pageNumbers.map( number => {
  					return (
  						
  						<NavLink 
  							to={'/pages/' + number} 
  							onClick={() => paginate(number)}
  							className='navlink'
  							key={number}  
  						>
  							<div 
  								className={( number == currentPage ? 'activePageNum' : '')}
  							>
								<p>{number}</p>
							</div>
						</NavLink>
  					)
  				})
  			}

  		</div>
  	)
}

export default Pagination