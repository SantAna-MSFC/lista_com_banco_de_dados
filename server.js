  // -------------------- Declaração de Propriedades --------------------

  const express = require('express')
  const bodyParser = require('body-parser')
  const Pessoa = require("./src/model/Pessoa")
  const PessoaDAO = require('./src/controller/PessoaDAO')
  const path = require('path')
  now = new Date
  port = 3000

  // -------------------- Define o express --------------------

  const app = new express()

  // -------------------- Utiliza o BP como requisição entre servidor e cliente --------------------

  app.use(bodyParser.urlencoded({ extended: true }))

  // -------------------- Configura o EJS --------------------

  app.set("view engine", 'ejs')
  app.set("views",__dirname+"/src/view")

  // -------------------- Página Central --------------------

  app.get('/', function (req, res) {
      res.sendFile(__dirname+"/index.html")
  })

  // -------------------- Configura os botões de Interação --------------------

  app.post('/cadastrar', async function(req, res) {
      let botao = String(req.body.b1).trim()
      let pessoa = new Pessoa()
      let dao = new PessoaDAO()
      let c
      let d
      try {
          if (botao.localeCompare("Criar Tabela") == 0) {
            c = await dao.criar()
            res.send("Tabela criada com Sucesso")
          }

          if (botao.localeCompare("Gravar") == 0) {
              pessoa.nome = req.body.txtNome
              pessoa.datanasc = req.body.txtDatanasc
              pessoa.casado = Boolean(req.body.txtCasado)
              pessoa.altura = parseFloat(req.body.txtAltura)
              pessoa.peso = parseFloat(req.body.txtPeso)

              let codigo = await dao.gravar(pessoa)
              res.send("Salvo com código = " + codigo + " Lembre-se deste código para esta pessoa.")
          }
          if (botao.localeCompare("Alterar") == 0) {
              pessoa.codigo = parseInt(req.body.txtCodigo)    // Necessário para Indicar qual Pessoa Alterar
              pessoa.nome = req.body.txtNome
              pessoa.datanasc = req.body.txtDatanasc
              pessoa.casado = Boolean(req.body.txtCasado)
              pessoa.altura = parseFloat(req.body.txtAltura)
              pessoa.peso = parseFloat(req.body.txtPeso)

              let qtde = await dao.alterar(pessoa)
              res.send(qtde +" registro(s) alterado com sucesso.")
          }
          if (botao.localeCompare("Remover") == 0) {
              pessoa.codigo = parseInt(req.body.txtCodigo)

              let qtde = await dao.remover(pessoa)
              res.send(qtde+" registro(s) removido com sucesso")
          }
          if (botao.localeCompare("Deletar Tabela") == 0) {
            d = await dao.deletar()
            res.send("Tabela deletada com Sucesso")
        }
      }
      catch(erro) {
          console.log("Erro -> "+erro)
          return res.status(500).send("Ocorreu um erro no cadastro.")
      }
  })

  // -------------------- Configura os botões de listagens --------------------

  app.post("/listas", async (req, res) => {
    let botao = String(req.body.b1).trim()
    let pessoaDAO = new PessoaDAO
    let tabela
    
      try {

        if (botao.localeCompare("Listar") == 0) {       
          tabela = await pessoaDAO.listar()
          return res.render("mostrarTabela",{tabela})
        }

        if (botao.localeCompare("Acima do Peso") == 0) {
          tabela = await pessoaDAO.listarPeso()
        return res.render("mostrarTabela",{tabela})
        }

        if (botao.localeCompare("Filtrar Idade") == 0) {
          let idade = parseInt(req.body.txtIdade) || 0
          tabela = await pessoaDAO.listarIdade(idade)
        return res.render("mostrarTabela",{tabela})
        }

        if (botao.localeCompare("Casados") == 0) {
          tabela = await pessoaDAO.listarCasados()
        return res.render("mostrarTabela",{tabela})
        }

        if (botao.localeCompare("Nomes") == 0) {
          let nome = req.body.txtNome
          tabela = await pessoaDAO.listarNomes(nome)
        return res.render("mostrarTabela",{tabela})
        }
        return res.send("Nenhum código encontrado.")
      }
      catch (erro) {
        console.log("Erro -> " + erro)
        return res.status(500).send("Ocorreu um erro na listagem.")
      }
    })

  // -------------------- Pega arquivos da pasta "add" --------------------

  app.use(express.static(path.join(__dirname, "add")))

  // -------------------- Liga o servidor na porta 3000 --------------------

  app.listen(port, function (erro) {
      if (erro) {
          console.log("Erro no servidor : "+ erro)
      }
      else {      
          console.log(">>" + " Servidor no ar às " + now.getHours() + ":" + now.getMinutes() + " na porta: " + port + " <<")
      }
  })