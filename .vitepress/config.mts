import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lastUpdated: true,
	metaChunk: true,
	head: [
		[
			'script',
			{
				async: 'true',
				'data-domain': 'docs.lambdaqueue.com',
				src: 'https://insights.dayone.pl/js/script.js',
			},
		],
	],
	title: 'LambdaQueue Docs',
	description: 'Schedules and Queues without infrastructure',
	sitemap: {
		hostname: 'https://docs.lambdaqueue.com',
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'SDKs', link: '/sdk' },
			{ text: 'Examples', link: '/examples' },
			{ text: 'API & Docs', link: '/docs' },
			{ text: 'Login', link: 'https://app.lambdaqueue.com' },
		],
		sidebar: [
			{
				text: 'API & Docs',
				collapsed: false,
				link: '/docs',
				items: [
					{ text: 'Quickstart', link: '/docs/quickstart' },
					{ text: 'Overview', link: '/docs/overview' },
					{ text: 'SDKs', link: '/docs/sdk' },
					{ text: 'API Reference', link: '/docs/api' },
				],
			},
			{
				text: 'Examples',
				collapsed: false,
				link: '/examples',
				items: [
					{ text: 'Reminders', link: '/examples/reminders' },
					{ text: 'Delayed delete', link: '/examples/delete' },
					{ text: 'Monthly invoice', link: '/examples/invoices' },
					{ text: 'Periodic cleanup', link: '/examples/cleanup' },
					{ text: 'Webhooks', link: '/examples/webhooks' },
				],
			},
			{
				text: 'External Links',
				collapsed: false,
				items: [
					{ text: 'Admin Panel', link: 'https://app.lambdaqueue.com' },
					{
						text: 'Roadmap',
						link: 'https://dayone-labs.notion.site/LambdaQueue-Roadmap-23da2d4416e84d008bdc4c31cbc1b9ec',
					},
					{ text: 'System Status', link: 'https://status.lambdaqueue.com' },
				],
			},
		],

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/dayone-labs/lambda-queue-client',
			},
		],
		footer: {
			copyright: '©2024 DayOne-Labs',
			message:
				'All examples are licensed under MIT. You can use them for free in your projects.',
		},
	},
})
