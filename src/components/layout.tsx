import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {DefaultSeo} from 'next-seo';
import layoutData from '../../content/global/index.json';

import {Facebook, Instagram, Twitter} from './icons';

const EmailUs = dynamic(async () => import('./email-us'), {ssr: false});

type LayoutProps = {
	data: any;
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

		<div className="fixed h-screen w-screen">
			<Image src={data.background} layout="fill" objectFit="cover" alt="" />
		</div>

		<div className="container lg:max-w-screen-lg mx-auto mb-48">
			<Image src={data.logo} width="200px" height="111px" alt={data.title} />
		</div>

		<div className="relative bg-gradient-to-t via-black from-black">
			<div className="container mx-auto flex justify-center px-4">
				<div className="mt-48 mb-10 p-5">
					<div className="prose prose-xl text-center">
						{children}

						<hr />

						<p className="space-x-4">
							{data.social.instagram && (
								<a
									href={data.social.instagram}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${data.title} on Instagram`}
								>
									<Instagram />
								</a>
							)}

							{data.social.facebook && (
								<a
									href={data.social.facebook}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${data.title} on Facebook`}
								>
									<Facebook />
								</a>
							)}

							{data.social.twitter && (
								<a
									href={data.social.twitter}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${data.title} on Twitter`}
								>
									<Twitter />
								</a>
							)}
						</p>

						{false && <hr />}

						{false && (
							<p className="uppercase">
								<a href="http://bluehat.com.au/">
									<span className="text-gray-50">Website design by </span>
									Bluehat
								</a>
							</p>
						)}
					</div>
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
