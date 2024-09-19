module.exports = class Pessoa{
    #codigo
    #nome
    #datanasc
    #casado
    #altura
    #peso
    #cadastro

    constructor() {
        this.#codigo = -1
        this.#nome = ""
        this.#datanasc = null
        this.#casado = false
        this.#altura = 0
        this.#peso = 0
        this.#cadastro = null
    }
    set codigo(n) {
         this.#codigo=n
    }
    get codigo() {
        return(this.#codigo)
    }
    set nome(n) {
        this.#nome=n
   }
   get nome() {
       return(this.#nome)
    }
    set datanasc(n) {
        this.#datanasc=n
   }
   get datanasc() {
       return(this.#datanasc)
   }
   set casado(n) {
    this.#casado=n
    }
    get casado() {
   return(this.#casado)
    }
    set altura(n) {
        this.#altura=n
   }
   get altura() {
       return(this.#altura)
   }
   set peso(n) {
    this.#peso=n
    }
    get peso() {
   return(this.#peso)
    }
    set cadastro(n) {
        this.#cadastro=n
        }
        get cadastro() {
       return(this.#cadastro)
        }
}