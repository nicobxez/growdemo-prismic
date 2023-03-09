import Head from 'next/head';
import { PrismicLink, PrismicText, SliceZone } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';

import { createClient } from '../../prismicio';
import { components } from '../../slices';
import { Layout } from '../../components/Layout';
import { Bounded } from '../../components/Bounded';
import { Heading } from '../../components/Heading';
import { HorizontalDivider } from '../../components/HorizontalDivider';

const PopularProduct = ({ product }) => {
	return (
		<li>
			<h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
				<PrismicLink document={product}>
					<PrismicText field={product.data.title} />
				</PrismicLink>
			</h1>
			<p className="font-serif italic tracking-tighter text-slate-500">
				{`$${product.data.price}`}
			</p>
		</li>
	);
};

const Product = ({ product, popularProducts, navigation, settings }) => {
	return (
		<Layout navigation={navigation} settings={settings}>
			<Head>
				<title>
					{prismicH.asText(product.data.title)} |{' '}
					{prismicH.asText(settings.data.name)}
				</title>
			</Head>
			<Bounded>
				<PrismicLink
					href="/products"
					className="font-semibold tracking-tight text-slate-400"
				>
					&larr; Volver a tienda
				</PrismicLink>
			</Bounded>
			<article>
				<Bounded className="pb-0">
					<h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
						<PrismicText field={product.data.title} />
					</h1>
					<p className="font-serif italic tracking-tighter text-slate-500">
						{`$${product.data.price}`}
					</p>
				</Bounded>
				<SliceZone slices={product.data.slices} components={components} />
			</article>
			{popularProducts.length > 0 && (
				<Bounded>
					<div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
						<HorizontalDivider />
						<div className="w-full">
							<Heading size="2xl" className="mb-10">
								Productos populares
							</Heading>
							<ul className="grid grid-cols-1 gap-12">
								{popularProducts.map(product => (
									<PopularProduct key={product.id} product={product} />
								))}
							</ul>
						</div>
					</div>
				</Bounded>
			)}
		</Layout>
	);
};

export default Product;

export async function getStaticProps({ params, previewData }) {
	const client = createClient({ previewData });

	const product = await client.getByUID('product', params.uid);
	const popularProducts = await client.getAllByType('product', {
		limit: 4,
		orderings: [{ field: 'my.product.rating', direction: 'desc' }],
	});
	const navigation = await client.getSingle('navigation');
	const settings = await client.getSingle('settings');

	return {
		props: {
			product,
			popularProducts,
			navigation,
			settings,
		},
	};
}

export async function getStaticPaths() {
	const client = createClient();

	const products = await client.getAllByType('product');

	return {
		paths: products.map(product => prismicH.asLink(product)),
		fallback: false,
	};
}
