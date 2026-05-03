// This is a Vercel serverless function that handles all requests
// It delegates to the TanStack Start server

// Import the built server (this will be dynamically required at runtime)
let serverModule

async function getServer() {
  if (!serverModule) {
    serverModule = await import('../dist/server/server.js')
  }
  return serverModule.default
}

export default async (req, res) => {
  try {
    const server = await getServer()
    
    // Build the URL from the request
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    
    // Create a fetch Request object
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
    })
    
    // Call the server's fetch handler
    const response = await server.fetch(request)
    
    // Set response status
    res.statusCode = response.status
    
    // Copy headers from the response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })
    
    // Handle the response body
    if (response.body) {
      const reader = response.body.getReader()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          res.write(value)
        }
      } finally {
        reader.releaseLock()
      }
    }
    
    res.end()
  } catch (error) {
    console.error('Server error:', error)
    res.statusCode = 500
    res.end(JSON.stringify({ error: 'Internal Server Error' }))
  }
}

