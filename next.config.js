const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
	images: {
		domains: ['res.cloudinary.com']
	},
	i18n: {
		locales: ['en-AU'],
		defaultLocale: 'en-AU'
	}
});
