import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../services/cart/actions';
import CartProduct from './CartProduct';

import './style.scss';

class Checkout extends Component {
	static propTypes = {
		loadCart: PropTypes.func.isRequired,
		updateCart: PropTypes.func.isRequired,
		cartProducts: PropTypes.array.isRequired,
		newProduct: PropTypes.object,
		removeProduct: PropTypes.func,
		productToRemove: PropTypes.object
	};

	state = {
		isOpen: false
	};

	openFloatCart = () => {
		this.setState({ isOpen: true });
	};

	closeFloatCart = () => {
		this.setState({ isOpen: false });
	};

	removeProduct = product => {
		const { cartProducts, updateCart } = this.props;

		const index = cartProducts.findIndex(p => p.id === product.id);
		if (index >= 0) {
			cartProducts.splice(index, 1);
			updateCart(cartProducts);
		}
	};

	doNothing() {}

	render() {
		const { cartProducts, removeProduct } = this.props;

		const products = cartProducts.map(p => {
			return <CartProduct product={p} removeProduct={removeProduct} key={p.id} />;
		});

		let classes = ['float-cart'];

		if (!this.state.isOpen) {
			classes.push('float-cart--open');
		}

		return (
			<div className={classes.join(' ')}>
				{/* If cart open, show close (x) button */}
				{this.state.isOpen && (
					<div onClick={() => this.closeFloatCart()} className="float-cart__close-btn">
						X
					</div>
				)}

				{/* If cart is closed, show bag with quantity of product and open cart action */}
				{!this.state.isOpen && (
					<span onClick={() => this.openFloatCart()} className="bag bag--float-cart-closed">
						{/* <span className="bag__quantity">{cartTotal.productQuantity}</span> */}
						<span className="bag__quantity">12</span>
					</span>
				)}

				<div className="float-cart__content">
					<div className="float-cart__header">
						<span className="bag">
							{/* <span className="bag__quantity">{cartTotal.productQuantity}</span> */}
							<span className="bag__quantity">12</span>
						</span>
						<span className="header-title">Cart</span>
					</div>

					<div className="float-cart__shelf-container">
						{products}
						{!products.length && (
							<p className="shelf-empty">
								Add some products in the cart <br />
								:)
							</p>
						)}
					</div>

					<div className="float-cart__footer">
						<div className="sub">SUBTOTAL</div>
						<div className="sub-price">
							<p className="sub-price__val">120</p>
						</div>
						<div onClick={() => this.doNothing()} className="buy-btn">
							Checkout
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cartProducts: state.cart.products,
	productToRemove: state.cart.productToRemove,
	cartTotal: state.total.data
});

export default connect(
	mapStateToProps,
	{ loadCart, removeProduct }
)(Checkout);
