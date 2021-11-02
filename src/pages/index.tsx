import React from 'react';
import {GetStaticProps} from 'next';
import { getStaticPropsForTina } from "tinacms";
import { layoutQueryFragment } from "../components/layout";

type IndexProps = {
	data: any;
};

const Index = (props: IndexProps) => {
	const {data} = props.data.getPagesDocument
	
	return (
		<>
			<hr />

			<p>{data.description}</p>

			<hr />

			<div className="uppercase">
				<p>
					<span className="block">{data.openingTimes}</span>

					<span className="block">{data.address}</span>

					<span className="block">{data.phone}</span>

					<span className="block">
						<a href="#email-us" id="email-link">
							Email us
						</a>
					</span>
				</p>
			</div>

			<hr />

			<img
				src={data.map}
				alt="Map to Yellow Bernard"
				width="238"
				height="164"
			/>
		</>
	);
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async function () {
	const tinaProps = await getStaticPropsForTina({
		query: `#graphql
		query HomePage($relativePath: String!) {
			${layoutQueryFragment}
			getPagesDocument(relativePath: $relativePath) {
				id
				data {
					description
					openingTimes
					address
					phone
					background
					map
				}
			}
		}
		`,
		variables: {
			relativePath: "home.md"
		}
	});
	
	return {
		props: {
			...tinaProps,
		},
	};
};
