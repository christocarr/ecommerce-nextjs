import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ProductCard, ProductImage } from '../../components';

import { prisma } from '../../lib/prisma';

export default function Page({ product }: InferGetServerSidePropsType<GetServerSideProps>) {
	console.log(product);
	return (
		<ProductCard>
			<ProductImage image={product.image} name={product.name} />
		</ProductCard>
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
