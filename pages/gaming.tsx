import React, { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
	ProductName,
	ProductImage,
	ProductDescription,
	ProductCard,
	ProductPrice,
} from '../components';
import { prisma } from '../lib/prisma';
import { IProduct } from '../types/product';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SmartphoneProductsPage({
	products,
}: InferGetServerSidePropsType<GetServerSideProps>) {
	const [searchPhrase, setSearchPhrase] = useState('');

	const router = useRouter();

	const categories: Array<string> = [
		...new Set(products.map((p: IProduct) => p.category)),
	] as string[];

	const handleSearchPhrase = (ev: React.FormEvent<HTMLInputElement>) => {
		const target = ev.target as HTMLInputElement;
		setSearchPhrase(target.value.toLowerCase());
	};

	const handleClick = (ev: React.MouseEvent<HTMLDivElement>, productId: string) => {
		ev.stopPropagation();
		const path = `/product/${productId}`;
		router.push(path);
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
			<div>
				<input
					placeholder='search for tech...'
					value={searchPhrase}
					onChange={handleSearchPhrase}
					className='w-full mb-4 py-2 px-2 rounded-lg'
				/>
				{categories.map((category: string) => (
					<div key={category} className='mb-4'>
						{products.find((p: IProduct) => p.category === category) && (
							<>
								<h2 className='text-2xl'>{category}</h2>
								<div className='flex flex-col gap-4'>
									{products
										.filter((p: IProduct) => p.category === category)
										.map((product: IProduct) => (
											<ProductCard
												key={product.id}
												onClick={(ev) => handleClick(ev, product.id)}
												className='card'
											>
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
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const products: IProduct[] = await prisma.products.findMany({
		where: { category: 'Smartphones' },
	});

	return {
		props: {
			products,
		},
	};
};
