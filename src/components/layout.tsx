import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import {DefaultSeo} from 'next-seo';
import layoutData from '../../content/global/index.json';

import FbPage from './fb-page';

const EmailUs = dynamic(async () => import('./email-us'), {ssr: false});

type LogoProps = {
	logo?: string;
};

const Logo = ({logo}: LogoProps) => <div className="bg-no-repeat" style={{backgroundImage: `url(${logo})`, width: '200px', height: '111px'}} />

type BackgroundProps = {
	background?: string;
};

const Background = ({background}: BackgroundProps) => <div className="bg-black bg-no-repeat bg-fixed bg-top fixed inset-0" style={{backgroundImage: `url(${background})`}} />

type LayoutProps = {
	data: any;
	rawData: any;
	children: React.ReactNode;
};

const Layout = ({data = layoutData, children}: LayoutProps) => (
	<>
		<DefaultSeo
			title={data.seoDefaultTitle}
			titleTemplate={`%s | ${data.title as string}`}
			description={data.description}
			openGraph={{
				type: 'website',
				locale: 'en_AU',
				url: data.siteUrl,
				site_name: data.title
			}}
			twitter={{
				handle: data.social.twitterHandle,
				site: data.social.twitterHandle,
				cardType: 'summary_large_image'
			}}
		/>
		<Head>
			<meta name="theme-color" content="#FFEA00" />
		</Head>
		<div id="fb-root" />
		<script
			async
			defer
			crossOrigin="anonymous"
			src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v9.0"
			nonce="FQlOK0e0"
		/>
		<Background background={data.background} />
		<div className="relative container max-w-screen-lg mx-auto px-4 flex flex-wrap justify-between">
			<div className="mb-6">
				<Logo logo={data.logo} />
			</div>

			<div className="max-w-xs ml-auto bg-black bg-opacity-70 mt-96 p-5">
				<div className="prose prose-sm">
					{children}

					<hr />

					<FbPage />

					<hr />

					<p className="uppercase">
						<a href="http://bluehat.com.au/">
							<span className="text-gray-50">Website design by </span>Bluehat
						</a>
					</p>
				</div>
			</div>
		</div>
		<EmailUs />
	</>
);

export default Layout;

export const layoutQueryFragment = `
	getGlobalDocument(relativePath: "index.json") {
		id
		data {
			title
			logo
			background
			seoDefaultTitle
			description
			siteUrl
			keywords
			social {
				facebook
				twitter
				instagram
			}
		}
	}
`;
