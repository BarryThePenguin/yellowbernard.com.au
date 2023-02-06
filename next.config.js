import process from 'node:process';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
	images: {
		domains: ['assets.tina.io'],
	},
	i18n: {
		locales: ['en-AU'],
		defaultLocale: 'en-AU',
	},
	rewrites() {
		return [
			{
				source: '/admin',
				destination: '/admin/index.html',
			},
		];
	},
});
