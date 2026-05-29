// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://docs.healthlog.dev',
	redirects: {
		'/': '/getting-started/introduction',
	},
	integrations: [
		sitemap(),
		starlight({
			title: 'HealthLog',
			description: 'Self-hosted health tracking PWA — documentation',
			head: [
				{
					tag: 'meta',
					attrs: { property: 'og:site_name', content: 'HealthLog Docs' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://docs.healthlog.dev/og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://docs.healthlog.dev/og-image.png' },
				},
			],
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
					label: 'iOS App',
					items: [
						{ slug: 'ios/ios-app' },
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
						{ slug: 'features/achievements-hidden' },
						{ slug: 'features/export-import' },
						{ slug: 'features/dashboard-customization' },
					],
				},
				{
					label: 'Integrations',
					items: [
						{ slug: 'integrations/apple-health' },
						{ slug: 'integrations/withings' },
						{ slug: 'integrations/ai-providers' },
					],
				},
				{
					label: 'Concepts',
					items: [
						{ slug: 'concepts/source-priority' },
					],
				},
				{
					label: 'Insights',
					items: [
						{ slug: 'insights/how-it-works' },
					],
				},
				{
					label: 'Dashboard',
					items: [
						{ slug: 'dashboard/comparison' },
					],
				},
				{
					label: 'Settings',
					items: [
						{ slug: 'settings/ai-providers' },
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
						{ slug: 'api/native-clients' },
					],
				},
				{
					label: 'Security',
					items: [
						{ slug: 'security/overview' },
						{ slug: 'security/self-hosting' },
						{ slug: 'security/certificate-pinning' },
					],
				},
				{
					label: 'Self-Hosting',
					items: [
						{ slug: 'self-hosting/docker' },
						{ slug: 'self-hosting/reverse-proxy' },
						{ slug: 'self-hosting/tls-certificates' },
						{ slug: 'self-hosting/updates' },
						{ slug: 'self-hosting/scaling' },
						{ slug: 'self-hosting/coolify' },
					],
				},
				{
					label: 'Admin',
					items: [
						{ slug: 'admin/backups' },
					],
				},
				{
					label: 'Account',
					items: [
						{ slug: 'account/data-deletion' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ slug: 'contributing/branch-model' },
					],
				},
			],
		}),
	],
});
