import Head from 'next/head';
import * as prismicH from '@prismicio/helpers';
import { PrismicText } from '@prismicio/react';
import { createClient } from '../prismicio';

import { Layout } from '../components/Layout';
import { Banner } from '../components/Banner';
import { Bounded } from '../components/Bounded';
import { ArticlePreview } from '../components/ArticlePreview';

const Index = ({ latestArticles, navigation, settings }) => {
	return (
		<>
			<Layout navigation={navigation} settings={settings}>
				<Head>
					<title>{prismicH.asText(settings.data.name)}</title>
				</Head>

				<Banner
					name={settings.data.name}
					description={settings.data.description}
					banner={settings.data.banner}
				/>

				<Bounded size="widest">
					<h2 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
						Novedades
					</h2>
					<hr className="mb-5 h-px w-full border-0 bg-slate-200" />
					<ul className="grid grid-cols-1 gap-16">
						{latestArticles.map(article => (
							<ArticlePreview key={article.id} article={article} />
						))}
					</ul>
				</Bounded>

				<Bounded size="widest">
					<h2 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
						Productos populares
					</h2>
					<hr className="mb-5 h-px w-full border-0 bg-slate-200" />
					<ul className="grid grid-cols-1 gap-16">
						{latestArticles.map(article => (
							<ArticlePreview key={article.id} article={article} />
						))}
					</ul>
				</Bounded>
			</Layout>
		</>
	);
};

export default Index;

export async function getStaticProps({ previewData }) {
	const client = createClient({ previewData });
	const latestArticles = await client.getAllByType('article', {
		limit: 3,
		orderings: [
			{ field: 'my.article.publishDate', direction: 'desc' },
			{ field: 'document.first_publication_date', direction: 'desc' },
		],
	});
	const navigation = await client.getSingle('navigation');
	const settings = await client.getSingle('settings');

	return {
		props: {
			latestArticles,
			navigation,
			settings,
		},
	};
}
