import {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {TinaCloudCloudinaryMediaStore} from 'next-tinacms-cloudinary';
import {TinaEditProvider} from 'tinacms/dist/edit-state';
import Layout from '../components/layout';
import '../styles/style.css';

const TinaCMS = dynamic(async () => import('tinacms'), {ssr: false});

const App = ({Component, pageProps}: AppProps) => (
	<TinaEditProvider
		editMode={
			<TinaCMS
				clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
				branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
				organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
				isLocalClient={Boolean(
					Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true)
				)}
				mediaStore={TinaCloudCloudinaryMediaStore}
				{...pageProps}
			>
				{(livePageProps: AppProps['pageProps']) => (
					<Layout
						rawData={livePageProps}
						data={livePageProps.data?.getGlobalDocument?.data}
					>
						<Component {...livePageProps} />
					</Layout>
				)}
			</TinaCMS>
		}
	>
		<Layout rawData={pageProps} data={pageProps.data?.getGlobalDocument?.data}>
			<Component {...pageProps} />
		</Layout>
	</TinaEditProvider>
);

export default App;
