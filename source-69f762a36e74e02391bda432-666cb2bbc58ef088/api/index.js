// Vercel serverless function handler for TanStack Start SSR server
let server;

async function getServer() {
  if (!server) {
    try {
      const mod = await import('../dist/server/server.js');
      server = mod.default;
      console.log('Server loaded successfully');
    } catch (err) {
      console.error('Failed to load server:', err);
      throw err;
    }
  }
  return server;
}

export default async (req, res) => {
  try {
    const srv = await getServer();
    
    // Build the request URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);

    // Create a fetch-compatible request
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
    });

    // Get the response from the server
    const response = await srv.fetch(request);

    // Set response status and headers
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Stream or send the response body
    if (response.body) {
      const reader = response.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(Buffer.from(value));
        }
      } finally {
        reader.releaseLock();
      }
    }

    res.end();
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Internal Server Error',
      message: error?.message || 'Unknown error'
    }));
  }
}

