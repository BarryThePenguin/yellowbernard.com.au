import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {DefaultSeo} from 'next-seo';
import styled, {createGlobalStyle} from 'styled-components';

import FbPage from './fb-page';

const EmailUs = dynamic(async () => import('./email-us'), {ssr: false});

type LogoProps = {
	logo?: string;
};

const Logo = styled.div<LogoProps>`
	background-image: url('${(props) => props.logo}');
	background-repeat: no-repeat;
	height: 111px;
	width: 200px;
`;

type BackgroundProps = {
	background?: string;
};

const Background = createGlobalStyle<BackgroundProps>`
	body {
		background-color: #000;
		background-image: url('${(props) => props.background}');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: top center;
	}
`;

type LayoutProps = {
	data: any;
	children: React.ReactNode;
};

const Layout = ({data, children}: LayoutProps) => {
	return (
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
			<div className="container max-w-screen-lg mx-auto px-4 flex flex-wrap justify-between">
				<Background background={data.background} />
				<div className="mb-6">
					<Logo logo={data.logo} />
				</div>

				<div className="max-w-xs ml-auto bg-black bg-opacity-70 p-5">
					<div className="prose prose-sm ">
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
};

export default Layout;

export const layoutQueryFragment = `
	getGlobalDocument(relativePath: "index.json") {
		id
		data {
			title
			logo
			background
			seoDefaultTitle
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
