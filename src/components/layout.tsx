import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

type LogoProps = {
	logo?: string;
};

const Logo = styled.div<LogoProps>`
	position: relative;
	left: -460px;
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
		<div>
			<Background background={background} />
			<div id="logo-wrapper">
				<Logo id="logo" logo={logo} />
			</div>

			<div id="column-wrapper">
				<div id="column">
					{children}

					<hr />

					<div
						className="fb-page"
						data-href="https://www.facebook.com/yellowbernard"
						data-tabs="timeline"
						data-width="238"
						data-height=""
						data-small-header="true"
						data-adapt-container-width="true"
						data-hide-cover="false"
						data-show-facepile="true"
					>
						<blockquote
							cite="https://www.facebook.com/yellowbernard"
							className="fb-xfbml-parse-ignore"
						>
							<a href="https://www.facebook.com/yellowbernard">
								Yellow Bernard
							</a>
						</blockquote>
					</div>

					<hr />

					<p>
						<a href="http://bluehat.com.au/">
							<span>WEBSITE DESIGN BY </span>BLUEHAT
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Layout;
