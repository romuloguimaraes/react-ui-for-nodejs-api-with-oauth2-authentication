const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({ hi: 'Rommy'});
});

app.listen(PORT, () => {
    console.log('Aplicação rodando na porta 5000');
});