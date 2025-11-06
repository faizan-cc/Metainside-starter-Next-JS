console.log('🔥 MINIMAL LAYOUT LOADING');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('🔥 LAYOUT RENDERING');
  return (
    <html>
      <body>
        <div id="debug">🔧 Minimal Layout Active</div>
        {children}
      </body>
    </html>
  );
}
