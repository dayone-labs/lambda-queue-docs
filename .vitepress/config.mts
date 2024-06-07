import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
				text: 'Examples',
				link: '/examples',
				items: [
					{ text: 'Reminders', link: '/examples/reminders' },
					{ text: 'Delayed delete', link: '/examples/delete' },
					{ text: 'Monthly invoice', link: '/examples/invoices' },
					{ text: 'Periodic cleanup', link: '/examples/periodic-cleanup' },
					{ text: 'Webhooks', link: '/examples/webhooks' },
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
