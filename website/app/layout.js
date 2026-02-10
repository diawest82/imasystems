import '../styles/globals.css';

export const metadata = {
  title: 'IMA Systems Group',
  description: 'Intelligent Systems with Distributed Decision Making',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
