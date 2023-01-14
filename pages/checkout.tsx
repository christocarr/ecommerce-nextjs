import { Cart } from '../components';
import { useAppContext } from '../context/state';

export default function Checkout() {
	const { cart } = useAppContext();
	return <Cart cart={cart} />;
}
