import { IProduct } from './product.d';

// export type Cart = {
// 	products: IProduct[];
// };
type Items = {
	item: IProduct;
	quantity: number;
};

export type Cart = {
	cartId: string;
	items: Items[];
};
