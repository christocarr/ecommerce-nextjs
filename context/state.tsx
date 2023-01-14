import React, { createContext, useContext, useState } from 'react';
import { IProduct } from '../types/product';

type Context = {
	cart: IProduct[];
	addToCart: (product: IProduct) => void;
	removeFromCart: (id: string) => void;
};

type Props = {
	children: React.ReactNode;
};

const AppContext = createContext<Context>({} as Context);

export const AppWrapper: React.FC<Props> = ({ children }) => {
	const [cart, setCart] = useState([] as IProduct[]);

	const addToCart = (product: IProduct) => {
		setCart((cart) => [...cart, product]);
	};

	const removeFromCart = (id: string) => {
		const newCart = cart.filter((item) => item.id !== id);
		setCart([...newCart]);
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
