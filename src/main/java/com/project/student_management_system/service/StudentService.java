package com.project.student_management_system.service;

import com.project.student_management_system.entity.Student;
import com.project.student_management_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public Student updateStudent(Long id, Student newStudent) {

        return repository.findById(id).map(existing -> {

            existing.setName(newStudent.getName());
            existing.setEmail(newStudent.getEmail());
            existing.setCourse(newStudent.getCourse());

            return repository.save(existing);

        }).orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }
}