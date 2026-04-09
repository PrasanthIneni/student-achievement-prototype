package com.example.studentactivity.controller;

import com.example.studentactivity.model.Activity;
import com.example.studentactivity.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    @Autowired
    private ActivityService activityService;

    @GetMapping
    public List<Activity> getAll() {
        return activityService.getAllActivities();
    }

    @PostMapping
    public Activity create(@RequestBody Activity activity) {
        return activityService.createActivity(activity);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id, @RequestBody Activity activity) {
        return activityService.updateActivity(id, activity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        activityService.deleteActivity(id);
    }
}
