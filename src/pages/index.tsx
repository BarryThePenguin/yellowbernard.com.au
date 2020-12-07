import React from 'react';
import {GetStaticProps} from 'next';
import {usePlugin, Media} from 'tinacms';
import {getGithubPreviewProps, parseJson} from 'next-tinacms-github';
import {useGithubJsonForm, useGithubToolbarPlugins} from 'react-tinacms-github';
import Layout from '../components/layout';

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
			label: 'Logo Image',
			name: 'logo',
			component: 'image',
			parse: (media: Media) => `/static/${media.filename}`,
			uploadDir: () => '/public/static/',
			previewSrc: (fullSrc: string) => fullSrc.replace('/public', '')
		},
		{
			label: 'Background Image',
			name: 'map',
			component: 'background',
			parse: (media: Media) => `/static/${media.filename}`,
			uploadDir: () => '/public/static/',
			previewSrc: (fullSrc: string) => fullSrc.replace('/public', '')
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
		<Layout logo={data.logo} background={data.background}>
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
		</Layout>
	);
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async function ({
	preview,
	previewData
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
