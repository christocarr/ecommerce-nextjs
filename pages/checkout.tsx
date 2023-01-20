import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, ProductCard, ProductImage } from '../components';
import { useAppContext } from '../context/state';

export default function Checkout() {
	const { cart, removeFromCart } = useAppContext();
	const [fee, setFee] = useState(3.99);
	const [cartTotal, setCartTotal] = useState(0);
	const [itemsTotal, setItemsTotal] = useState(0);

	useEffect(() => {
		setCartTotal(() => {
			//get all cart items price multiplied by their quantities
			const subTotals: number[] = cart.items.map((item) => item.item.price * item.quantity);

			return subTotals.reduce((acc, curr) => {
				return acc + curr;
			}, 0);
		});

		setItemsTotal(() => {
			//get all cart items quantities
			if (cart.items.length !== 0) {
				return cart.items.map((item) => item.quantity).reduce((acc, curr) => acc + curr);
			} else {
				return 0;
			}
		});
	}, [cart]);

	const handleRemoveFromCart = (productId: string) => {
		removeFromCart(productId);
	};

	return (
		<>
			{cart.items.length === 0 ? (
				<div>
					<p>Cart is empty</p>
					<Link href='/'>Back to great deals</Link>
				</div>
			) : (
				<div className='flex flex-col w-4/6'>
					<div className='flex justify-between'>
						<p>Cart Total</p>
						<p>£{cartTotal + fee}</p>
					</div>
					<hr />
					<div className='flex justify-between'>
						<p>
							{itemsTotal} {itemsTotal > 1 ? `items` : `item`}
						</p>
						<p>£{cartTotal}</p>
					</div>
					<div className='flex justify-between'>
						<Link href='/'>Service fee</Link>
						<p>£{fee}</p>
					</div>
				</div>
			)}
			<p>Your cart</p>
			{cart.items.map((product) => (
				<div key={product.item.id}>
					<ProductCard>
						<ProductImage image={product.item.image} name={product.item.name} />
						<Button
							text='remove'
							className=''
							onClick={() => handleRemoveFromCart(product.item.id)}
						/>
						<p>{product.quantity}</p>
					</ProductCard>
				</div>
			))}
		</>
	);
}
