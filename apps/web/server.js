import express from 'express';
import pickBy from 'lodash/pickBy.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(join(__dirname, 'dist')));

app.get('/env', (req, res) => {
    res.json(pickBy(process.env, (value, key) => key.startsWith('NX_')));
});

app.get('/**', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(port, function () {
    console.log('server running on port ' + port);
});
