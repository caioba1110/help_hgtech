const socket = io()
let name;
//Retorna o primeiro elemento dentro do documento
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

//Enquanto não digitar o meu nome a caixa de dialogo não sai da tela
do {
    name = prompt('Por favor entre com o seu nome: ')
} while(!name)

//Anexe um evento de clique ao documento.
//Quando o usuário clica em qualquer lugar
//do documento, produza a menssagem do  elemento.
textarea.addEventListener('keyup', (k) => {
    if(k.key === 'Enter') {
        sendMessage(k.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    //Anexa uma mensagem (vazia) do 'messageType' especificado
    // que será publicada no 'tópico' especificado ao evento referenciado
    appendMessage(msg, 'outgoing')
    textarea.value = ''

    //faz o scroll automático
    scrollToBottom()

    // Aqui estou enviando para o meu servidor
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// ----->>>>> Receber as mensagens <<<<<-----
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})


    //faz o scroll automático
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



