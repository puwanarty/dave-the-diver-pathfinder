import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Head>
				<title>DAVE THE DIVER | Pathfinder</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</React.Fragment>
	)
}
