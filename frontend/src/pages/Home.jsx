import { useState, useEffect } from "react";
import { Trash2, Edit2 } from 'lucide-react';
import './../styles/Home.css'
import logo from './../assets/log.png'

const API_URL = "http://localhost:8080/todos"

function Home(){

    const [todos, setTodos] = useState([]);
    const [novoTodoTitulo, setNovoTodoTitulo] = useState("");
    const [novoTodoDescricao, setNovoTodoDescricao] = useState("");
    const [novoTodoPrioridade, setNovoTodoPrioridade] = useState("5");
    const [idSendoEditado, setIdSendoEditado] = useState(null);
    const {ordenarPor, setOrdenarPor} = useState("id");

    //get
    useEffect(() => {
        buscarTarefas();
    }, [ordenarPor]);
    const buscarTarefas = () => {
        fetch(`${API_URL}?ordenarPor=${ordenarPor}`) //faz a requisição http do tipo get para a url
            .then(res => res.json()) //pacote bruto de texto http é convertido pra json
            .then(dados => setTodos(dados))//define as todos
            .catch(erro => console.error("Erro ao buscar tarefas:", erro));
    }

    //funcao q limpa o formulario pra sair do modo edição
    const resetaFormulario = () => {
        setNovoTodoTitulo("");
        setNovoTodoDescricao("");
        setNovoTodoPrioridade("5");
        setIdSendoUsado(null);
    }

    //post e Put
    const handleCriarTarefa = (e) => {
        e.preventDefault();
        if(!novoTodoTitulo.trim()) return;

        const novaTarefa = {
            nome: novoTodoTitulo,
            descricao: novoTodoDescricao,
            prioridade: parseInt(novoTodoPrioridade || 5),
            concluida: false
        };

        if(idSendoEditado != null){
            novaTarefa.id = idSendoEditado;

            fetch(API_URL, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(novaTarefa)
            })
                .then(res => {
                    if(!res.ok) throw new Error("Erro ao atualizar a tarefa");
                        return res.json();
                })
                .then(() => {
                    buscarTarefas();
                    resetaFormulario();
                })
                .catch(erro => console.error("Erro ao atualizar a tarefa", erro));
        }
        else { //metodo post
            fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(novaTarefa)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Erro na resposta do servidor");
                    }
                    return res.json();
                })
                .then(() => {
                    buscarTarefas();
                    resetaFormulario();
                })
                .catch(erro => console.error("Erro ao criar Tarefa: ", erro));
        }
    };

    //funcao q detecta a ediçao - Preenche o formulário com os dados da tarefa clicada
    const prepararEdicao = (todo) => {
        setIdSendoEditado(todo.id);
        setNovoTodoTitulo(todo.nome);
        setNovoTodoDescricao(todo.descricao);
        setNovoTodoPrioridade(todo.prioridade.toString());
    };
        
    const handleApagarTarefa = (id) => {
        if(window.confirm("Tem certeza que deseja apagar a tarefa?")){
            fetch(`${API_URL}/${id}`,{
                method: "DELETE"
            })
                .then(res => {
                    if(!res.ok) throw new Error("Erro ao apagar a tarefa");
                })
                .then(() => {
                    buscarTarefas();
                })
                .catch(erro => console.error("Erro ao apagar a tarefa", erro));
            }
    };

    return(
        <>
            <header>
                <span><img src={logo} className="logo"/></span>
                <nav>
                    <ul className="item">
                        <li><a href="">Início</a></li>
                        <li><a href="">Sobre</a></li>
                        <li><a href="">Perfil({})</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="container">
                    <div className="container-central">
                        <h2>Lista de Tarefas</h2>
                        <form className="container-menu" onSubmit={handleCriarTarefa}>
                            <h3>{idSendoEditado ? "Editar tarefa" : "Adicionar Tarefa"}</h3>
                            
                            <div className="container-input">
                                <div className="field flex-nome">
                                    <label>Nome da Tarefa:</label>
                                    <input
                                    className="input-nome" 
                                    placeholder="Digite aqui..."
                                    value={novoTodoTitulo}
                                    onChange={(e) => setNovoTodoTitulo(e.target.value)}/>
                                </div>

                                <div className="field flex-desc">
                                    <label>Descrição:</label>
                                    <textarea 
                                    className="input-desc" 
                                    placeholder="Digite aqui..."
                                    value={novoTodoDescricao}
                                    onChange={(e) => setNovoTodoDescricao(e.target.value)}/>
                                </div>

                                <div className="field flex-pri">
                                    <label>Prioridade:</label>
                                    <select
                                    className="input-pri"
                                    value={novoTodoPrioridade}
                                    onChange={(e) => setNovoTodoPrioridade(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="container-botoes-form" style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn-add">
                                    {idSendoEditado ? "Salvar Alterações" : "Adicionar"}
                                </button>
                                
                                {idSendoEditado && (
                                    <button type="button" onClick={resetaFormulario} className="btn-cancelar">
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                        <div className="container-detalhes">
                            <div className="container-ordem">
                                <label htmlFor=""><strong>Ordenar por:</strong></label>
                                <select 
                                className="select-ordem"
                                value={ordenarPor}
                                onChange={(e) => setOrdenarPor(e.targed.value)}>
                                    <option value="id">Id</option>
                                    <option value="prioridade">Prioridade</option>
                                </select>
                            </div>
                            <div className="container-classificacao">
                                <label htmlFor=""><strong>Classificação:</strong></label>
                                Alta: de 1 a 3<br></br>
                                Baixa: de 4 a 5
                            </div>
                            
                        </div>
                        <div className="containerlista">
                            <ul className="ul-tarefas">
                                <li className="li-cabecalho">
                                    <span>#</span>
                                </li>
                                <li className="li-cabecalho">
                                    <span>Tarefa</span>
                                </li>
                                <li className="li-cabecalho">
                                    <span>Prioridade</span>
                                </li>
                                <li className="li-cabecalho">
                                    <span>Descrição</span>
                                </li>
                                <li className="li-cabecalho">
                                    <span>Ações</span>
                                </li>
                                {todos.map(todo => (
                                    <li key={todo.id} className="li-tarefas">
                                        <strong>{todo.id}.</strong>
                                        <strong>{todo.nome}</strong>
                                        <span className="span-pri">{todo.prioridade}</span>
                                        <span>{todo.descricao}</span>

                                        <div className="col-acoes">
                                            <button
                                                className="button-edit"
                                                onClick={() => prepararEdicao(todo)}
                                                title="Editar tarefa"
                                                >
                                                <Edit2 size={15}/>
                                            </button>
                                            <button
                                                className="button-trash"
                                                onClick={() => handleApagarTarefa(todo.id)}
                                                title="Excluir tarefa">
                                                <Trash2 size={15}/>
                                            </button>
                                                
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Home