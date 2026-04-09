package com.example.studentactivity.controller;

import com.example.studentactivity.model.Registration;
import com.example.studentactivity.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public Registration register(@RequestBody Registration registration) {
        return registrationService.registerForActivity(registration);
    }

    @GetMapping("/student/{username}")
    public List<Registration> getByStudent(@PathVariable String username) {
        return registrationService.getRegistrationsByStudent(username);
    }
}
