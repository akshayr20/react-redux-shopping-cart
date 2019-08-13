import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loadCart } from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './CartProduct';

import './style.scss';

const products = [
	{
		description: 'GPX Poly 1',
		id: 14,
		price: 9,
		style: 'Front tie dye print',
		title: 'Sphynx Tie Dye Wine T-Shirt',
		quantity: 1
	},
	{
		description: 'Lorem',
		id: 11,
		price: 13.25,
		style: 'Wine',
		title: 'Wine Skul T-Shirt',
		quantity: 1
	},
	{
		description: '4 MSL',
		id: 12,
		price: 10.9,
		style: 'Black with custom print',
		title: 'Cat Tee Black T-Shirt',
		quantity: 1
	},
	{
		description: 'Treino 2014',
		id: 15,
		price: 14,
		style: 'Black T-Shirt with front print',
		title: 'Skuul',
		quantity: 1
	}
];

class FloatCart extends Component {
	state = {
		isOpen: false
	};

	componentDidMount() {
		this.props.loadCart(products);
		this.props.updateCart(products);
	}

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

	proceedToCheckout = () => {
		const { totalPrice, productQuantity } = this.props.cartTotal;

		if (!productQuantity) {
			alert('Add some product in the cart!');
		} else {
			alert(`Checkout - Subtotal: ${totalPrice}`);
		}
	};

	render() {
		const { cartTotal, cartProducts } = this.props;

		const products = cartProducts.map(p => {
			return <CartProduct product={p} removeProduct={this.removeProduct} key={p.id} />;
		});

		let classes = ['float-cart'];

		if (!!this.state.isOpen) {
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
						<span className="bag__quantity">{cartTotal.productQuantity}</span>
					</span>
				)}

				<div className="float-cart__content">
					<div className="float-cart__header">
						<span className="bag">
							<span className="bag__quantity">{cartTotal.productQuantity}</span>
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
							<p className="sub-price__val">{cartTotal.totalPrice}</p>
						</div>
						<div onClick={() => this.proceedToCheckout()} className="buy-btn">
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
	cartTotal: state.total.data
});

export default connect(
	mapStateToProps,
	{ loadCart, updateCart }
)(FloatCart);
