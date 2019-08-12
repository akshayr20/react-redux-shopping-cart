import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartProduct extends Component {
	static propTypes = {
		product: PropTypes.object.isRequired,
		removeProduct: PropTypes.func.isRequired
	};

	state = {
		isMouseOver: false
	};

	handleMouseOver = () => {
		this.setState({ isMouseOver: true });
	};

	handleMouseOut = () => {
		this.setState({ isMouseOver: false });
	};

	render() {
		const { product, removeProduct } = this.props;

		const classes = ['shelf-item'];

		if (!this.state.isMouseOver) {
			classes.push('shelf-item--mouseover');
		}

		return (
			<div className={classes.join(' ')}>
				<div className="shelf-item__del" onMouseOver={() => this.handleMouseOver()} onMouseOut={() => this.handleMouseOut()} onClick={() => removeProduct(product)} />
				<div className="shelf-item__details">
					<p className="title">{product.title}</p>
					<p className="desc">
						{`${product.availableSizes[0]} | ${product.style}`} <br />
						Quantity: {product.quantity}
					</p>
				</div>
				<div className="shelf-item__price">12</div>
			</div>
		);
	}
}

export default CartProduct;
