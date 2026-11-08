import {AppProps} from 'next/app';
import Head from 'next/head';
import {ThemeProvider, useTheme} from 'next-themes';
import {Spectral} from 'next/font/google';

import Layout from '../components/Layout';
import personalInfo from '../components/data/personalInfo.json';
import GoogleTag from '../components/GoogleTag';

import { Analytics } from "@vercel/analytics/react";

import 'tailwindcss/tailwind.css';
import '../styles/theme-transition.css';
import '../styles/robot-chase.css';

// Site-wide typeface: Spectral Medium (500) for body text, with 600/700 loaded
// so existing font-semibold / font-bold headings use real weights, not faux bold.
const spectral = Spectral({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	style: ['normal', 'italic'],
	display: 'swap',
});

const App = ({Component, pageProps}: Readonly<AppProps>): JSX.Element => {
	const {resolvedTheme} = useTheme();

	return (
		<ThemeProvider attribute="class" disableTransitionOnChange>
			<style jsx global>{`
				html, body {
					font-family: ${spectral.style.fontFamily};
					font-weight: 500;
				}
			`}</style>
			<GoogleTag/>
			<Head>
				<title>{personalInfo.title}</title>
				<link rel="canonical" href={personalInfo.domain}/>
				<link rel="icon" href="/favicon/favicon.ico"/>
				<meta name="description" content={personalInfo.name+"'s personal website"}/>
				<meta property="og:description" content={personalInfo.name+"'s personal website"}/>
				<meta property="og:image" content="/favicon/favicon.ico"/>
				<meta property="og:locale" content="en_US"/>
				<meta property="og:type" content="website"/>
			</Head>
			<Layout>
				<main className="flex flex-col m-auto leading max-w-4xl items-start p-5">
					<Component {...pageProps}/>
				</main>
			</Layout>
			<Analytics />
		</ThemeProvider>
	);
};

export default App;
