// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://healthlog-docs.bombeck.io',
	integrations: [
		starlight({
			title: 'HealthLog',
			description: 'Self-hosted health tracking PWA — documentation',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Deutsch', lang: 'de' },
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
					label: 'Einstieg',
					items: [
						{ slug: 'getting-started/introduction' },
						{ slug: 'getting-started/installation' },
						{ slug: 'getting-started/quick-start' },
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
						{ slug: 'features/gamification' },
						{ slug: 'features/export-import' },
					],
				},
				{
					label: 'Konfiguration',
					items: [
						{ slug: 'configuration/environment-variables' },
						{ slug: 'configuration/admin-settings' },
					],
				},
				{
					label: 'Architektur',
					items: [
						{ slug: 'architecture/overview' },
						{ slug: 'architecture/database' },
						{ slug: 'architecture/background-jobs' },
					],
				},
				{
					label: 'API-Referenz',
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
					label: 'Sicherheit',
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
