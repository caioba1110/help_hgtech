CREATE DATABASE chamado_hgtech;
USE chamado_hgtech;


CREATE TABLE IF NOT EXISTS tb_chamado (

id_chamado INT PRIMARY KEY,
Titulo_chamado VARCHAR (100),
Ds_chamado VARCHAR (100),
Usuario_idCpf INT,
Funcionario_id_codigo_funcionario INT,
Funcionario_Cargo_idCargo INT)


INSERT INTO tb_chamado (id_chamado, Titulo_chamado, Ds_chamado, Usuario_idCpf, Funcionario_id_codigo_funcionario, Funcionario_Cargo_idCargo) 
VALUES (1, 'Primeiro', 'instalacao', 284, 123, 12);

INSERT INTO tb_chamado (id_chamado, Titulo_chamado, Ds_chamado, Usuario_idCpf, Funcionario_id_codigo_funcionario, Funcionario_Cargo_idCargo) 
VALUES (2, 'Segundo', 'instalacao', 285, 124, 13);

INSERT INTO tb_chamado (id_chamado, Titulo_chamado, Ds_chamado, Usuario_idCpf, Funcionario_id_codigo_funcionario, Funcionario_Cargo_idCargo) 
VALUES (3, 'Terceiro', 'Acesso', 286, 125, 14);


select * from tb_chamado