import * as prismicH from '@prismicio/helpers';
import { PrismicLink, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import { Heading } from './Heading';

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
});

const priceFormatter = new Intl.NumberFormat('de-DE');

const findFirstImage = slices => {
	const imageSlice = slices.find(slice => slice.slice_type === 'image');

	if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
		return imageSlice.primary.image;
	}
};

const getExcerpt = slices => {
	const text = slices
		.filter(slice => slice.slice_type === 'text')
		.map(slice => prismicH.asText(slice.primary.text))
		.join(' ');

	const excerpt = text.substring(0, 300);

	if (text.length > 300) {
		return excerpt.substring(0, excerpt.lastIndexOf(' ')) + '…';
	} else {
		return excerpt;
	}
};

export const ArticlePreview = ({ article }) => {
	const featuredImage =
		(prismicH.isFilled.image(article.data.featuredImage) &&
			article.data.featuredImage) ||
		findFirstImage(article.data.slices);
	const date = prismicH.asDate(
		article.data.publishDate || article.first_publication_date
	);
	const excerpt = getExcerpt(article.data.slices);

	return (
		<li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
			<PrismicLink document={article} tabIndex="-1">
				<div className="aspect-w-4 aspect-h-3 relative bg-gray-100">
					{prismicH.isFilled.image(featuredImage) && (
						<PrismicNextImage
							field={featuredImage}
							fill={true}
							className="object-cover"
						/>
					)}
				</div>
			</PrismicLink>
			<div className="grid grid-cols-1 gap-3 md:col-span-2">
				<Heading as="h2">
					<PrismicLink document={article}>
						<PrismicText field={article.data.title} />
					</PrismicLink>
				</Heading>
				<p className="font-serif italic tracking-tighter text-slate-500">
					{article.type === 'article'
						? dateFormatter.format(date)
						: `$${priceFormatter.format(article.data.price)}`}
				</p>
				{excerpt && (
					<p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
						{excerpt}
					</p>
				)}
			</div>
		</li>
	);
};
