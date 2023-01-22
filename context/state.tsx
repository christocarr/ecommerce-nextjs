import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../types/cart';
import { IProduct } from '../types/product.d';

type Context = {
	cart: Cart;
	addToCart: (product: IProduct) => void;
	removeFromCart: (id: string) => void;
	removeAllFromCart: (id: string) => void;
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

	const removeFromCart = (productId: string) => {
		const items = cart.items.slice();
		const index = items.findIndex(({ item }) => item.id === productId);

		if (index > -1 && items[index].quantity > 1) {
			items[index] = {
				...items[index],
				quantity: items[index].quantity - 1,
			};

			setCart({
				...cart,
				items,
			});
		} else {
			const newItems = cart.items.filter(({ item }) => item.id !== productId);
			setCart({
				...cart,
				items: newItems,
			});
		}
	};

	//Removes all items of the same product
	const removeAllFromCart = (productId: string) => {
		const newItems = cart.items.filter(({ item }) => item.id !== productId);
		setCart({ ...cart, items: newItems });
	};

	return (
		<AppContext.Provider value={{ cart, addToCart, removeFromCart, removeAllFromCart }}>
			{children}
		</AppContext.Provider>
	);
};

export function useAppContext() {
	return useContext(AppContext);
}
