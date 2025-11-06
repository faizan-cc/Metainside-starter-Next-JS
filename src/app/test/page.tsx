export default function TestPage() {
  console.log('🧪 Test page is rendering');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🧪 Test Page</h1>
      <p>If you can see this, routing is working!</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  );
}