const estoque = [];

function adicionarProduto(id, nome, qtd) {
    if (estoque.find(p => p.id === id)) return false;
    estoque.push({ id, nome, qtd: parseInt(qtd) });
    return true;
}

function listarProdutos() {
    return estoque;
}

function removerProduto(id) {
    const index = estoque.findIndex(p => p.id === id);
    if (index === -1) return false;
    estoque.splice(index, 1);
    return true;
}

function editarProduto(id, novaQtd) {
    const produto = estoque.find(p => p.id === id);
    if (!produto) return false;
    produto.qtd = parseInt(novaQtd);
    return true;
}

module.exports = {
    adicionarProduto,
    listarProdutos,
    removerProduto,
    editarProduto
};
