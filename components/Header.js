import * as prismicH from '@prismicio/helpers';
import { PrismicLink, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import { Bounded } from './Bounded';

const NavItem = ({ children }) => {
	return (
		<li className="font-semibold tracking-tight text-slate-800">{children}</li>
	);
};

export const Header = ({ navigation, settings }) => {
	return (
		<Bounded as="header" size={false} className="md:py-8 lg:py-8">
			<div className="grid grid-cols-2 items-center gap-20">
				<div className="relative flex h-12 w-12 items-center overflow-hidden rounded-full bg-slate-300">
					<PrismicLink href="/">
						{prismicH.isFilled.image(settings.data.banner) && (
							<PrismicNextImage
								field={settings.data.banner}
								fill={true}
								className="object-cover"
							/>
						)}
					</PrismicLink>
				</div>
				<nav>
					<ul className="flex flex-wrap justify-end gap-10">
						<NavItem>
							<PrismicLink href="/">
								<PrismicText field={navigation.data.homepageLabel} />
							</PrismicLink>
						</NavItem>
						{navigation.data?.links.map(item => (
							<NavItem key={prismicH.asText(item.label)}>
								<PrismicLink field={item.link}>
									<PrismicText field={item.label} />
								</PrismicLink>
							</NavItem>
						))}
					</ul>
				</nav>
			</div>
		</Bounded>
	);
};
