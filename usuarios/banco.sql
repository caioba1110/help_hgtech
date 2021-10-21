CREATE DATABASE IF NOT EXISTS usuario_hgtech;

USE usuario_hgtech;

CREATE TABLE IF NOT EXISTS tb_usuario (
    idCPF INT PRIMARY KEY,
    nome VARCHAR(45),
    tel_residencial VARCHAR(10),
    date_nascimento DATE,
    senha int
);