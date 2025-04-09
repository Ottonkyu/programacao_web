//exemplos
//adicionar http://localhost:3000/adicionar/1/Arroz/10
//listar http://localhost:3000/listar
//excluir http://localhost:3000/remover/1
//editar http://localhost:3000/editar/1/20
const express = require('express');
const app = express();
const estoque = require('./estoque');

app.get('/', (req, res) => {
    res.send(`
        <h2>Bem-vindo ao Estoque</h2>
        <p>Use as rotas:</p>
        <ul>
            <li>/adicionar/:id/:nome/:qtd</li>
            <li>/listar</li>
            <li>/remover/:id</li>
            <li>/editar/:id/:qtd</li>
        </ul>
    `);
});

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    const sucesso = estoque.adicionarProduto(id, nome, qtd);
    res.send(sucesso ? '✅ Produto adicionado com sucesso.' : '⚠️ Produto já existe.');
});

app.get('/listar', (req, res) => {
    const lista = estoque.listarProdutos();
    res.send(`<pre>${JSON.stringify(lista, null, 2)}</pre>`);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    const sucesso = estoque.removerProduto(id);
    res.send(sucesso ? '🗑️ Produto removido com sucesso.' : '❌ Produto não encontrado.');
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    const sucesso = estoque.editarProduto(id, qtd);
    res.send(sucesso ? '✏️ Produto atualizado com sucesso.' : '❌ Produto não encontrado.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
