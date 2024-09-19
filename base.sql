---------- Cria a Tabela ----------

Create table Pessoa (
    codigo serial primary key,
    nome varchar(100),
    datanasc date,
    casado boolean,
    altura float,
    peso float,
    cadastro timestamp default current_timestamp);

---------- AUX: Apaga a Tabela ----------

Drop table Pessoa;