package org.atlas.rest;

import java.io.IOException;
import java.util.List;

import org.atlas.business.services.EntitieService;
import org.atlas.persistence.entities.Entitie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/entitie")
@CrossOrigin
public class EntitieController {
	@Autowired
	EntitieService entitieService;

	@GetMapping(value = "")
	public List<Entitie> getAllEntitie() {
		return this.entitieService.findAllEntitie();
	}

	@GetMapping(value = "/get-by-id/{id}")
	public Entitie getEntitieById(@PathVariable(name = "id") Long id) {
		return this.entitieService.findById(id);
	}

	@PostMapping(value = "")
	public Entitie saveEntitie(@RequestBody Entitie Entitie) {
		return this.entitieService.saveEntitie(Entitie);
	}

	@DeleteMapping(value = "/delete/{id}")
	public void deleteById(@PathVariable(name = "id") Long id) {
		this.entitieService.deleteEntitie(id);
	}
	@CrossOrigin
	@PostMapping(value = "/import",headers = {"content-type=multipart/mixed", "content-type=multipart/form-data"},consumes = {"multipart/form-data"})
	public void importEntitiesFromExcelFile(@RequestParam("file") MultipartFile file) throws IOException {
		this.entitieService.importEntitiesFromExcelFile(file);
	}
}
