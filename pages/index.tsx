import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { prisma } from '../lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { IProduct } from '../types/product';
import {
	ProductCard,
	ProductImage,
	ProductName,
	ProductDescription,
	ProductPrice,
} from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ products }: InferGetServerSidePropsType<GetServerSideProps>) {
	const [searchPhrase, setSearchPhrase] = useState('');

	const router = useRouter();

	const categories: Array<string> = [
		...new Set(products.map((p: IProduct) => p.category)),
	] as string[];

	const handleSearchPhrase = (ev: React.FormEvent<HTMLInputElement>) => {
		const target = ev.target as HTMLInputElement;
		setSearchPhrase(target.value.toLowerCase());
	};

	const handleClick = (ev: React.MouseEvent<HTMLDivElement>, id: string) => {
		ev.stopPropagation();
		const target = ev.target;
		router.push(`/product/${id}`);
	};

	if (searchPhrase) {
		products = products.filter((p: IProduct) => p.name.toLowerCase().includes(searchPhrase));
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
							{products.find((p: IProduct) => p.category === category) && (
								<>
									<h2 className='text-2xl'>{category}</h2>
									<div className='flex'>
										{products
											.filter((p: IProduct) => p.category === category)
											.map((product: IProduct) => (
												<ProductCard key={product.id} onClick={(ev) => handleClick(ev, product.id)}>
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

export const getServerSideProps: GetServerSideProps = async () => {
	const products: IProduct[] = await prisma.products.findMany();

	return {
		props: {
			products,
		},
	};
};
