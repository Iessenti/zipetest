import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import productsData from '../productsData.json'
import Pagination from '../components/Pagination'
import ProductPosts from '../components/ProductPosts'
import './pages.css'

const ProductsBox = () => {
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [productsPerPage] = useState(4)
	const [filterInfo, setFilterInfo] = useState({state: '', text: 'Фильтровать'})
	const [searchText, setSearchText] = useState('')
	
	// здесь я "обращаюсь к серверу". Добавил useEffect, try...catch,
	// чтобы продемонстрировать, как я это всегда пишу
	useEffect( () => {
		const getData = async () => {
			try {
				//setLoading(true)
				//const data = await fetch.....
				setProducts( productsData )
				//setLoading(false)
			} catch (e) {
				//setError(e.type, e.message)
			}
		}

		getData()

	}, [searchText])

	// получаем текущие продукты 
	const indexOfLastProduct = currentPage * productsPerPage;
  	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  	const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  	// меняем страницу
  	const paginate = pageNumber => setCurrentPage(pageNumber);

  	const searchHandler = () => { //поиск
  		const searchedProducts = []
  		products.forEach( elem => {
  			if (elem.productTitle.toLowerCase().includes(searchText.toLowerCase())) {
  				searchedProducts.push(elem)
  			}
  		}) 
  		setProducts( searchedProducts )
  	}

  	const filterHandler = () => { // логика сортировки по цене

  		if ( filterInfo.state == 'minToMax' ) {
  			setProducts( products.reverse() )
  			setFilterInfo({state: 'maxToMin', text: 'Самые дешёвые - самые дорогие'})
  		} else {
  			setProducts( products.sort( (prev, next) => prev.price - next.price) )
  			setFilterInfo({state: 'minToMax', text: 'Самые дорогие - самые дешёвые'})
  		}

  	}

	return (
		<div className='pages-wrapper'>

			<div className='header-wrapper'>

				<div className='search-wrapper'>
					<input type='text' 
						onChange={ (e) => { setSearchText(e.target.value) }}
						value={searchText}
					/> 
					<button onClick={searchHandler}>Искать</button>
				</div>

				<div className='filter-wrapper'>Сортировка по цене: <button onClick={filterHandler}>{filterInfo.text}</button></div>

				<div className='cart-wrapper'>
					<NavLink to='/cart'>
						<button>Корзина</button>
					</NavLink>
				</div>

			</div>

			<ProductPosts 
				products={currentProducts} 
			/>

			<Pagination 
				productsPerPage={productsPerPage}
				totalProducts={products.length}
				paginate={paginate}
				currentPage={currentPage}
			/>



		</div>
	)

}

export default ProductsBox