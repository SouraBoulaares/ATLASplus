package org.atlas.business.services;

import org.atlas.persistence.entities.Services;
import org.atlas.persistence.repositories.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {
    @Autowired
    ServicesRepository servicesRepository;


    public List<Services> findAllServices()
     {
         return this.servicesRepository.findAll();
     }
    public Services findById(Long id )
      {
         return this.servicesRepository.findById(id).get();
      }
    public Services saveService(Services services)
    {
        return this.servicesRepository.save(services);
    }
    public void deleteServices(Long id)
    {
        this.servicesRepository.deleteById(id);
    }
}
