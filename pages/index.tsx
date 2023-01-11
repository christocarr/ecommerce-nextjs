import Head from 'next/head';
import { Inter } from '@next/font/google';
import { prisma } from '../lib/prisma';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {
	ProductCard,
	ProductImage,
	ProductName,
	ProductDescription,
	ProductPrice,
} from '../components';

const inter = Inter({ subsets: ['latin'] });

type Product = {
	id: string;
	category: string;
	description: string;
	image: string;
	name: string;
	price: number;
};

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
	const categories: Array<string> = [
		...new Set(products.map((product: Product) => product.category)),
	] as string[];
	return (
		<>
			<Head>
				<title>Plenny Gadgets</title>
				<meta name='description' content='Your online store for genuine refurbished tech' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='h-screen'>
				<h1 className='my-6 text-3xl font-bold'>Plenny Gadgets</h1>
				{categories.map((category: string) => (
					<div key={category}>
						<h2 className='text-2xl'>{category}</h2>
						{products
							.filter((p: Product) => p.category === category)
							.map((product: Product) => (
								<ProductCard key={product.id}>
									<ProductImage image={product.image} name={product.name} />
									<ProductName name={product.name} />
									<ProductDescription description={product.description} />
									<ProductPrice price={product.price} />
								</ProductCard>
							))}
					</div>
				))}
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const products: Product[] = await prisma.products.findMany();

	return {
		props: {
			products,
		},
	};
};
