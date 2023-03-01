import * as prismicH from '@prismicio/helpers';
import { PrismicLink, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import { Heading } from './Heading';
import { HorizontalDivider } from './HorizontalDivider';

export const Banner = ({ name, description, banner }) => {
	return (
		<div className="px-6 py-8 md:py-10 md:px-6 lg:py-12">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
				<div className="relative flex h-40 w-40 items-center overflow-hidden rounded-full bg-slate-300">
					{prismicH.isFilled.image(banner) && (
						<PrismicNextImage
							field={banner}
							fill={true}
							className="object-cover"
						/>
					)}
				</div>
				{(prismicH.isFilled.richText(name) ||
					prismicH.isFilled.richText(description)) && (
					<div className="grid grid-cols-1 gap-2 text-center">
						{prismicH.isFilled.richText(name) && (
							<Heading>
								<PrismicLink href="/">
									<PrismicText field={name} />
								</PrismicLink>
							</Heading>
						)}
						{prismicH.isFilled.richText(description) && (
							<p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
								<PrismicText field={description} />
							</p>
						)}
					</div>
				)}
				<HorizontalDivider />
			</div>
		</div>
	);
};
