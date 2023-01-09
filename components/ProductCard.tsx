import * as React from 'react';
type Props = {
	children?: React.ReactNode;
};

const ProductCard: React.FC<Props> = ({ children }) => {
	return (
		<div className='w-11/12 mb-4 p-8 rounded-xl bg-white cursor-pointer hover:drop-shadow-lg delay-200 ease md:mr-2 max-w-sm'>
			{children}
		</div>
	);
};

export default ProductCard;
