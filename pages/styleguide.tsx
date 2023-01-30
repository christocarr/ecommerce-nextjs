export default function Test() {
	return (
		<>
			<div className='p-4'>
				<h2>Typography</h2>
				<h1>This is a h1 title</h1>
				<h2>This is a h1 title</h2>
				<h3>This is a h1 title</h3>
				<h4>This is a h1 title</h4>
				<p>
					This is a paragraph. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
					corporis eveniet fugit possimus vitae quia iusto iste accusamus optio voluptate illo modi
					totam, sequi reiciendis in voluptas dolorem ullam cum?
				</p>
			</div>
			<hr />
			<div className='p-4'>
				<h2>Link</h2>
				<a href='https://tailwindcss.com/' className='text-link'>
					This is an anchor
				</a>
			</div>
			<hr />
			<div className='p-4'>
				<h2>Buttons</h2>
				<div className='mb-4'>
					<button className='button-primary'>Button primary</button>
				</div>
				<div className='mb-4'>
					<button className='button-secondary'>Button secondary</button>
				</div>
				<div className='mb-4'>
					<button className='button-danger'>Button danger</button>
				</div>
			</div>
			<hr />
			<div className='p-4'>
				<h2>Cards</h2>
				<div className='card'>
					<h3>Card</h3>
					<p>Card example.</p>
				</div>
			</div>
			<hr />
			<div className='p-4'>
				<h2>Forms</h2>
				<form>
					<input
						id='text-input'
						className='peer h-10 w-full px-2 text-stone-800 placeholder-transparent focus:outline-none'
						placeholder='Label for text input'
					/>
					<label
						htmlFor='text-input'
						className='absolute left-0 -top-4.5 px-2 text-stone-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-600 peer-focus:text-sm'
					>
						Label for text input
					</label>
				</form>
			</div>
		</>
	);
}
