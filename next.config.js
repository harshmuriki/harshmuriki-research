const nextConfig = {
	poweredByHeader: false,
	swcMinify: true,
	// Enable static HTML export with the App Router
	output: 'export',
	// Ensure compatibility if using next/image
	images: { unoptimized: true },
};

module.exports = nextConfig;

