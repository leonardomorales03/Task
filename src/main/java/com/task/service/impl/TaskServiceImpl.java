package com.task.service.impl;

import com.task.model.Task;
import com.task.repository.TaskRepository;
import com.task.service.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    @Transactional
    public Task create(Task task) {
        if (task.getCompleted() == null) {
            task.setCompleted(false);
        }
        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public Task update(Long id, Task task) {
        task.setId(id);
        if (task.getCompleted() == null) {
            task.setCompleted(false);
        }
        return taskRepository.save(task);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return taskRepository.existsById(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
}
