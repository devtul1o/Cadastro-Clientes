// selicionar a lista
const listaClientes = document.getElementById('listarClientes');

function excluirClientes(id, item) {
    fetch(`https://crudcrud.com/api/SUA_CHAVE_AQUI/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        // remover o item da lista
        item.remove();
    })
    .catch(erro => console.error('Erro ao excluir cliente:', erro));
}


// fazer a requisição para o servidor do CrudCrud
fetch('https://crudcrud.com/api/SUA_CHAVE_AQUI/clientes')
    .then(resposta => resposta.json())
    .then(clientes => {
        clientes.forEach(cliente => {
            // JSON
            // criar um item para cada cliente atrevés do DOM
            const item = document.createElement('li');
            // define o conteúdo HTML do item
            item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="excluirClientes('${cliente._id}', this.parentElement)">X</button>`;
            listaClientes.appendChild(item);
        });
    })

document.getElementById('add').addEventListener('click', (evento) => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    fetch('https://crudcrud.com/api/SUA_CHAVE_AQUI/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, email: email})
    })
    .then(resposta => resposta.json())
    .then(clientes => { 
        const item = document.createElement('li');
        // define o conteúdo HTML do item
        item.innerHTML = `${clientes.nome} - ${clientes.email} <button onclick="excluirCliente('${clientes._id}', this.parentElement)">X</button>`;
        listaClientes.appendChild(item);
    })
    .catch(erro => console.error('Erro ao adicionar cliente:', erro));
});
