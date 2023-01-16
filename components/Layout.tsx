import { useRouter } from 'next/router';
import Navbar from './Navbar';
import CheckoutNavbar from './CheckoutNavbar';
import Footer from './Footer';

type Props = {
	children: React.ReactNode;
};

function Layout({ children }: Props) {
	const { pathname } = useRouter();
	return (
		<>
			{pathname === '/checkout' ? <CheckoutNavbar /> : <Navbar />}

			<main className='px-4'>{children}</main>
			<Footer />
		</>
	);
}

export default Layout;
