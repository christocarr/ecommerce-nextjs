import { IProduct } from './product.d';

type Item = {
	item: IProduct;
	quantity: number;
};

export type Cart = {
	cartId: string;
	items: Item[];
};
