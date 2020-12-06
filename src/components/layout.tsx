import React from 'react';

const Layout = ({children}) => {
	return (
		<div>
			<div id="logo-wrapper">
				<div id="logo" />
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
