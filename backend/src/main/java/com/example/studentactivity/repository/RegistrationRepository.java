package com.example.studentactivity.repository;

import com.example.studentactivity.model.Registration;
import com.example.studentactivity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudent(User student);

    List<Registration> findByStudent_Username(String username);
}
