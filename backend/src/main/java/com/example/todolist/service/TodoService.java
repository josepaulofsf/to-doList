package com.example.todolist.service;

//import com.sun.org.apache.xalan.internal.xsltc.compiler.Sort;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.todolist.entity.Todo;
import com.example.todolist.repository.TodoRepository;

@Service
public class TodoService{
    private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    public Todo create(Todo todo){
        return todoRepository.save(todo);
    }

    public Todo update(Todo todo){
        return todoRepository.save(todo);
    }

    public void remove(Long id){
        todoRepository.deleteById(id);
    }

    public List<Todo> list(String ordenarPor){
        if ("prioridade".equalsIgnoreCase(ordenarPor)) {
        return todoRepository.findAll(Sort.by(Sort.Direction.DESC, "prioridade"));
        }
        // Padrão: por ID crescente (ordem de inserção)
        return todoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

}
