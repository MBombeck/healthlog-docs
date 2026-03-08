// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.healthlog.dev',
	redirects: {
		'/': '/getting-started/introduction',
	},
	integrations: [
		starlight({
			title: 'HealthLog',
			description: 'Self-hosted health tracking PWA — documentation',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/MBombeck/HealthLog' },
			],
			editLink: {
				baseUrl: 'https://github.com/MBombeck/healthlog-docs/edit/main/',
			},
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			expressiveCode: {
				themes: ['dracula', 'github-light'],
				styleOverrides: {
					borderRadius: '0.5rem',
				},
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ slug: 'getting-started/introduction' },
						{ slug: 'getting-started/installation' },
						{ slug: 'getting-started/quick-start' },
						{ slug: 'getting-started/troubleshooting' },
					],
				},
				{
					label: 'Features',
					items: [
						{ slug: 'features/health-metrics' },
						{ slug: 'features/medications' },
						{ slug: 'features/notifications' },
						{ slug: 'features/ai-insights' },
						{ slug: 'features/integrations' },
						{ slug: 'features/mood-tracking' },
						{ slug: 'features/pwa-offline' },
						{ slug: 'features/doctor-report' },
						{ slug: 'features/gamification' },
						{ slug: 'features/export-import' },
					],
				},
				{
					label: 'Configuration',
					items: [
						{ slug: 'configuration/environment-variables' },
						{ slug: 'configuration/admin-settings' },
						{ slug: 'configuration/monitoring' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ slug: 'architecture/overview' },
						{ slug: 'architecture/database' },
						{ slug: 'architecture/background-jobs' },
					],
				},
				{
					label: 'API Reference',
					collapsed: true,
					items: [
						{ slug: 'api/overview' },
						{ slug: 'api/authentication' },
						{ slug: 'api/measurements' },
						{ slug: 'api/medications' },
						{ slug: 'api/mood' },
						{ slug: 'api/insights' },
						{ slug: 'api/notifications' },
						{ slug: 'api/integrations' },
						{ slug: 'api/admin' },
						{ slug: 'api/external-ingest' },
					],
				},
				{
					label: 'Security',
					items: [
						{ slug: 'security/overview' },
						{ slug: 'security/self-hosting' },
					],
				},
				{
					label: 'Self-Hosting',
					items: [
						{ slug: 'self-hosting/docker' },
						{ slug: 'self-hosting/reverse-proxy' },
						{ slug: 'self-hosting/updates' },
					],
				},
			],
		}),
	],
});
