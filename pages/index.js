import Head from 'next/head';
import * as prismicH from '@prismicio/helpers';

import { createClient } from '../prismicio';
import { Layout } from '../components/Layout';
import { Banner } from '../components/Banner';
import { Bounded } from '../components/Bounded';
import { ArticlePreview } from '../components/ArticlePreview';

const Index = ({ articles, navigation, settings }) => {
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
					<ul className="grid grid-cols-1 gap-16">
						{articles.map(article => (
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

	const articles = await client.getAllByType('article', {
		orderings: [
			{ field: 'my.article.publishDate', direction: 'desc' },
			{ field: 'document.first_publication_date', direction: 'desc' },
		],
	});
	const navigation = await client.getSingle('navigation');
	const settings = await client.getSingle('settings');

	return {
		props: {
			articles,
			navigation,
			settings,
		},
	};
}
