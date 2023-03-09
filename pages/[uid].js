import Head from 'next/head';
import { SliceZone } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';

import { createClient } from '../prismicio';
import { components } from '../slices';
import { Layout } from '../components/Layout';
import { Bounded } from '../components/Bounded';
import { ArticlePreview } from '../components/ArticlePreview';
import { Pagination } from '../components/Pagination';

const Page = ({ page, navigation, settings, articles, products }) => {
	return (
		<Layout navigation={navigation} settings={settings}>
			<Head>
				<title>
					{prismicH.asText(page.data.title)} |{' '}
					{prismicH.asText(settings.data.name)}
				</title>
			</Head>

			<SliceZone slices={page.data.slices} components={components} />

			{page.uid === 'articles' && (
				<Bounded size="widest">
					<ul className="grid grid-cols-1 gap-16">
						{articles.map(article => (
							<ArticlePreview key={article.id} article={article} />
						))}
					</ul>
					<Pagination />
				</Bounded>
			)}

			{page.uid === 'products' && (
				<Bounded size="widest">
					<ul className="grid grid-cols-1 gap-16">
						{products.map(product => (
							<ArticlePreview key={product.id} article={product} />
						))}
					</ul>
					<Pagination />
				</Bounded>
			)}
		</Layout>
	);
};

export default Page;

export async function getStaticProps({ params, previewData }) {
	const client = createClient({ previewData });

	const page = await client.getByUID('page', params.uid);
	const navigation = await client.getSingle('navigation');
	const settings = await client.getSingle('settings');

	const articles = await client.getAllByType('article', {
		orderings: [
			{ field: 'my.article.publishDate', direction: 'desc' },
			{ field: 'document.first_publication_date', direction: 'desc' },
		],
	});

	const products = await client.getAllByType('product', {
		orderings: [{ field: 'my.product.title', direction: 'desc' }],
	});

	return {
		props: {
			page,
			navigation,
			settings,
			articles,
			products,
		},
	};
}

export async function getStaticPaths() {
	const client = createClient();

	const pages = await client.getAllByType('page');

	return {
		paths: pages.map(page => prismicH.asLink(page)),
		fallback: false,
	};
}
