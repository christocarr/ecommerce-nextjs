import { Cart, Item } from '../types/cart';

export const filteredItems = (cart: Cart, productId: string) => {
	return cart.items.filter(({ item }) => item.id !== productId);
};

export const slicedCartItems = (cart: Cart) => {
	return cart.items.slice();
};

export const itemIndex = (items: Item[], id: string) => {
	return items.findIndex(({ item }) => item.id === id);
};
