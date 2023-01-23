import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Item } from '../../../types/cart';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const CURRENCY = 'gbp';
	const MIN_AMOUNT = 1.0;
	const MAX_AMOUNT = 5000.0;

	if (req.method === 'POST') {
		const { amount, cart } = req.body;
		const allProducts = cart.items.map((item: Item) => {
			return {
				price_data: {
					currency: CURRENCY,
					product_data: {
						name: item.item.name,
					},
					unit_amount: Math.round(item.item.price * 100),
				},
				quantity: item.quantity,
			};
		});

		try {
			// Validate the amount that was passed from the client.
			if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
				throw new Error('Invalid amount.');
			}
			// Create Checkout Sessions from body params.
			const params: Stripe.Checkout.SessionCreateParams = {
				mode: 'payment',
				payment_method_types: ['card'],
				line_items: allProducts,
				success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/checkout`,
			};
			const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
				params
			);
			res.status(200).json(checkoutSession);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Internal server error';
			res.status(500).json({ statusCode: 500, message: errorMessage });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
