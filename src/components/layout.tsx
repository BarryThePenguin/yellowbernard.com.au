import React from 'react';
import dynamic from 'next/dynamic';
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
	logo?: string;
	background?: string;
	children: React.ReactNode;
};

const Layout = ({logo, background, children}: LayoutProps) => {
	return (
		<>
			<div className="container max-w-screen-lg mx-auto px-4 flex flex-wrap justify-between">
				<Background background={background} />
				<div className="mb-6">
					<Logo logo={logo} />
				</div>

				<div className="w-min ml-auto bg-black bg-opacity-70 p-5">
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
