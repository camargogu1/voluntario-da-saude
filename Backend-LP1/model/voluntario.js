import { VoluntarioDAO } from "../database/voluntarioDAO.js"


export default class Voluntario {

    #cpf
    #nome
    #email
    #telefone
    #genero
    #profissao
    #dataNascimento

    constructor(cpf, nome, email, telefone, genero,
        profissao, data) {
        this.#cpf = cpf
        this.#nome = nome
        this.#email = email
        this.#telefone = telefone
        this.#genero = genero
        this.#profissao = profissao
        this.#dataNascimento = data

    }

    get cpf() {
        return this.#cpf
    }
    get nome() {
        return this.#nome
    }
    get email() {
        return this.#email
    }
    get telefone() {
        return this.#telefone
    }
    get genero() {
        return this.#genero
    }
    get profissao() {
        return this.#profissao
    }
    get dataNascimento() {
        return this.#dataNascimento
    }

    set cpf(cpf) {
        this.#cpf = cpf
    }
    set nome(nome) {
        this.#nome = nome
    }
    set email(email) {
        this.#email = email
    }
    set telefone(telefone) {
        this.#telefone = telefone
    }
    set genero(genero) {
        this.#genero = genero
    }
    set profissao(profissao) {
        this.#profissao = profissao
    }
    set dataNascimento(dataNascimento) {
        this.#dataNascimento = dataNascimento
    }

    toJSON() {
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "email": this.#email,
            "telefone": this.#telefone,
            "genero": this.#genero,
            "profissao": this.#profissao,
            "dataNascimento": this.#dataNascimento
        }
    }

    toString(){
        return "Voluntario "+this.#nome+ " | " + 
        "cpf "+this.#cpf
    }

    async gravar(){
        const voluntarioDAO = new VoluntarioDAO();
        await voluntarioDAO.gravar(this)
    }

    async atualizar(){
        const voluntarioDAO = new VoluntarioDAO();
        await voluntarioDAO.atualizar(this)
    }

    async excluir(){
        const voluntarioDAO = new VoluntarioDAO();
        await voluntarioDAO.excluir(this)
    }

    async consultarCPF(cpf){
        const voluntarioDAO = new VoluntarioDAO();
        return await voluntarioDAO.consultarCPF(cpf)
    }

    async consultarTodos(){
        const voluntarioDAO = new VoluntarioDAO();
        return await voluntarioDAO.consultarTodos()
    }









}