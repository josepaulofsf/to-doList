package com.example.todolist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todolist.entity.Todo;
import com.example.todolist.service.TodoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5173/")
public class TodoController {
    private TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @PostMapping
    public List<Todo> create(@RequestBody @Valid Todo todo){
        return todoService.create(todo);
    }

    @PutMapping
    public List<Todo> update(@RequestBody Todo todo){
        return todoService.update(todo);
    }
    
    @DeleteMapping("{id}")   //id é o parametro que vai ser recuperado da requesicao
    public List<Todo> remove(@PathVariable Long id){ // depois sera injetado no metodo
        return todoService.remove(id);
    }
    
    @GetMapping
    public List<Todo> list(){
        return todoService.list();
    }
}
