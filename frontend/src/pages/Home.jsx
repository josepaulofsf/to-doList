import { useState, useEffect } from "react";
import './../styles/Home.css'
import logo from './../assets/log.png'

const API_URL = ""

function Home(){
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
                        <form className="container-menu" onSubmit={(e) => e.preventDefault()}>
                            <h3>Adicionar nova Tarefa</h3>
                            
                            <div className="container-input">
                                <div className="field flex-nome">
                                    <label>Nome da Tarefa:</label>
                                    <input className="input-nome" placeholder="Digite aqui..." />
                                </div>

                                <div className="field flex-desc">
                                    <label>Descrição:</label>
                                    <textarea className="input-desc" placeholder="Digite aqui..." />
                                </div>

                                <div className="field flex-pri">
                                    <label>Prioridade:</label>
                                    <select className="input-pri">
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
                        outro troço aleatorio
                    </div>
                </div>
            </main>
        </>
    )
}
export default Home