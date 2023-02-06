import {type GetStaticProps} from 'next';
import Image from 'next/image';
import {useTina} from 'tinacms/dist/react';
import Layout from '../components/layout';
import {client} from '../../.tina/__generated__/client';
import type {
	PageQueryQuery,
	PageQueryQueryVariables,
} from '../../.tina/__generated__/types';

type IndexProps = {
	data: PageQueryQuery;
	query: string;
	variables: PageQueryQueryVariables;
};

function Index(props: IndexProps) {
	const {data} = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	return (
		<Layout background={data.pages.background} data={data.global}>
			<hr />

			<p>{data.pages.description}</p>

			<hr />

			<div className="uppercase">
				<p>
					<span className="block">{data.pages.openingTimes}</span>

					<span className="block">{data.pages.address}</span>

					<span className="block">{data.pages.phone}</span>

					<span className="block">
						<a href="#email-us" id="email-link">
							Email us
						</a>
					</span>
				</p>
			</div>

			<hr />

			{data.pages.map && (
				<Image
					src={data.pages.map}
					alt="Map to Yellow Bernard"
					width="238"
					height="164"
				/>
			)}
		</Layout>
	);
}

export default Index;

export const getStaticProps: GetStaticProps<Partial<IndexProps>> =
	async function () {
		let pageProps = {};

		try {
			pageProps = await client.queries.pageQuery({relativePath: 'home.json'});
		} catch {}

		return {
			props: {
				...pageProps,
			},
		};
	};
