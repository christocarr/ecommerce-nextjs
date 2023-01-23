import { useState } from 'react';
import { Cart } from '../types/cart';
import { fetchPostJSON } from '../utils/api-helpers';
import getStripe from '../utils/get-stripe';
import Button from './Button';

type CheckoutFormProps = {
	cartTotal: number;
	cart: Cart;
};

const CheckoutFrom = ({ cartTotal, cart }: CheckoutFormProps) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
		ev.preventDefault();
		setLoading(true);

		const response = await fetchPostJSON('/api/checkout_sessions', {
			amount: cartTotal,
			cart: cart,
		});

		if (response.statusCode === 500) {
			console.error(response.message);
			return;
		}

		const stripe = await getStripe();
		const { error } = await stripe!.redirectToCheckout({
			sessionId: response.id,
		});

		console.warn(error.message);
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button
				text={`Pay £${cartTotal}`}
				type='submit'
				disabled={loading}
				className='w-full bg-black text-white py-2'
			/>
		</form>
	);
};

export default CheckoutFrom;
