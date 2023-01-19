import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../types/cart';
import { IProduct } from '../types/product.d';

type Context = {
	cart: Cart;
	addToCart: (product: IProduct) => void;
	removeFromCart: (id: string) => void;
};

type Props = {
	children: React.ReactNode;
};

const AppContext = createContext<Context>({} as Context);

const initialCart: Cart = {
	cartId: uuidv4().toString(),
	items: [],
};

export const AppWrapper: React.FC<Props> = ({ children }) => {
	const [cart, setCart] = useState<Cart>(initialCart);

	const addToCart = (product: IProduct) => {
		const productId = product.id;
		const items = cart.items.slice();
		const index = items.findIndex(({ item }) => item.id === productId);

		if (index > -1) {
			items[index] = {
				...items[index],
				quantity: items[index].quantity + 1,
			};

			setCart({
				...cart,
				items,
			});
		}

		if (index === -1) {
			const newItems = [...items, { item: product, quantity: 1 }];

			setCart({
				...cart,
				items: newItems,
			});
		}
	};

	const removeFromCart = (id: string) => {
		const newItems = cart.items.filter(({ item }) => item.id !== id);
		setCart({
			...cart,
			items: newItems,
		});
	};

	return (
		<AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
			{children}
		</AppContext.Provider>
	);
};

export function useAppContext() {
	return useContext(AppContext);
}
