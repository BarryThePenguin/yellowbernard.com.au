import React from 'react'
import {GetStaticProps} from 'next'
import {usePlugin} from 'tinacms'
import {getGithubPreviewProps, parseJson} from 'next-tinacms-github'
import {useGithubJsonForm, useGithubToolbarPlugins} from 'react-tinacms-github'
import {InlineForm, InlineTextarea, InlineText} from 'react-tinacms-inline'
import Layout from '../components/layout'

const formOptions = {
	label: 'Home Page',
	fields: [
		{
			name: 'description',
			component: 'textarea',
			label: 'Description',
		},
		{
			name: 'openingTimes',
			component: 'text',
			label: 'Opening Times',
		},
		{
			name: 'address',
			component: 'text',
			label: 'Address',
		},
		{
			name: 'phone',
			component: 'text',
			label: 'Phone Number',
		},
	],
}

type IndexProps = {
	file: any
}

const Index = ({file}: IndexProps) => {
	const [, form] = useGithubJsonForm(file, formOptions)
	usePlugin(form)
	useGithubToolbarPlugins()

	return (
		<Layout>
			<InlineForm form={form}>
				<hr />

				<InlineTextarea name="description" />

				<hr />

				<InlineText name="openingTimes" />

				<InlineText name="address" />

				<InlineText name="phone" />
			</InlineForm>
		</Layout>
	)
}

export default Index

export const getStaticProps: GetStaticProps<IndexProps> = async function ({
	preview,
	previewData,
	...ctx
}) {
	if (preview) {
		return getGithubPreviewProps({
			...previewData,
			fileRelativePath: 'src/content/home.json',
			parse: parseJson,
		})
	}

	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: 'src/content/home.json',
				data: (await import('../content/home.json')).default,
			},
		},
	}
}
