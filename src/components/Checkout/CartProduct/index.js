import React, { Component } from 'react';

class CartProduct extends Component {
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

		if (this.state.isMouseOver) {
			classes.push('shelf-item--mouseover');
		}

		return (
			<div className={classes.join(' ')}>
				<div className="shelf-item__del" onMouseOver={() => this.handleMouseOver()} onMouseOut={() => this.handleMouseOut()} onClick={() => removeProduct(product)}>
					X
				</div>
				<div className="shelf-item__details">
					<p className="title">{product.title}</p>
					<p className="desc">
						{`${product.style}`} <br />
						Quantity: {product.quantity}
					</p>
				</div>
				<div className="shelf-item__price">{product.price}</div>
			</div>
		);
	}
}

export default CartProduct;
