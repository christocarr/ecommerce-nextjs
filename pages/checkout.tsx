import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, ProductCard, ProductDescription, ProductImage } from '../components';
import CheckoutFrom from '../components/CheckoutForm';
import { useAppContext } from '../context/state';

export default function Checkout() {
	const { cart, addToCart, removeFromCart, removeAllFromCart } = useAppContext();
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

	const handleAddToCart = (productId: string) => {
		const cartItems = cart.items;
		const product = cartItems.find(({ item }) => item.id === productId);

		if (product) {
			addToCart(product.item);
		}
	};

	const handleRemoveAll = (productId: string) => {
		removeAllFromCart(productId);
	};

	return (
		<>
			{cart.items.length === 0 ? (
				<div>
					<p>Cart is empty</p>
					<Link href='/'>Back to great deals</Link>
				</div>
			) : (
				<div className='flex flex-col w-full mb-4'>
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
					<div className='flex justify-between mb-4'>
						<Link href='/' className='underline underline-offset-4'>
							Service fee
						</Link>
						<p>£{fee}</p>
					</div>
					<CheckoutFrom cartTotal={cartTotal} cart={cart} />
				</div>
			)}
			<p className='mb-2 text-lg'>Your cart</p>
			{cart.items.map((product) => (
				<div key={product.item.id}>
					<ProductCard className='mb-6 p-8 rounded-xl bg-white'>
						<ProductImage image={product.item.image} name={product.item.name} />
						<ProductDescription description={product.item.description} />
						<div className='flex justify-between'>
							<div className='flex'>
								<Button
									text='-'
									className='btn-secondary text-xl'
									onClick={() => handleRemoveFromCart(product.item.id)}
								/>
								<p className='mx-2'>{product.quantity}</p>
								<Button
									text='+'
									className='btn-secondary text-xl'
									onClick={() => handleAddToCart(product.item.id)}
								/>
							</div>
							<Button
								text='Remove'
								className='btn btn-danger'
								onClick={() => handleRemoveAll(product.item.id)}
							/>
						</div>
					</ProductCard>
				</div>
			))}
		</>
	);
}
