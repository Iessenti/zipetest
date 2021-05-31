import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import ProductView from './pages/ProductView'
import CartPage from './pages/CartPage'

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>

				<Route 
					path='/pages/:id'
				  	render={ props => (
				    	<Redirect to={`/pages/${props.match.params.id}`} />
					)}
				>
					<ProductsPage />
				</Route>

				<Route path='/product/:id'>
					<ProductView />
				</Route>

				<Route path='/cart'>
					<CartPage />
				</Route>

				<Redirect to='/pages/1'/>
			</Switch>
		)
	}

	return (
		<Switch>

			<Route path='/login' exact>
				<LoginPage/>
			</Route>

			<Redirect to='/login' />
		</Switch>
	)
}