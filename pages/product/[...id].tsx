import React from 'react';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ProductCard, ProductImage, Button } from '../../components';
import { prisma } from '../../lib/prisma';
import { IProduct } from '../../types/product';
import { useAppContext } from '../../context/state';

export default function Page({ product }: InferGetServerSidePropsType<GetServerSideProps>) {
	const { addToCart } = useAppContext();

	const router = useRouter();

	const handleAddToCart = (product: IProduct) => {
		addToCart(product);
	};

	return (
		<>
			<ProductCard>
				<ProductImage image={product.image} name={product.name} />
			</ProductCard>
			<Button
				onClick={() => handleAddToCart(product)}
				className='py-2 px-4  w-full font-bold text-white bg-black rounded hover:bg-gray-700'
			>
				Buy
			</Button>
			<Link href='/checkout'>Go to checkout</Link>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = (params as ParsedUrlQuery)?.id as string[];
	try {
		const product = await prisma.products.findUnique({
			where: { id: id[0] },
		});
		return {
			props: {
				product,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};
