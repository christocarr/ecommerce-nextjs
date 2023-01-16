import Link from 'next/link';

function Footer() {
	return (
		<footer className='w-full px-4'>
			<Link href='/'>Home</Link>
			<Link href='/checkout'>Checkout</Link>
		</footer>
	);
}

export default Footer;
