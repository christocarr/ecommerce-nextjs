import Link from 'next/link';
import { useAppContext } from '../context/state';

function Navbar() {
	const { cart } = useAppContext();

	return (
		<nav className='flex justify-between items-center w-full mb-4 px-4 py-4'>
			<button>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-10 h-10'
				>
					<path
						fillRule='evenodd'
						d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
			<Link href='/'>
				<h1 className='text-2xl font-bold'>Plenny Gadgets</h1>
			</Link>

			<div className='flex justify-between w-16'>
				<Link href='/account'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='w-7 h-7'
					>
						<path
							fillRule='evenodd'
							d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
							clipRule='evenodd'
						/>
					</svg>
				</Link>

				<Link href='/checkout'>
					<div className='relative'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='w-7 h-7'
						>
							<path
								fillRule='evenodd'
								d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
								clipRule='evenodd'
							/>
						</svg>
						{cart.length > 0 && (
							<span className='absolute top-0 right-0 w-2 h-2 bg-red-600 rounded'></span>
						)}
					</div>
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
