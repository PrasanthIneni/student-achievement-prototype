package com.example.studentactivity.config;

import com.example.studentactivity.model.Activity;
import com.example.studentactivity.model.User;
import com.example.studentactivity.repository.ActivityRepository;
import com.example.studentactivity.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner initDatabase(ActivityRepository activityRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if (userRepo.count() == 0) {
                userRepo.save(new User(null, "admin", encoder.encode("admin"), "Administrator", "ROLE_ADMIN"));
                userRepo.save(new User(null, "student1", encoder.encode("password"), "John Doe", "ROLE_STUDENT"));
            }

            if (activityRepo.count() == 0) {
                activityRepo.save(new Activity(null, "Coding Club", "Master React and Spring Boot", "Club",
                        LocalDateTime.now().plusDays(5), "Lab 101", 30));
                activityRepo.save(new Activity(null, "Basketball Tournament", "Annual inter-departmental match",
                        "Sport", LocalDateTime.now().plusDays(10), "Main Court", 50));
                activityRepo.save(new Activity(null, "Tech Symposium", "Guest lectures from industry experts", "Event",
                        LocalDateTime.now().plusDays(15), "Auditorium", 200));
            }
        };
    }
}
