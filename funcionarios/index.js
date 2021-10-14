// importar o http
const http = require('http');
//express
const express = require('express');


let funcionarios =[
    {

        id:1,
        nome:'Guilherme',
        email:'guilherme@gmail.com',
        tel_celular: '(11)95432-0987',
        tel_residencial:'(11)5021-3333',
        data_nascimento:'19/10/2001',
        senha:'12345'

    },
    {
        id:2,
        nome:'Lucas',
        email:'lucas@gmail.com',
        tel_celular: '(11)98765-0490',
        tel_residencial:'(11)2121-6738',
        data_nascimento:'25/07/1996',
        senha:'54321'

    }
]




const app = express();


//usar body-parser para interpretar o elemento json
// const app = express();
const bodyParser = require('body-parser');
let contador = 3 ;
app.use(bodyParser.json());


//porta que o servidor vai atender
const porta = 3000;
app.set('port', porta);



//******************************************* */
//End_Points
//******************************************* */
app.get("/teste", (req ,res ,next)=>{

    res.send("Hello World!")

})
//********************************************* */
//End_Points ((( get )))
//********************************************* */
app.get("/funcionarios", (req, res, next)=>{

    res.send(funcionarios);
});

 //fazer um POST
 app.post("/funcionarios", (req, res, next) =>{

    const funcionario =  req.body;

    funcionarios.push({id:contador+=1,nome:funcionario.nome,email:funcionario.email,tel_celular:funcionario.tel_celular,tel_residencial:funcionario.tel_residencial,data_nascimento:funcionario.data_nascimento,senha:funcionario.senha});

    console.log(funcionarios);
//    res.end();
   //mostrar que a requisição teve sucesso
   res.status(201).json(funcionarios);

});
//fazer o update
app.put("/funcionarios",(req, res) =>{

    //vamos varrer a nossa lista de usuários
    funcionarios.forEach((funcionario) =>{

        if(funcionario.id === req.body.id){
            funcionario.nome = req.body.nome;
            funcionario.email = req.body.email;
            funcionario.tel_celular = req.body.tel_celular;
            funcionario.tel_residencial = req.body.tel_residencial;
            funcionario.data_nascimento = req.body.data_nascimento;
            funcionario.senha = req.body.senha;

        }
    })
      //termina
      console.log(funcionarios)
      res.status(204).end();
  
    
})

//Fazer delete
app.delete("/funcionarios",(req, res) =>{
    console.log(req.body.id)
    funcionarios = funcionarios.filter(item => item.id !== req.body.id)
     console.log(funcionarios)
      res.status(204).end();

})




//server
const server = http.createServer(app);
server.listen(3000); 




