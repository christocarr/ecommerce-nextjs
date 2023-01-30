import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { prisma } from '../lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { IProduct } from '../types/product.d';
import {
	CardSlider,
	ProductCard,
	ProductImage,
	ProductName,
	ProductDescription,
	ProductPrice,
	Button,
} from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ dealProducts }: InferGetServerSidePropsType<GetServerSideProps>) {
	const router = useRouter();

	const handleClick = (ev: React.MouseEvent<HTMLDivElement>, productId: string) => {
		ev.stopPropagation();
		const path = `/product/${productId}`;
		router.push(path);
	};

	return (
		<>
			<Head>
				<title>Plenny Gadgets</title>
				<meta name='description' content='Your online store for genuine refurbished tech' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h2>Latest deals</h2>
			<CardSlider>
				{dealProducts.map((product: IProduct) => (
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
			</CardSlider>
			<div className='p-8 bg-white'>
				<h3>We put the quality in refurbished</h3>
				<p>Plenny Gadgets is your goto online store for refurbished tech.</p>
				<div className='flex flex-col justify-between h-36 mb-4'>
					<div className='flex items-center width-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-8 h-8 mr-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<p className='mb-0'>All products refurbished to industry standards.</p>
					</div>
					<div className='flex items-center width-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-8 h-8 mr-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
							/>
						</svg>

						<p className='mb-0'>30-day money back guarantee.</p>
					</div>
					<div className='flex items-center width-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-8 h-8 mr-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525'
							/>
						</svg>

						<p className='mb-0'>Positive impact on the environment.</p>
					</div>
				</div>
				<Button text='Find out more' className='button-primary' />
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const dealProducts: IProduct[] = await prisma.products.findMany({
		where: {
			deal: true,
		},
	});

	return {
		props: {
			dealProducts,
		},
	};
};
