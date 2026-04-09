package com.example.studentactivity.service;

import com.example.studentactivity.model.User;
import com.example.studentactivity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {
        System.out.println("Processing registration for: " + user.getUsername());
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            System.out.println("Registration failed: Username already exists");
            throw new RuntimeException("Username already exists");
        }
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            System.out.println("Password encoded. Saving user...");
            User savedUser = userRepository.save(user);
            System.out.println("User saved successfully with ID: " + savedUser.getId());
            return savedUser;
        } catch (Exception e) {
            System.out.println("Registration error during save: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(userDetails.getFullName());
        user.setRollNo(userDetails.getRollNo());
        user.setBranch(userDetails.getBranch());
        user.setSemester(userDetails.getSemester());
        user.setLinkedInUrl(userDetails.getLinkedInUrl());
        user.setMobileNumber(userDetails.getMobileNumber());
        user.setEmail(userDetails.getEmail());

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        return userRepository.save(user);
    }
}
