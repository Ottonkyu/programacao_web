const express = require('express');
const calculadora = require('./calculadora'); 

const app = express();
const port = 3000;

app.get('/somar/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = calculadora.somar(a, b);
  res.send(`Resultado da soma: ${resultado}`);
});

app.get('/subtrair/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = calculadora.subtrair(a, b);
  res.send(`Resultado da subtração: ${resultado}`);
});

app.get('/multiplicar/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = calculadora.multiplicar(a, b);
  res.send(`Resultado da multiplicação: ${resultado}`);
});

app.get('/dividir/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  if (b === 0) {
    res.status(400).send('Erro: Divisão por zero não permitida.');
    return;
  }
  const resultado = calculadora.dividir(a, b);
  res.send(`Resultado da divisão: ${resultado}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
