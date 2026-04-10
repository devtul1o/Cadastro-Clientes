import { fetchClientes } from "/js/utils.js";

export class Cliente{
    #nome;
    #email;
    #id;

    constructor(nome, email){
        this.#nome = nome;
        this.#email = email;
        this.#id = null;
    }
    get nome(){
        return this.#nome;
    }
    get email(){
        return this.#email;
    }
    get id(){
        return this.#id;
    }

}

export class GerenciarClientes {
    constructor() {
        this.clientes = [];
        this.apiUrl = 'https://crudcrud.com/api/SUA_CHAVE_AQUI/clientes';
    }

    buscarClientes() {
        return fetchClientes(this.apiUrl, 'GET')
            .then(clientes => {
                this.clientes = clientes || [];
                return this.clientes;
            });
    }
    adicionarCliente(cliente) {
        return fetchClientes(this.apiUrl, 'POST', cliente)
            .then(cliente => {
                this.clientes.push(cliente);
                return cliente;
            });
    }
    excluirCliente(id) {
        return fetchClientes(`${this.apiUrl}/${id}`, 'DELETE')
            .then(() => {
                const novoArray = this.clientes.filter(cliente => cliente._id != id);
                this.clientes = novoArray;
            });
    }

}