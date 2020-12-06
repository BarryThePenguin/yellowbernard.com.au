import React from 'react';
import {GetStaticProps} from 'next';
import {usePlugin, Media} from 'tinacms';
import styled from 'styled-components';
import {getGithubPreviewProps, parseJson} from 'next-tinacms-github';
import {useGithubJsonForm, useGithubToolbarPlugins} from 'react-tinacms-github';
import Layout from '../components/layout';

const AboutUs = styled.div`
	text-transform: uppercase;
`;

const formOptions = {
	label: 'Home Page',
	fields: [
		{
			name: 'description',
			component: 'textarea',
			label: 'Description'
		},
		{
			name: 'openingTimes',
			component: 'text',
			label: 'Opening Times'
		},
		{
			name: 'address',
			component: 'text',
			label: 'Address'
		},
		{
			name: 'phone',
			component: 'text',
			label: 'Phone Number'
		},
		{
			label: 'Map Image',
			name: 'map',
			component: 'image',
			parse: (media: Media) => `/static/${media.filename}`,
			uploadDir: () => '/public/static/',
			previewSrc: (fullSrc: string) => fullSrc.replace('/public', '')
		}
	]
};

type IndexProps = {
	file: any;
};

const Index = ({file}: IndexProps) => {
	const [data, form] = useGithubJsonForm(file, formOptions);
	usePlugin(form);
	useGithubToolbarPlugins();

	return (
		<Layout>
			<hr />

			<p>{data.description}</p>

			<hr />

			<AboutUs>
				<p>{data.openingTimes}</p>

				<p>{data.address}</p>

				<p>{data.phone}</p>

				<p>
					<a href="#" id="email-link">
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
			</AboutUs>

			<hr />

			<img
				src={data.map}
				alt="Map to Yellow Bernard"
				width="238"
				height="164"
			/>
		</Layout>
	);
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async function ({
	preview,
	previewData,
	...ctx
}) {
	if (preview) {
		return getGithubPreviewProps({
			...previewData,
			fileRelativePath: 'src/content/home.json',
			parse: parseJson
		});
	}

	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: 'src/content/home.json',
				data: (await import('../content/home.json')).default
			}
		}
	};
};
