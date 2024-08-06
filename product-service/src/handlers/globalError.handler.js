function globalErrorHandler(err, req, res) {
  console.error("Error stack", err.stack);
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Something went wrong!' }));
}

module.exports = globalErrorHandler;
