import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT } from './actionTypes';

const initialState = {
	products: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_CART:
			return {
				...state,
				products: action.payload
			};
		default:
			return state;
	}
}
