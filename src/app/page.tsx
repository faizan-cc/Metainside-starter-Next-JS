console.log('🔥 CLEAN PAGE.TSX LOADING');

export default function HomePage() {
  console.log('🔥 HOME PAGE RENDERING');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🏠 Debug Mode - Home Page</h1>
      <p>✅ This page is working!</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  );
}
