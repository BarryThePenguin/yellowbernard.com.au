import {defineConfig} from 'tinacms';

const branch =
	process.env.NEXT_PUBLIC_TINA_BRANCH ||
	process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	'';

export default defineConfig({
	branch,
	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '',
	token: process.env.TINA_TOKEN ?? '',
	media: {
		tina: {
			publicFolder: 'public',
			mediaRoot: 'uploads',
		},
	},
	schema: {
		collections: [
			{
				label: 'Pages',
				name: 'pages',
				path: 'content/pages',
				format: 'json',
				ui: {
					router: ({document}) => {
						if (document._sys.filename === 'home') {
							return `/`;
						}

						return undefined;
					},
				},
				fields: [
					{
						name: 'description',
						label: 'Description',
						type: 'string',
						ui: {
							component: 'textarea',
						},
					},
					{
						name: 'openingTimes',
						label: 'Opening Times',
						type: 'string',
						ui: {
							component: 'text',
						},
					},
					{
						name: 'address',
						label: 'Address',
						type: 'string',
						ui: {
							component: 'text',
						},
					},
					{
						name: 'phone',
						label: 'Phone Number',
						type: 'string',
						ui: {
							component: 'text',
						},
					},
					{
						label: 'Background Image',
						name: 'background',
						type: 'image',
						ui: {
							component: 'image',
						},
					},
					{
						label: 'Map Image',
						name: 'map',
						type: 'image',
						ui: {
							component: 'image',
						},
					},
				],
			},
			{
				label: 'Global',
				name: 'global',
				path: 'content/global',
				format: 'json',
				ui: {
					global: true,
				},
				fields: [
					{
						name: 'title',
						label: 'Title',
						type: 'string',
						required: true,
						ui: {
							component: 'text',
						},
					},
					{
						label: 'Logo Image',
						name: 'logo',
						type: 'image',
						ui: {
							component: 'image',
						},
					},
					{
						label: 'Background Image',
						name: 'background',
						type: 'image',
						ui: {
							component: 'image',
						},
					},
					{
						name: 'seoDefaultTitle',
						label: 'SEO Default Title',
						type: 'string',
						required: true,
						ui: {
							component: 'text',
						},
					},
					{
						name: 'description',
						label: 'Description',
						type: 'string',
						required: true,
						ui: {
							component: 'text',
						},
					},

					{
						name: 'siteUrl',
						label: 'Site Url',
						type: 'string',
						required: true,
						ui: {
							component: 'text',
						},
					},
					{
						name: 'keywords',
						label: 'Keywords',
						type: 'string',
						ui: {
							component: 'text',
						},
					},
					{
						type: 'object',
						label: 'Social Links',
						name: 'social',
						fields: [
							{
								type: 'string',
								label: 'Facebook',
								name: 'facebook',
							},
							{
								type: 'string',
								label: 'Twitter',
								name: 'twitter',
							},
							{
								type: 'string',
								label: 'Instagram',
								name: 'instagram',
							},
						],
					},
				],
			},
		],
	},
});
