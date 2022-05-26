package org.atlas.rest;

import java.util.List;

import org.atlas.business.services.ServiceEntitieService;
import org.atlas.persistence.entities.ServiceEntitie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/serviceEntitie")
@CrossOrigin("*")
public class ServiceEntitieController {
	@Autowired
	ServiceEntitieService serviceEntitieService;

	@GetMapping(value = "")
	public List<ServiceEntitie> getAllServiceEntities() {
		return this.serviceEntitieService.findAllServiceEntitie();
	}

	@GetMapping(value = "/get-by-id/{id}")
	public ServiceEntitie getServiceEntitieById(@PathVariable(name = "id") Long id) {
		return this.serviceEntitieService.findById(id);
	}

	@PostMapping(value = "")
	public ServiceEntitie saveServiceEntitie(@RequestBody ServiceEntitie serviceEntitie) {
		return this.serviceEntitieService.saveServiceEntitie(serviceEntitie);
	}
	@PostMapping(value = "/by-entitie/{entitieId}")
	public ServiceEntitie saveServiceByEntitie(@RequestBody ServiceEntitie serviceEntitie,@PathVariable(name="entitieId") Long entitieId) {
		return this.serviceEntitieService.saveServiceByEntitie(serviceEntitie,entitieId);
	}
	@DeleteMapping(value = "/delete/{id}")
	public void deleteById(@PathVariable(name = "id") Long id) {
		this.serviceEntitieService.deleteServiceEntitie(id);
	}

}
