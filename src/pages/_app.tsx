import {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {TinaCloudCloudinaryMediaStore} from 'next-tinacms-cloudinary';
import {TinaEditProvider} from 'tinacms/dist/edit-state';
import Layout from '../components/layout';
import '../styles/style.css';

const TinaCMS = dynamic(async () => import('tinacms'), {ssr: false});

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true;

const App = ({Component, pageProps}: AppProps) => (
	<TinaEditProvider
		editMode={
			<TinaCMS
				clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
				branch="main"
				organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
				isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
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
