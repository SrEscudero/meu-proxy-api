const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Rota principal da nossa API proxy
app.post('/api/verificar', async (req, res) => {
    const apiKey = req.query.chave;
    const numeros = req.body;

    if (!apiKey) {
        return res.status(400).json({ error: 'Chave da API não fornecida.' });
    }
    if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
        return res.status(400).json({ error: 'A lista de números é inválida ou vazia.' });
    }

    console.log(`Recebida consulta para ${numeros.length} números com a chave: ...${apiKey.slice(-4)}`);

    try {
        const apiUrl = `https://sms.witi.me/izdata/hlr.aspx?chave=${apiKey}`;
        const apiResponse = await axios.post(apiUrl, numeros, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.json(apiResponse.data);

    } catch (error) {
        if (error.response) {
            console.error('Erro da API externa:', error.response.status, error.response.data);
            res.status(error.response.status).json({ 
                error: 'A API externa retornou um erro.', 
                details: error.response.data 
            });
        } else {
            console.error('Erro ao chamar a API externa:', error.message);
            res.status(500).json({ error: 'Falha ao conectar com a API externa.' });
        }
    }
});

// Exporta a app para Vercel
module.exports = app;