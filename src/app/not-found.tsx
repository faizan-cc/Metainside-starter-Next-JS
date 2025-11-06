export default function NotFound() {
  console.log('🚫 NOT FOUND PAGE IS RENDERING');
  console.log('🔍 This means Next.js could not find the requested route');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#ffe6e6' }}>
      <h1>🚫 404 - Page Not Found</h1>
      <p>The requested page could not be found.</p>
      <p>Current time: {new Date().toISOString()}</p>
      <p>Check the console for debug information.</p>
    </div>
  );
}