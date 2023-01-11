import React, { useState } from 'react';
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
	const [searchPhrase, setSearchPhrase] = useState('');

	const categories: Array<string> = [
		...new Set(products.map((p: Product) => p.category)),
	] as string[];

	const handleSearchPhrase = (ev: React.FormEvent<HTMLInputElement>) => {
		const target = ev.target as HTMLInputElement;
		setSearchPhrase(target.value.toLowerCase());
	};

	let searchedProducts: Product[];

	if (searchPhrase) {
		searchedProducts = products.filter((p: Product) => p.name.toLowerCase().includes(searchPhrase));
	} else {
		searchedProducts = products;
	}

	return (
		<>
			<Head>
				<title>Plenny Gadgets</title>
				<meta name='description' content='Your online store for genuine refurbished tech' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='h-screen'>
				<div className='p-5'>
					<input
						placeholder='search for tech...'
						value={searchPhrase}
						onChange={handleSearchPhrase}
						className='w-full mb-4 py-2 px-2 rounded-lg'
					/>
					<h1 className='my-6 text-3xl font-bold'>Plenny Gadgets</h1>
					{categories.map((category: string) => (
						<div key={category} className='mb-4'>
							{searchedProducts.find((p) => p.category === category) && (
								<>
									<h2 className='text-2xl'>{category}</h2>
									<div className='flex'>
										{searchedProducts
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
								</>
							)}
						</div>
					))}
				</div>
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
