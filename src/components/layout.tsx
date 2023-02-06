/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-constant-binary-expression */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {DefaultSeo} from 'next-seo';
import type {GlobalPartsFragment} from '../../.tina/__generated__/types';

import {Facebook, Instagram, Twitter} from './icons';

const EmailUs = dynamic(async () => import('./email-us'), {ssr: false});

type LayoutProps = {
	background?: string | null;
	data: GlobalPartsFragment;
	children: React.ReactNode;
};

function Layout({background, data, children}: LayoutProps) {
	background = background ?? data.background;

	return (
		<>
			<DefaultSeo
				title={data.seoDefaultTitle}
				titleTemplate={`%s | ${data.title}`}
				description={data.description}
				openGraph={{
					type: 'website',
					locale: 'en_AU',
					url: data.siteUrl,
					siteName: data.title,
				}}
				twitter={
					data.social?.twitter
						? {
								handle: data.social.twitter,
								site: data.social.twitter,
								cardType: 'summary_large_image',
						  }
						: undefined
				}
			/>
			<Head>
				<meta name="theme-color" content="#FFEA00" />
			</Head>

			{background && (
				<div className="fixed h-screen w-screen">
					<Image fill src={background} style={{objectFit: 'cover'}} alt="" />
				</div>
			)}

			<div className="relative bg-gradient-to-t via-black from-black">
				{data.logo && (
					<div className="container lg:max-w-screen-lg mx-auto mb-48">
						<Image src={data.logo} width="200" height="111" alt={data.title} />
					</div>
				)}

				<div className="container mx-auto flex justify-center px-4">
					<div className="mt-48 mb-10 p-5">
						<div className="prose prose-xl text-center">
							{children}

							<hr />

							<p className="space-x-4">
								{data.social?.instagram && (
									<a
										href={data.social.instagram}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`${data.title} on Instagram`}
									>
										<Instagram />
									</a>
								)}

								{data.social?.facebook && (
									<a
										href={data.social?.facebook}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`${data.title} on Facebook`}
									>
										<Facebook />
									</a>
								)}

								{data.social?.twitter && (
									<a
										href={data.social?.twitter}
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
}

export default Layout;
