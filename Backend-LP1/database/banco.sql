CREATE DATABASE sistema;
USE sistema

CREATE TABLE Voluntario (
  cpf varchar(14) NOT NULL PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  telefone varchar(15) NOT NULL,
  genero varchar(255) NOT NULL,
  profissao varchar(255) NOT NULL,
  dataNascimento varchar(10) NOT NULL);
