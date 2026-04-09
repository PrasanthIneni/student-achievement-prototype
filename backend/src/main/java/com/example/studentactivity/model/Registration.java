package com.example.studentactivity.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private Activity activity;

    private LocalDateTime registeredAt;
    private String status; // REGISTERED, COMPLETED, CANCELLED

    private String residenceType; // Hosteller, Day Scholar
    private String branch; // CSE, ECE, EEE, MECH, etc.
    private String certificateName;

    public Registration() {
    }

    public Registration(Long id, User student, Activity activity, LocalDateTime registeredAt, String status,
            String residenceType, String branch, String certificateName) {
        this.id = id;
        this.student = student;
        this.activity = activity;
        this.registeredAt = registeredAt;
        this.status = status;
        this.residenceType = residenceType;
        this.branch = branch;
        this.certificateName = certificateName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResidenceType() {
        return residenceType;
    }

    public void setResidenceType(String residenceType) {
        this.residenceType = residenceType;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCertificateName() {
        return certificateName;
    }

    public void setCertificateName(String certificateName) {
        this.certificateName = certificateName;
    }
}
