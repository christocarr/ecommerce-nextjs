type PriceProps = {
	price: number;
};

const ProductPrice: React.FC<PriceProps> = ({ price }) => {
	return <p className='font-semibold'>{`£${price}`}</p>;
};

export default ProductPrice;
