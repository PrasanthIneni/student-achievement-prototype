package com.example.studentactivity.service;

import com.example.studentactivity.model.Registration;
import com.example.studentactivity.model.User;
import com.example.studentactivity.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {
    @Autowired
    private RegistrationRepository registrationRepository;

    public Registration registerForActivity(Registration registration) {
        registration.setRegisteredAt(LocalDateTime.now());
        registration.setStatus("REGISTERED");
        return registrationRepository.save(registration);
    }

    public List<Registration> getStudentRegistrations(User student) {
        return registrationRepository.findByStudent(student);
    }

    public List<Registration> getRegistrationsByStudent(String username) {
        return registrationRepository.findByStudent_Username(username);
    }
}
