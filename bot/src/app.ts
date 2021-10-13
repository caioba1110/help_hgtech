// Supports ES6
 import { create, Whatsapp } from 'venom-bot';


 //Aqui fica a inteligencia artificial
 const { NlpManager } = require('node-nlp');

 //Estou criando um objeto chamado manager éo gerenciador da 
 //anossa intelegencia artificial
 //aqui em baixo estou treinando a inteligencia artificial
 //manager ele processa a frase e vai dar uma resposta

 const manager = new NlpManager({ languages: ['pt'], forceNER: true });


 //Treino de saudação
 manager.addDocument('pt', 'bom dia', 'SAUDACAO');
 manager.addDocument('pt', 'bom tarde', 'SAUDACAO');
 manager.addDocument('pt', 'bom noite', 'SAUDACAO');
 manager.addDocument('pt', 'e ae, tudo bem', 'SAUDACAO');
 manager.addDocument('pt', 'ola', 'SAUDACAO');
 manager.addDocument('pt', 'oi', 'SAUDACAO');
 manager.addDocument('pt', 'tudo bom', 'SAUDACAO');

//localização
manager.addDocument('pt', 'onde fica localizado', 'LOCALIZACAO');
manager.addDocument('pt', 'ponto de referencia', 'LOCALIZACAO');
manager.addDocument('pt', 'endereco', 'LOCALIZACAO');
manager.addDocument('pt', 'localizacao da empresa', 'LOCALIZACAO');

//problema
manager.addDocument('pt','problema o software ele da erro','PROBLEMA');
manager.addDocument('pt','problema a aplicação ela  está fechando','PROBLEMA');
manager.addDocument('pt','problema o software ele está lento para carregar','PROBLEMA');
manager.addDocument('pt','problema a aplicação está falhando','PROBLEMA');
manager.addDocument('pt','problema o aplicativo ele fecha','PROBLEMA');
manager.addDocument('pt','problema aplicativo está com erro','PROBLEMA');
manager.addDocument('pt','problema software não conecta ','PROBLEMA');








 

 //responder saudação
 manager.addAnswer(
  'pt',
  'SAUDACAO',
  'olá sou um atendente virtual da Hgtech estou aqui para te ajudar.Qual a sua duvida?');

  manager.addAnswer(
    'pt',
    'SAUDACAO',
    'Olá sou um atendente virtual da Hgtech e gosto de tirar dúvidas dos nosso clientes.Qual é a sua?');

    //responder a localização
 manager.addAnswer('pt', 'LOCALIZACAO', 'Rua Taquari, 546 - Mooca, São Paulo - SP, 03166-000 ');
 manager.addAnswer('pt', 'LOCALIZACAO', 'Ok vou te mandar a localização no mapa!');

 //responder problemas
 manager.addAnswer('pt','PROBLEMA','Executa como administrador que o problema será resolvido');
 manager.addAnswer('pt','PROBLEMA','Da um click sobre o software e vai em conectar');
 manager.addAnswer('pt','PROBLEMA','Seu problema foi resolvido?');
 manager.addAnswer('pt','PROBLEMA','Desativa a rede 4g do celular e ativa novamente');
 manager.addAnswer('pt','PROBLEMA','Desinstala o software e reinstala  novamente');



 // Train and save the model
 (async() => {
     await manager.train();
     //salvando o treino
     manager.save();

     create('BOT')
     .then((client) => {
   
      //aqui é um evento 
       client.onMessage(async(message) => {
         //se a mensagem for Hi ou se a mensagem não for do grupo executa
         if (message.isGroupMsg === false) {
          //aqui ele vai processar essa fala
          const response = await manager.process('pt',message.body.toLowerCase());
          //AQUI VAI MOSTRAR O QUE ELE PROCESSOU
          console.log("Intenção: ",response.intent);
          console.log("Precisão: ",response.score);

          //vai responder para a pessoa que mandoa a mensagem A MAIS ADEQUADA AI MANDA NO 
          //WhatsApp
          client.sendText(message.from,response.answer);

             
         }
       });
   
     })
     .catch((erro) => {
       console.log(erro);
     });
   




     //aqui ele vai receber toda a intenção dessa fala (oi) que foi conhecida e qual 
     //foi a porcentagem  aceita aqui vai ser dinamico vai vir um monte de mensafem
  
 })();









