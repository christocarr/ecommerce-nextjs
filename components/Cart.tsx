import React from 'react';
import { IProduct } from '../types/product.d';
import { useAppContext } from '../context/state';
import { Button } from '../components';

type CartProps = {
	cart: IProduct[];
};

const Cart: React.FC<CartProps> = ({ cart }) => {
	const { removeFromCart } = useAppContext();

	const handleRemoveFromCart = (id: string) => {
		removeFromCart(id);
	};

	return (
		<>
			<div>Checkout page</div>
			{cart.length === 0 && <div>cart is empty</div>}
			{cart.map((product) => (
				<div key={product.id}>
					<p>{product.name}</p>
					<Button
						text='remove from cart'
						onClick={() => handleRemoveFromCart(product.id)}
						className='btn btn-primary'
					/>
				</div>
			))}
		</>
	);
};

export default Cart;
