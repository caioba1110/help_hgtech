const axios = require('axios');
// const { resolve } = require('path');
var readline = require('readline');

// (async () => {
//     try {
//         const response = await axios.get('https://ancient-brook-16755.herokuapp.com/')
//         console.log(response.data);
//     } catch (error) {
//         console.log(error.response.body);
//     }
// })();

// (async () => {
//     try {
//         const response = await axios.get('https://ancient-brook-16755.herokuapp.com/conversa')
//         console.log(response.data);
//     } catch (error) {
//         console.log(error.response.body);
//     }
// })();


cores = {
    "black": "\x1b[30m",
    "red": "\x1b[31m",
    "green": "\x1b[32m",
    "yellow": "\x1b[33m",
    "blue": "\x1b[34m",
    "magenta": "\x1b[35m",
    "cyan": "\x1b[36m",
    "white": "\x1b[37m",
}

async function login_cliente(leitor) {
    return new Promise((resolve, reject) => {
        leitor.question("Digite seu CPF:", (cpf) => {
            leitor.question("Digite sua senha:", (senha) => {
                body = {
                    "idCPF": cpf,
                    "senha": senha
                }

                const response = axios.post(
                    'http://localhost:4000/login',
                    body
                );
                response.then(
                    (resposta) => {
                        resolve(resposta['data']['nome'])
                    }
                ).catch((erro) => {
                    resolve("erro")
                })
            })
        })
    })
}

async function login_funcionario(leitor) {
    return new Promise((resolve, reject) => {
        leitor.question("Digite seu email:", (email) => {
            leitor.question("Digite sua senha:", (senha) => {
                body = {
                    "email": email,
                    "senha": senha
                }

                const response = axios.post(
                    'http://localhost:5000/login',
                    body
                );
                response.then(
                    (resposta) => {
                        resolve(resposta['data']['nome'])
                    }
                ).catch((erro) => {
                    resolve("erro")
                })
            })
        })
    })
}

// Cliente e funcionario
function printa_conversa(conversa) {
    console.log("Digite 'sair' para encerrar nossa conversa.")
    // console.clear()
    console.log('\n----- INICIO CONVERSA -----')
    for (i = 0; i < conversa.length; i++) {
        console.log('\n')
        console.log(cores["red"], conversa[i].cargo + " : ", cores["green"], conversa[i].nome, '\x1b[0m')
        console.log('\n')
        console.log(cores["white"], conversa[i].mensagem, '\x1b[0m')
    }
    console.log('\n----- FINAL DA CONVERSA ----')
}

function conecta_bot() {
    console.log('Conectou ao bot');
}

// Cliente
async function conecta_funcionario(leitor) {
    nome = await login_cliente(leitor)
    if (nome == "erro"){
        console.log(cores['red'], 'Usuário não encontrado.', '\x1b[0m')
        inicia_chat(leitor)
    }else{
        // console.log(response)
        console.log('Conectou ao funcionario');
        // Método que inicia conversa aqui, me retornando o id
        const id = await axios.post(
            'https://ancient-brook-16755.herokuapp.com/conversa'
        );
        console.log(id.data)
        pega_nova_mensagem(leitor, id.data)

        abre_chat(leitor, id.data, nome, "cliente")
    }
}

// Cliente e funcionario
function abre_chat(leitor, id, nome, cargo) {
    leitor.question("Digite uma mensagem\n", async function (mensagem) {
        if (mensagem == 'sair') {
            // Aqui deverá bater no servidor e encerrar a conversa passando o id
            leitor.close();
        } else {
            // Enviar mensagem para o servidor, tendo que ter o cargo, nome e mensagem
            body = {
                "id": id.toString(),
                "cargo": cargo,
                "mensagem": mensagem,
                "nome": nome
            }
            await axios.post(
                'https://ancient-brook-16755.herokuapp.com/mensagem',
                body
            );
            abre_chat(leitor, id, nome, cargo)
        }
    });
}

// cliente e funcionario
function pega_nova_mensagem(leitor, id) {
    aux = 0
    qtdMensagens = "0"
    acabou_conversa = setInterval(async function () {
        if (aux == 290) {
            console.log("Seu chat será encerrado em 10 segundos por inoperacia.")
        }

        if (aux == 300) {
            body = {
                "id": id
            }

            console.log("Seu chat foi encerrado por inoperacia.")
            // Aqui deverá bater no servidor e encerrar a conversa passando o id
            id_deletado = await axios.delete(
                `https://ancient-brook-16755.herokuapp.com/conversa`,
                { "data": body }
            );
            leitor.close()
            clearInterval(acabou_conversa)
        }
        // Método que vai bater no servidor e ver se tem nova mensagem, 
        // deverá enviar o código da conversa e quantas mensagens ela tem, retornará a conversa
        // ou false caso não tenha novas mensagens

        body = {
            "id": id,
            "qtdMensagens": qtdMensagens
        }

        conversa_atualizada = await axios.get(
            `https://ancient-brook-16755.herokuapp.com/mensagem?id=${id}&qtdMensagens=${qtdMensagens}`
        );
        
        if (conversa_atualizada.data) {
            console.log(conversa_atualizada.data)
            printa_conversa(conversa_atualizada.data)
            aux = 0
            qtdMensagens = conversa_atualizada.data.length
        } else {
            aux += 1
        }
    }, 1000)
}

// funcionario
async function entra_funcionario(leitor) {
    console.log('Entrou funcionario');
    lista_conversas(leitor)

    nome = await login_funcionario(leitor)
    if (nome == "erro"){
        console.log(cores['red'], 'Usuário não encontrado.', '\x1b[0m')
        inicia_chat(leitor)
    }else{
        lista_conversas(leitor, nome)
    }
}

// funcionario
async function lista_conversas(leitor, nome) {
    // Pega id das conversas
    ids_conversas = await axios.get(
        `https://ancient-brook-16755.herokuapp.com/conversa`
    );

    ids_conversas = ids_conversas['data']

    leitor.question(`Esses são os ids das conversas. \nEscolha um para iniciar uma nova conversa.\n\n${ids_conversas}\n -1 para mostrar as conversas novamente.`, (id) => {
        if (id < 0) {
            lista_conversas(leitor)
        } else {
            pega_nova_mensagem(leitor, id)
            abre_chat(leitor, id, nome, "funcionario")
        }
    })
}

// Starta
var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

leitor.on("close", function () {
    console.log("Obrigado, espero que tenhamos te ajudado. Volte sempre que precisar :)")
    process.exit(0)
})

mensagem_boas_vindas = `
Olá, eu sou seu atendente pessoal :)\n 
Aqui eu te ajudo com problemas no app.\n
Gostaria de falar com um profissional? tecle 1\n
Você trabalha conosco? Tecle 2\n`

function inicia_chat(leitor) {
    leitor.question(mensagem_boas_vindas, function (answer) {
        var resp = answer;
        if (resp == "1") {
            conecta_funcionario(leitor)
        } else {
            entra_funcionario(leitor)
        }
    });
}

inicia_chat(leitor)