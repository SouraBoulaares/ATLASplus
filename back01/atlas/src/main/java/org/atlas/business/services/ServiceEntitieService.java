package org.atlas.business.services;

import java.util.List;

import org.atlas.persistence.entities.ServiceEntitie;
import org.atlas.persistence.repositories.ServiceEntitieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceEntitieService {
	@Autowired
	ServiceEntitieRepository serviceEntitieRepository;
	@Autowired
	EntitieService entitieService;

	public List<ServiceEntitie> findAllServiceEntitie() {
		return this.serviceEntitieRepository.findAll();
	}

	public ServiceEntitie findById(Long id) {
		return this.serviceEntitieRepository.findById(id).get();
	}

	public ServiceEntitie saveServiceEntitie(ServiceEntitie serviceEntitie) {
		return this.serviceEntitieRepository.save(serviceEntitie);
	}

	public void deleteServiceEntitie(Long id) {
		this.serviceEntitieRepository.deleteById(id);
	}

	public ServiceEntitie saveServiceByEntitie(ServiceEntitie serviceEntitie, Long entitieId) {
		serviceEntitie.setEntitie(entitieService.findById(entitieId));
		return this.serviceEntitieRepository.save(serviceEntitie);
	}

}
