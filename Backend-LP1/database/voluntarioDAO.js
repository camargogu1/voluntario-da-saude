
import Voluntario from "../model/voluntario.js";
import conectar from "./conexao.js"


export class VoluntarioDAO {

    #poolConexoes
    constructor() {
        this.#poolConexoes = conectar();
    }

    async gravar(voluntario) {
        const conexao = await this.#poolConexoes.getConnection();
        const sql = 'INSERT INTO Voluntario(cpf,nome,email,telefone,genero,profissao,dataNascimento)\
        VALUES(?,?,?,?,?,?,?)'
        const parametros = [
            voluntario.cpf,
            voluntario.nome,
            voluntario.email,
            voluntario.telefone,
            voluntario.genero,
            voluntario.profissao,
            voluntario.dataNascimento
        ]
        await conexao.execute(sql, parametros)
    }

    async atualizar(voluntario) {
        const conexao = await this.#poolConexoes.getConnection();
        const sql = 'UPDATE Voluntario SET nome = ?,email = ?, telefone = ?, genero = ?, \
        profissao = ?, dataNascimento = ? WHERE cpf = ?'
        const parametros = [
            voluntario.nome,
            voluntario.email,
            voluntario.telefone,
            voluntario.genero,
            voluntario.profissao,
            voluntario.dataNascimento,
            voluntario.cpf
        ]
        await conexao.execute(sql, parametros)
    }

    async excluir(voluntario) {
        const conexao = await this.#poolConexoes.getConnection();
        const sql = 'DELETE FROM Voluntario WHERE cpf = ?';
        const parametro = [voluntario.cpf];
        await conexao.execute(sql, parametro)
    }

    async consultarCPF(cpf) {
        const conexao = await this.#poolConexoes.getConnection();
        const sql = 'SELECT * FROM Voluntario WHERE cpf = ?'
        const parametros = [cpf]
        const [rows] = await conexao.execute(sql, parametros)
        let lista= []
        for (const linha of rows) {
            const voluntario = new Voluntario(
                linha.cpf,
                linha.nome,
                linha.email,
                linha.telefone,
                linha.genero,
                linha.profissao,
                linha.data
            );
            lista.push(voluntario)
        }
        return lista
    }

    async consultarTodos() {
        const conexao = await this.#poolConexoes.getConnection();
        const sql = 'SELECT * FROM Voluntario';
        const parametros = [];
        const [rows] = await conexao.execute(sql, parametros);
        let lista = [];
        for (const linha of rows) {
            const voluntario = new Voluntario(
                linha.cpf,
                linha.nome,
                linha.email,
                linha.telefone,
                linha.genero,
                linha.profissao,
                linha.dataNascimento
            );
            lista.push(voluntario);
        }
        return lista;
    }
    
    


}