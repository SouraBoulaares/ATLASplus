package org.atlas.rest;

import org.atlas.business.services.ServicesService;
import org.atlas.persistence.entities.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin
public class ServicesController {
    @Autowired
    ServicesService servicesService;

    @GetMapping(value = "")
    public List<Services> getAllServices()
    {
        return  this.servicesService.findAllServices();
    }
    @GetMapping(value = "/get-by-id/{id}")
    public Services getServicesById(@PathVariable(name = "id")Long id) {
    return this.servicesService.findById(id);
    }
    @PostMapping(value = "")
    public Services saveServices(@RequestBody Services services)
    {
        return this.servicesService.saveService(services);
    }
    @DeleteMapping(value = "/delete/{id}")
    public void deleteById(@PathVariable(name = "id") Long id)
    {
        this.servicesService.deleteServices(id);
    }

}
