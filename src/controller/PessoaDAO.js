const Banco = require("../model/Banco")

module.exports = class PessoaDAO {

// -------------------- Botão Criar Tabela --------------------

  async criar() {
    try {
      Banco.init()
      const res = await Banco.conexao.query(
        `Create table Pessoa (
          codigo serial primary key,
          nome varchar(100),
          datanasc date,
          casado boolean,
          altura float,
          peso float,
          cadastro timestamp default current_timestamp);`)
      Banco.conexao.end()
      return res.console.log("Tabela criada com Sucesso!")
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Gravar --------------------

  async gravar(obj) {
    try {
      Banco.init()
      const res = await Banco.conexao.query(
        'INSERT INTO Pessoa(nome,datanasc,casado,altura,peso,cadastro) VALUES($1,$2,$3,$4,$5, COALESCE($6, CURRENT_TIMESTAMP)) RETURNING codigo', [obj.nome, obj.datanasc, obj.casado, obj.altura, obj.peso, obj.cadastro])
      Banco.conexao.end()
      return res.rows[0].codigo
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Alterar --------------------

  async alterar(obj) {
    try {
      Banco.init()
      let res = await Banco.conexao.query('Update Pessoa set nome=$1,datanasc=$2,casado=$3,altura=$4,peso=$5 where codigo=$6', [obj.nome, obj.datanasc, obj.casado, obj.altura, obj.peso, obj.codigo])
      Banco.conexao.end()
      return res.rowCount
    }
    catch (erro) {
      console.log(erro)
    }

  }

// -------------------- Botão Remover --------------------

  async remover(obj) {
    try {
      Banco.init()
      let res = await Banco.conexao.query('Delete from Pessoa where codigo = $1', [obj.codigo])
      Banco.conexao.end()
      return res.rowCount
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Deletar Tabela --------------------

async deletar() {
  try {
    Banco.init()
    const res = await Banco.conexao.query('Drop table Pessoa')
    Banco.conexao.end()
    return res.console.log("Tabela deletada com Sucesso!")
  }
  catch (erro) {
    console.log(erro)
  }
}


// -------------------- Botão Listar -------------------- order by nome

  async listar() {
    try {
      Banco.init()
      let tabela = await Banco.conexao.query('Select codigo, nome, datanasc, (extract(year from AGE(CURRENT_DATE, datanasc))) as idade, casado, altura, peso, (peso / (altura * altura)) as imc, cadastro from pessoa order by nome')
      Banco.conexao.end()
      return tabela
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Listar por Peso -------------------- where (peso / (altura * altura)) > 25

  async listarPeso() {
    try {
      Banco.init()
      let tabela = await Banco.conexao.query('Select codigo, nome, datanasc, (extract(year from AGE(CURRENT_DATE, datanasc))) as idade, casado, altura, peso, (peso / (altura * altura)) as imc, cadastro from pessoa WHERE (peso / (altura * altura)) > 25 order by nome')
      Banco.conexao.end()
      return tabela
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Listar por Idade -------------------- where (extract(year from AGE(CURRENT_DATE, datanasc))) >= $1', [idade]

  async listarIdade(idade) {
    try {
      Banco.init()
      let tabela = await Banco.conexao.query('Select codigo, nome, datanasc, (extract(year from AGE(CURRENT_DATE, datanasc))) as idade, casado, altura, peso, (peso / (altura * altura)) as imc, cadastro from pessoa where (extract(year from AGE(CURRENT_DATE, datanasc))) >= $1 order by nome',
        [idade])
      Banco.conexao.end()
      return tabela
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Listar Casados -------------------- where casado = true

  async listarCasados() {
    try {
      Banco.init()
      let tabela = await Banco.conexao.query('Select codigo, nome, datanasc, (extract(year from AGE(CURRENT_DATE, datanasc))) as idade, casado, altura, peso, (peso / (altura * altura)) as imc, cadastro from pessoa where casado = true order by nome')
      Banco.conexao.end()
      return tabela
    }
    catch (erro) {
      console.log(erro)
    }
  }

// -------------------- Botão Listar por parte do Nome -------------------- where nome ilike $1', ["%" + nomes + "%"]

  async listarNomes(nomes) {
    try {
      Banco.init()
      let tabela = await Banco.conexao.query('Select codigo, nome, datanasc, (extract(year from AGE(CURRENT_DATE, datanasc))) as idade, casado, altura, peso, (peso / (altura * altura)) as imc, cadastro from pessoa where nome ilike $1 order by nome',
        ["%" + nomes + "%"])
      Banco.conexao.end()
      return tabela
    }
    catch (erro) {
      console.log(erro)
    }
  }
}