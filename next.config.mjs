/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{ protocol: "https", hostname: "image.thum.io" },
			{ protocol: "https", hostname: "cdn.dribbble.com" },
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "www.notion.so" },
			{ protocol: "https", hostname: "notion.so" },
			{ protocol: "https", hostname: "secure.notion-static.com" },
			{ protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
			{ protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
		],
	},
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
