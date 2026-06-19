// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.healthlog.dev',
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
						{ slug: 'getting-started/self-host-in-10-minutes' },
						{ slug: 'getting-started/first-steps' },
						{ slug: 'getting-started/connect-ios-app' },
					],
				},
				{
					label: 'How-to Guides',
					items: [
						{ slug: 'guides/connect-withings' },
						{ slug: 'guides/connect-whoop' },
						{ slug: 'guides/connect-google-health' },
						{ slug: 'guides/import-apple-health' },
						{ slug: 'guides/source-priority' },
						{ slug: 'guides/track-medications' },
						{ slug: 'guides/reminder-channels' },
						{ slug: 'guides/ai-providers' },
						{ slug: 'guides/backups' },
						{ slug: 'guides/encryption-key-rotation' },
						{ slug: 'guides/invites' },
						{ slug: 'guides/reverse-proxy' },
						{ slug: 'guides/updates-and-deploy' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ slug: 'reference/api-overview' },
						{ slug: 'reference/api-endpoints' },
						{ slug: 'reference/environment-variables' },
						{ slug: 'reference/data-model' },
						{ slug: 'reference/fhir-api' },
						{ slug: 'reference/webhooks' },
					],
				},
				{
					label: 'Explanation',
					items: [
						{ slug: 'explanation/medication-compliance' },
						{ slug: 'explanation/health-scores' },
						{ slug: 'explanation/source-priority' },
						{ slug: 'explanation/encryption-at-rest' },
						{ slug: 'explanation/privacy-architecture' },
						{ slug: 'explanation/blood-pressure-targets' },
						{ slug: 'explanation/no-markdown-in-coach' },
						{ slug: 'explanation/timezone-model' },
					],
				},
				{
					label: 'Health Knowledge',
					items: [
						{ slug: 'knowledge' },
						{ slug: 'knowledge/blood-pressure' },
						{ slug: 'knowledge/resting-heart-rate' },
						{ slug: 'knowledge/hrv' },
						{ slug: 'knowledge/glucose-hba1c' },
						{ slug: 'knowledge/weight-bmi' },
						{ slug: 'knowledge/body-composition' },
						{ slug: 'knowledge/sleep' },
						{ slug: 'knowledge/spo2' },
						{ slug: 'knowledge/respiratory-rate' },
						{ slug: 'knowledge/temperature' },
						{ slug: 'knowledge/vo2max-activity' },
						{ slug: 'knowledge/menstrual-cycle' },
						{ slug: 'knowledge/mood' },
					],
				},
				{
					label: 'Reference material',
					items: [
						{ slug: 'features' },
						{ slug: 'license' },
					],
				},
			],
		}),
	],
});
