import express from 'express';
import router from './routes/index.js';

const app = express();

// Use the defined routes
app.use('/', router);

// Start the server on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
