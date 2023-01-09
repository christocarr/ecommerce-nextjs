type DescriptionProps = {
	description: string;
};

const ProductDescription: React.FC<DescriptionProps> = ({ description }) => {
	return <p className='mb-2 font-light'>{description}</p>;
};

export default ProductDescription;
