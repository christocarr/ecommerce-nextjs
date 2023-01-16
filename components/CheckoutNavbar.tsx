import Link from 'next/link';

function CheckoutNavbar() {
	return (
		<nav className='w-full mb-4 px-4 py-4 bg-black'>
			<Link href='/'>
				<h1 className='text-white text-2xl font-bold'>Plenny Gadgets</h1>
			</Link>
		</nav>
	);
}

export default CheckoutNavbar;
