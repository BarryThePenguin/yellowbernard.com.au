import {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {TinaEditProvider} from 'tinacms/dist/edit-state';
import Layout from '../components/layout';
import '../styles/style.css';

const Tina = dynamic(async () => import('../components/tina'), {ssr: false});

const App = ({Component, pageProps}: AppProps) => (
	<TinaEditProvider
		editMode={
			<Tina pageProps={pageProps}>
				{(livePageProps) => (
					<Layout
						rawData={livePageProps}
						data={livePageProps.data?.getGlobalDocument?.data}
					>
						<Component {...livePageProps} />
					</Layout>
				)}
			</Tina>
		}
	>
		<Layout rawData={pageProps} data={pageProps.data?.getGlobalDocument?.data}>
			<Component {...pageProps} />
		</Layout>
	</TinaEditProvider>
);

export default App;
