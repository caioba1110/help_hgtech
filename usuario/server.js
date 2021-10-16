// importar o http
const http = require('http');
//express
const express = require('express');


let usuarios =[
    {

        id:1,
        nome:'Vanderlei',
        email:'vanderlei@gmail.com',
        tel_residencial:'(11)5021-3333',
        data_nascimento:'05/09/2000',
        senha:'123',

    },
    {
        id:2,
        nome:'Maria',
        email:'maria@gmail.com',
        tel_residencial:'(11)9638-9879',
        data_nascimento:'07/07/1988',
        senha:'987'

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
app.get("/usuarios", (req, res, next)=>{

    res.send(usuarios);
});

 //fazer um POST
 app.post("/usuarios", (req, res, next) =>{

    const usuario =  req.body;

    usuarios.push({id:contador+=1,nome:usuario.nome,email:usuario.email,tel_residencial:usuario.tel_residencial,data_nascimento:usuario.data_nascimento,senha:usuario.senha});

    console.log(usuarios);
//    res.end();
   //mostrar que a requisição teve sucesso
   res.status(201).json(usuarios);

});
//fazer o update
app.put("/usuarios",(req, res) =>{

    //vamos varrer a nossa lista de usuários
    usuarios.forEach((usuario) =>{

        if(usuario.id === req.body.id){
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;
            usuario.tel_residencial = req.body.tel_residencial;
            usuario.data_nascimento = req.body.data_nascimento;
            usuario.senha = req.body.senha;

        }
    })
      //termina
      console.log(usuarios)
      res.status(204).end();
  
    
})

//Fazer delete

app.delete("/usuarios",(req, res) =>{
    console.log(req.body.id)
    usuarios = usuarios.filter(item => item.id !== req.body.id)
     console.log(usuarios)
      res.status(204).end()
})



//server
const server = http.createServer(app);
server.listen(3000); 




