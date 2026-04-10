import { Cliente, GerenciarClientes } from "/js/classes.js";
import { verificarNome, verificarEmail } from "/js/utils.js";

const gerenciarClientes = new GerenciarClientes();

document.addEventListener('DOMContentLoaded', () => {
    gerenciarClientes.buscarClientes()
        .then(clientes => {
            const listarClientes = clientes.map(cliente => `<li>${cliente.nome} - ${cliente.email} <button data-id="${cliente._id}" class="excluir">X</button></li>
            `).join('');
            document.getElementById('listarClientes').innerHTML = listarClientes;
        });

    document.querySelector('form').addEventListener('submit', evento => {
        evento.preventDefault();

        try {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;

            verificarNome(nome);
            verificarEmail(email);

            const cliente = new Cliente(nome, email);
            gerenciarClientes.adicionarCliente({nome: cliente.nome, email: cliente.email})
                .then(clienteCadastrado => {
                    const clienteHTML = `<li>${clienteCadastrado.nome} - ${clienteCadastrado.email} <button data-id="${clienteCadastrado._id}" class="excluir">X</button></li>`;
                    document.getElementById('listarClientes').innerHTML += clienteHTML;
                    document.querySelector('form').reset();
                });
        }
        catch(erro) {
            alert(erro.message);
        }
    });

    document.getElementById('listarClientes').addEventListener('click', evento => {
        if (evento.target.classList.contains('excluir')) {
            const id = evento.target.dataset.id;
            gerenciarClientes.excluirCliente(id)
                .then(() => {
                    evento.target.parentElement.remove();
                });
        }
    });
});
