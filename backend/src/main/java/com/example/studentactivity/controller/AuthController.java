package com.example.studentactivity.controller;

import com.example.studentactivity.model.User;
import com.example.studentactivity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        System.out.println("Login attempt for user: " + loginRequest.getUsername());
        Optional<User> user = userService.findByUsername(loginRequest.getUsername());
        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.get().getId());
            response.put("username", user.get().getUsername());
            response.put("role", user.get().getRole());
            response.put("fullName", user.get().getFullName());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid Authentication");
    }
}
