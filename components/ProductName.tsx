type NameProps = {
	name: string;
};

const ProductName: React.FC<NameProps> = ({ name }) => {
	return <h3 className='text-lg font-bold'>{name}</h3>;
};

export default ProductName;
