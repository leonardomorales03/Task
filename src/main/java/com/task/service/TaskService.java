package com.task.service;

import com.task.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<Task> findAll();

    Optional<Task> findById(Long id);

    Task create(Task task);

    Task update(Long id, Task task);

    boolean existsById(Long id);

    void deleteById(Long id);
}
