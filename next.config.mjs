/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,
	eslint: {
		// Temporarily ignore ESLint errors during builds
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Temporarily ignore TypeScript errors during builds
		ignoreBuildErrors: true,
	},

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
