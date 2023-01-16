import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../context/state';
import { Layout } from '../components';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppWrapper>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppWrapper>
	);
}
