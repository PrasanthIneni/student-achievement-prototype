package com.example.studentactivity.service;

import com.example.studentactivity.model.Activity;
import com.example.studentactivity.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity details) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        activity.setName(details.getName());
        activity.setDescription(details.getDescription());
        activity.setCategory(details.getCategory());
        activity.setScheduledAt(details.getScheduledAt());
        activity.setLocation(details.getLocation());
        activity.setCapacity(details.getCapacity());

        return activityRepository.save(activity);
    }

    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
