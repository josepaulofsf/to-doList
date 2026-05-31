import { useState, useEffect } from "react";
import './../styles/Home.css'
import logo from './../assets/log.png'

const API_URL = "http://localhost:8080/todos"

function Home(){

    const [novoTodoTitulo, setNovoTodoTitulo] = useState("");
    const [todos, setTodos] = useState([]);
    const [novoTodoDescricao, setNovoTodoDescricao] = useState("");
    const [novoTodoPrioridade, setNovoTodoPrioridade] = useState("");

    //get
    useEffect(() => {
        buscarTarefas();
    }, []);
    const buscarTarefas = () => {
        fetch(API_URL) //faz a requisição http do tipo get para a url
            .then(res => res.json()) //pacote bruto de texto http é convertido pra json
            .then(dados => setTodos(dados))//define as todos
            .catch(erro => console.error("Erro ao buscar tarefas:", erro));
    }

    //post
    const handleCriarTarefa = (e) => {
        e.preventDefault();
        if(!novoTodoTitulo.trim()) return;

        const novaTarefa = {
            nome: novoTodoTitulo,
            descricao: novoTodoDescricao,
            prioridade: parseInt(novoTodoPrioridade || 1),
            concluida: false
        };

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
            .then((listaAtualizada) => {
                setTodos(listaAtualizada)
                setNovoTodoTitulo("");
                setNovoTodoDescricao("");
                setNovoTodoPrioridade("1");
            })
            .catch(erro => console.error("Erro ao criar Tarefa: ", erro));
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
                            <h3>Adicionar nova Tarefa</h3>
                            
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
                            
                            <button type="submit" className="btn-add">Adicionar</button>
                        </form>
                        <div className="containerlista">
                            <ul>
                                {todos.map(todo => (
                                    <li key={todo.id}>
                                        <strong>{todo.nome}</strong> (P{todo.prioridade})
                                        {todo.descricao && <p>{todo.descricao}</p>}
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