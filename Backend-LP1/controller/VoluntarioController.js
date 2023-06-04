import Voluntario from "../model/voluntario.js";


export default class VoluntarioController {

    gravar(req, res) {
        res.type("application/json");
        if (req.method === "POST" && req.is("application/json")) {
            try {
                const { cpf, nome, email, telefone, genero,
                    profissao, dataNascimento } = req.body
                if (cpf && nome && email && telefone && genero && profissao &&
                    dataNascimento) {
                    const voluntario = new Voluntario(cpf, nome, email, telefone, genero, profissao, dataNascimento)
                    voluntario.gravar().then(() => {
                        res.status(200).send({
                            status: true,
                            msg: "Voluntario cadastrado"
                        })
                    }).catch((e) => {
                        res.status(500).send({
                            status: false,
                            msg: "Não foi possivel cadastrar "+e
                        })
                    })
                } else
                    res.status(400).send({ status: false, msg: "Informe todos os dados" })
            } catch (e) {
                res.status(400).send({ status: false, msg: "Informe todos os dados" })
            }
        }
    }

    async atualizar(req, res) {
        res.type("application/json");
        if (req.method === "PATCH") {
            const { cpf, nome, email, telefone, genero, profissao, dataNascimento } = req.body;
            if (cpf && nome && email && telefone && genero && profissao && dataNascimento) {
                const voluntario = new Voluntario(cpf, nome, email, telefone, genero, profissao, dataNascimento);
                voluntario.consultarCPF(cpf).then((lista) => {
                    if (lista.length > 0) {
                        voluntario.atualizar().then(() => {
                            res.status(200).send({
                                status: true,
                                msg: "Voluntario atualizado"
                            });
                        }).catch((e) => {
                            res.status(500).send({
                                status: false,
                                msg: "Não foi possivel atualizar " + e
                            });
                        });
                    } else {
                        res.status(400).send({ status: false, msg: "Voluntario inexistente" });
                    }
                }).catch((e) => {
                    res.status(500).send({
                        status: false,
                        msg: "Não foi possivel atualizar " + e
                    });
                });
            } else {
                res.status(400).send({ status: false, msg: "Informe todos os dados" });
            }
        }
    }
    
    excluir(req, res) {
        res.type("application/json");
        if (req.method === "DELETE") {
            const { cpf } = req.body;
            if (cpf) {
                const voluntario = new Voluntario(cpf);
                voluntario.excluir()
                    .then(() => {
                        res.status(200).send({ status: true, msg: "Excluído com sucesso" });
                    })
                    .catch((e) => {
                        res.status(500).send({ status: false, msg: "Não foi possível excluir: " + e });
                    });
            } else {
                res.status(400).send({ status: false, msg: "Informe o CPF" });
            }
        } else {
            res.status(400).send({ status: false, msg: "Método inválido" });
        }
    }
    

    consultarTodos(req, res) {
        res.type("application/json");
        if (req.method === "GET") {
            const voluntario = new Voluntario();
            voluntario.consultarTodos().then((lista) => {
                console.log(JSON.stringify(lista.nome))
                res.status(200).send({ status: true, msg: "Consulta realizada com sucesso", lista: lista})
            }).catch((e) => {
                res.status(500).send({ status: false, msg: "Não foi possivel consultar " + e })
            });
        } else res.status(400).send({ status: false, msg: "Método inválido" })
    }




}