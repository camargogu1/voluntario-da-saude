import Voluntario from "../model/voluntario.js";

const urlBase = "http://localhost:3000/voluntario"
get();
const botao = document.querySelector("#botao");
const btnatualizar = document.querySelector("#atualizar")
btnatualizar.style.display = "none"
btnatualizar.addEventListener("click", atualizar)
botao.addEventListener("click", cadastra)


const busca = document.querySelector("#busca");
busca.addEventListener("keydown",buscanatabela )

let nome = document.querySelector("#nome").value;
let email = document.querySelector("#email").value;
let cpf = document.querySelector("#cpf").value;
let telefone = document.querySelector("#telefone").value;
let genero = document.querySelector("#genero").value;
let profissao = document.querySelector("#profissao").value;
let dataNascimento = document.querySelector("#dataNascimento").value;

function cadastra() {
    nome = document.querySelector("#nome").value;
    email = document.querySelector("#email").value;
    cpf = document.querySelector("#cpf").value;
    telefone = document.querySelector("#telefone").value;
    genero = document.querySelector("#genero").value;
    profissao = document.querySelector("#profissao").value;
    dataNascimento = document.querySelector("#dataNascimento").value;

    const voluntario = new Voluntario(cpf, nome, email, telefone, genero, profissao, dataNascimento)
    console.log(voluntario)
    fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(voluntario)
    }).then((res) => {
        return res.json()
    }).then((res) => {
        if (res.status) {
            get();
            alertar("criado")
            limpar();
        }
        else {
            alert(res.msg)
        }
    }).catch((e) => {
        alert("Erro: " + e)
    })


}

function excluir(cpf) {
    fetch(urlBase, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf: cpf })
    }).then((res) => res.json())
        .then((res) => {
            get()
        }).catch((e) => {
            alert("Erro: " + e)
        })
}

function buscanatabela(){
    const nome = document.getElementById("busca").value
    fetch(urlBase,{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res)=>{
        return res.json()
    }).then((res)=>{
        const novalista = res.lista.filter((element)=>{
            return (element.nome).includes(nome)
        })
        if(novalista.length > 0){
            criaTabela(novalista)
        }
    })
}

function atualizar() {

    nome = document.querySelector("#nome").value;
    email = document.querySelector("#email").value;
    cpf = document.querySelector("#cpf").value;
    telefone = document.querySelector("#telefone").value;
    genero = document.querySelector("#genero").value;
    profissao = document.querySelector("#profissao").value;
    dataNascimento = document.querySelector("#dataNascimento").value;

    const voluntario = new Voluntario(cpf, nome, email, telefone, genero, profissao, dataNascimento)

    fetch(urlBase, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Header":"PATCH",
            "Access-Control-Allow-Origin":"*"
        },
        body: JSON.stringify(voluntario)
    }).then((res) => {
        return res.json()
    }).then((res) => {
        if (res.status) {
            get();
            limpar()
            alertar("atualizado")
        }
        else {
            alert(res.msg)
        }
    }).catch((e) => {
        alert("Erro: " + e)
    })

    btnatualizar.style.display = "none"
    botao.disabled = false
   
}

function setAlterar(cpf2, nome2, email2, telefone2, genero2, profissao2, data2) {
    console.log(profissao2)
    document.querySelector("#nome").value = nome2;
    document.querySelector("#email").value = email2;
    document.querySelector("#cpf").value = cpf2;
    document.querySelector("#telefone").value = telefone2;
    document.querySelector("#genero").value = genero2;
    document.querySelector("#profissao").value = profissao2;
    document.querySelector("#dataNascimento").value = data2;
    botao.disabled = true;
    btnatualizar.style.display = "inline"
}

function criaTabela(lista) {
    if (lista) {
        const tabela = document.querySelector(".tabela")
        tabela.innerHTML = ""
        const table = document.createElement("table");
        table.classList.add("table")
        table.classList.add("table-light");
        const thead = document.createElement("thead");
        thead.innerHTML = `
    <thead>
        <tr>
            <th scope="col">CPF</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
            <th scope="col">Gênero</th>
            <th scope="col">Profissão</th>
            <th scope="col">Data de Nascimento</th>
            <th scope="col">Opções</th>
        </tr>
    </thead> `
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        lista.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${element.cpf}</td>
        <td>${element.nome}</td>
        <td>${element.email}</td>
        <td>${element.telefone}</td>
        <td>${element.genero}</td>
        <td>${element.profissao}</td>
        <td>${element.dataNascimento}</td>
        <td>
        <button class="btn btn-warning" id="button2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        </button>
        <button class="btn btn-danger" data-cpf="${element.cpf}" id="button1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
        </button>
     
    </td>
        `
            tbody.appendChild(tr);
            const deleteButton = tr.querySelector("#button1");
            deleteButton.addEventListener("click", () => {
                if (confirm("Tem certeza que deseja deletar?")) {
                    const cpf = deleteButton.getAttribute("data-cpf");
                    excluir(cpf);
                }
            })

            const alterarButton = tr.querySelector("#button2");
            alterarButton.addEventListener("click", () => setAlterar(element.cpf, element.nome, element.email,
                element.telefone, element.genero, element.profissao, element.dataNascimento))
        });
        table.appendChild(tbody);
        tabela.appendChild(table);
    }
}

function get() {
    fetch(urlBase, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    }).then((res) => {
        criaTabela(res.lista)
    }).catch((e) => {
        alert("Erro: " + e)
    })
}

function alertar(tipo){
    const div = document.querySelector(".botoes")
    const alerta = document.createElement("p");
    alerta.innerHTML = `Usuário ${tipo} com sucesso`
    alerta.classList.add("alerta")
    div.appendChild(alerta)
    setTimeout(() => {
        div.removeChild(alerta)
        }, 3000)
}

function limpar(){
    document.querySelector("#nome").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#cpf").value = "";
    document.querySelector("#telefone").value = "";
    document.querySelector("#dataNascimento").value = "";
}