import {AppProps} from 'next/app';
import TinaCMS from 'tinacms';
import {TinaCloudCloudinaryMediaStore} from 'next-tinacms-cloudinary';

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
	process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true;

type TinaProps = {
	pageProps: AppProps['pageProps'];
	children: (livePageProps: AppProps['pageProps']) => React.ReactNode;
};

const Tina = ({children, pageProps}: TinaProps) => (
	<TinaCMS
		clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
		branch="main"
		organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
		isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
		mediaStore={TinaCloudCloudinaryMediaStore}
		{...pageProps}
	>
		{(livePageProps: AppProps['pageProps']) => children(livePageProps)}
	</TinaCMS>
);

export default Tina;
