import { LOAD_CART } from './actionTypes';

export const loadCart = products => ({
  type: LOAD_CART,
  payload: products
});
