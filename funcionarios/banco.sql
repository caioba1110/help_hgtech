CREATE DATABASE IF NOT EXISTS funcionarios_hgtech;

USE funcionarios_hgtech;

CREATE TABLE IF NOT EXISTS tb_funcionarios (
    id_cod INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45),
    tel_residencial VARCHAR(45),
    email VARCHAR(45),
    date_nascimento DATE,
    id_cargo int,
    senha int
);

CREATE TABLE IF NOT EXISTS tb_cargos (
    id_cargo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_cargo VARCHAR(200)
);

ALTER TABLE tb_funcionarios
ADD FOREIGN KEY (id_cargo)
REFERENCES tb_cargo(id_cargo);