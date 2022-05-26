package org.atlas.business.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.atlas.dtos.Entity;
import org.atlas.dtos.Inputs;
import org.atlas.dtos.Inputt;
import org.atlas.dtos.Keywords;
import org.atlas.dtos.Services;
import org.atlas.persistence.entities.Entitie;
import org.atlas.persistence.entities.Input;
import org.atlas.persistence.entities.Keyword;
import org.atlas.persistence.entities.Output;
import org.atlas.persistence.entities.ServiceEntitie;
import org.atlas.persistence.repositories.EntitieRepository;
import org.atlas.persistence.repositories.ServiceEntitieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

@Service
public class EntitieService {
	@Autowired
	EntitieRepository entitieRepository;
	@Autowired
	ServiceEntitieRepository servEntitieRepository;

	public List<Entitie> findAllEntitie() {
		return this.entitieRepository.findAll();
	}

	public Entitie findById(Long id) {
		return this.entitieRepository.findById(id).get();
	}

	public Entitie saveEntitie(Entitie entitie) {
		return this.entitieRepository.save(entitie);
	}

	public void deleteEntitie(Long id) {
		this.entitieRepository.deleteById(id);
	}

	public void importEntitiesFromExcelFile(MultipartFile file) throws IOException {

		File convFile = new File(file.getOriginalFilename());
		convFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();

		try {

			JAXBContext jaxbContext = JAXBContext.newInstance(Entity.class);

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			Entity entitie = (Entity) jaxbUnmarshaller.unmarshal(convFile);
			Entitie entitieToSave = new Entitie();
			
			entitieToSave.setId(entitie.getDescriptive_Metadata().getId());
			
			entitieToSave.setEntitieName(entitie.getDescriptive_Metadata().getName() );
			entitieToSave.setEntitieOwner(entitie.getDescriptive_Metadata().getOwner()); 
			entitieToSave.setEntitieVendor(entitie.getDescriptive_Metadata().getVendor());
			entitieToSave.setEntitieCategory(entitie.getDescriptive_Metadata().getCategory());
			entitieToSave.setEntitieType(entitie.getDescriptive_Metadata().getType());
			
			String desc = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"align\":null},\"content\":[{\"type\":\"text\",\"text\":\""
					+entitie.getDescriptive_Metadata().getDescription()+"\"}]}]}";
			entitieToSave.setEntitieDescription(desc);
			List<Services> list = entitie.getResource_Service().getServices();
			List<ServiceEntitie> servList = new ArrayList<ServiceEntitie>();
			for (Services serv : list) {
				ServiceEntitie servEnt = new ServiceEntitie();
				servEnt.setId(serv.getID());
				servEnt.setServiceName(serv.getName());
				servEnt.setServiceType(serv.getType()); 
				servEnt.setServiceDescription(serv.getDescription());
				servEnt.setServiceIsConfigurable(false);
				List<Keyword>  keywordss = new ArrayList<Keyword>();
				if(serv.getKeywords()!=null) {
				for (String key : serv.getKeywords().getKeywords()) {
					Keyword keyword = new Keyword();
					keyword.setKeywordLabel(key);
					keywordss.add(keyword);
				}
				servEnt.setKeywords(keywordss);
				}
				List<Input> inputss = new ArrayList<Input>();
				if(serv.getInputs()!=null) {
				for (Inputt put : serv.getInputs().getInputs()) {
					Input input = new Input();
					
					input.setId(put.getID());
					input.setInputType(put.getType());
					input.setInputDescription(put.getDescription());
					inputss.add(input);
				}
				servEnt.setInputs(inputss);
				}
				Output output= new Output();
				output.setOutputType(serv.getOutput().getType());
				output.setOutputDescription(serv.getOutput().getDescription());
				servEnt.setServiceOutput(output);
				servList.add(servEnt);
				
			}

			Entitie entitieSaved  = this.saveEntitie(entitieToSave);
			
			for(ServiceEntitie serv  : servList) serv.setEntitie(entitieSaved);
			entitieSaved.setEntitieServices(servList);
			this.saveEntitie(entitieSaved);
			
		} catch (JAXBException e) {
			e.printStackTrace();
		}

	}
}
