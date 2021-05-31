import {createStore} from 'redux'

const initialState = {
	cart: []
}

function reducer (state = initialState, action) {
	switch (action.type) {
		case 'ADD_PRODUCT_TO_CART':
			let arr = [...state.cart, action.value]
			return {
				...state,
				cart: arr 
			}

		case 'CLEAN_CART':
			return {}

		default: return state
	}
}

const store = createStore(reducer);

export default store