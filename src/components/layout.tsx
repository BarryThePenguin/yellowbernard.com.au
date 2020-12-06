import React from 'react'

const Layout = ({children}) => {
	return (
		<div>
			<div id="logo-wrapper">
				<div id="logo" />
			</div>

			<div id="column-wrapper">
				<div id="column">
					{children}

					<p>
						<a href="https://yellowbernard.com.au/#" id="email-link">
							EMAIL US
						</a>
					</p>

					<form
						method="post"
						action="https://yellowbernard.com.au/index.php"
						id="email-form"
					>
						<input type="hidden" name="send" value="1" />

						<div>
							<label>NAME</label>
							<input type="text" name="name" id="name" />
						</div>

						<div>
							<label>EMAIL</label>
							<input type="text" name="email" id="email" />
						</div>

						<div>
							<label>PHONE</label>
							<input type="text" name="phone" id="phone" />
						</div>

						<div>
							<label>MESSAGE</label>
							<textarea name="message" id="message" />
						</div>

						<div>
							<input
								type="submit"
								name="send-button"
								id="send-button"
								className="button"
								value="SEND"
							/>
						</div>
					</form>

					<hr />

					<img
						src="./Yellow Bernard_files/map.png"
						alt="Map to Yellow Bernard"
						width="238"
						height="164"
					/>

					<hr />

					<p>
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
					</p>

					<hr />

					<p>
						<a href="http://bluehat.com.au/">
							<span>WEBSITE DESIGN BY </span>BLUEHAT
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Layout
