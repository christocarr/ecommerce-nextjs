import ProductsSpecification from './specification';

export interface IProduct {
	id: string;
	category: string;
	description: string;
	image: string;
	name: string;
	price: number;
	specifications: ProductsSpecification;
}
