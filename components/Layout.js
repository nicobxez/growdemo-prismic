import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ navigation, settings, withSignUpForm, children }) => {
	return (
		<div className="text-slate-700">
			<Header navigation={navigation} />
			<main>{children}</main>
			<Footer withSignUpForm={withSignUpForm} settings={settings} />
		</div>
	);
};
