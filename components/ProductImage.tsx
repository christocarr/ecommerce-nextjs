import React from 'react';
import Image from 'next/image';
import exp from 'constants';

type ImageProps = {
	image: string;
	name: string;
};

const ProductImage: React.FC<ImageProps> = ({ image, name }) => {
	return <Image src={image} alt={name} width={500} height={500} className='mb-6' />;
};

export default ProductImage;
