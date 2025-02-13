/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,

	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			punycode: "punycode/",
		};
		return config;
	},
};

// Use export default for ES modules
export default nextConfig;
