export function fetchClientes(url, metodo, body = null) {
    return (fetch(url, {
        method: metodo,
        headers: metodo != 'DELETE' ? {
            'Content-Type': 'application/json'
        } : undefined,
        body: body ? JSON.stringify(body) : null
    })
    .then(resposta => resposta.text().then(resposta => resposta != '' ? JSON.parse(resposta) : null)));
}

export function verificarNome(nome){
    if (nome == '') {
        throw new Error('O nome não pode ser vazio.');
    } else if (nome == null) {
        throw new Error('O nome não pode ser nulo.');
    } else if (nome.length < 3) {
        throw new Error('O nome deve conter pelo menos 3 caracteres.');
    } else if (/\d/.test(nome)) {
        throw new Error('O nome não pode ser um número.');
    }
}

export function verificarEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('O email não é válido.');
    }
}