import React from 'react';
import App, {AppProps} from 'next/app';
import styled from 'styled-components';
import {TinaCMS, TinaProvider} from 'tinacms';
import {
	GithubClient,
	TinacmsGithubProvider,
	GithubMediaStore
} from 'react-tinacms-github';
import '../styles/style.css';

type SiteProps = {
	preview?: boolean;
};

const EditButton = styled.button`
	position: fixed;
	top: 10px;
	left: 10px;
`;

export default class Site extends App<AppProps<SiteProps>> {
	cms: TinaCMS;

	constructor(props: AppProps<SiteProps>) {
		super(props);

		const github = new GithubClient({
			proxy: '/api/proxy-github',
			authCallbackRoute: '/api/create-github-access-token',
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '',
			baseRepoFullName: process.env.NEXT_PUBLIC_REPO_FULL_NAME ?? '',
			baseBranch: process.env.NEXT_PUBLIC_BASE_BRANCH ?? ''
		});

		const enabled = Boolean(props.pageProps.preview);

		this.cms = new TinaCMS({
			enabled,
			apis: {
				github
			},
			media: new GithubMediaStore(github),
			sidebar: enabled,
			toolbar: enabled
		});
	}

	render() {
		const {Component, pageProps} = this.props;
		return (
			<TinaProvider cms={this.cms}>
				<TinacmsGithubProvider
					error={pageProps.error}
					onLogin={onLogin}
					onLogout={onLogout}
				>
					<div id="fb-root" />
					<script
						async
						defer
						crossOrigin="anonymous"
						src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v9.0"
						nonce="FQlOK0e0"
					/>
					<Component {...pageProps} />
					<Edit cms={this.cms} />
				</TinacmsGithubProvider>
			</TinaProvider>
		);
	}
}

const onLogin = async () => {
	const token = localStorage.getItem('tinacms-github-token') ?? null;
	const headers = new Headers();

	if (token) {
		headers.append('Authorization', 'Bearer ' + token);
	}

	const resp = await fetch(`/api/preview`, {headers});
	const data = await resp.json();

	if (resp.status === 200) {
		window.location.href = window.location.pathname;
	} else {
		throw new Error(data.message);
	}
};

const onLogout = async () => {
	return fetch(`/api/reset-preview`).then(() => {
		window.location.reload();
	});
};

export interface EditLinkProps {
	cms: TinaCMS;
}

export const Edit = ({cms}: EditLinkProps) => {
	return (
		<EditButton type="button" onClick={() => cms.toggle()}>
			{cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
		</EditButton>
	);
};
