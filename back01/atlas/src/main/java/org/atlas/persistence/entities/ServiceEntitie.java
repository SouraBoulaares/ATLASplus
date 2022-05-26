package org.atlas.persistence.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "atlas_service_entitie")

public class ServiceEntitie extends AuditableSql implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long serviceId;
	private Long id;
	private String serviceName;
	private String serviceType;

	private String serviceCategory;
	private String serviceDescription;
	@OneToMany(cascade = CascadeType.ALL)
	List<Keyword> keywords = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL)
	List<Input> inputs = new ArrayList<>();
	@OneToOne(cascade = CascadeType.ALL)
	private Output serviceOutput;
	  private Boolean serviceIsConfigurable;

	@ManyToOne
	@JsonIgnoreProperties("entitieServices")

	private Entitie entitie;

	public Long getServiceId() {
		return serviceId;
	}

	public void setServiceId(Long serviceId) {
		this.serviceId = serviceId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getServiceCategory() {
		return serviceCategory;
	}

	public void setServiceCategory(String serviceCategory) {
		this.serviceCategory = serviceCategory;
	}

	public String getServiceDescription() {
		return serviceDescription;
	}

	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}

	public List<Keyword> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<Keyword> keywords) {
		this.keywords = keywords;
	}

	public List<Input> getInputs() {
		return inputs;
	}

	public void setInputs(List<Input> inputs) {
		this.inputs = inputs;
	}

	public Output getServiceOutput() {
		return serviceOutput;
	}

	public void setServiceOutput(Output serviceOutput) {
		this.serviceOutput = serviceOutput;
	}

	public Boolean getServiceIsConfigurable() {
		return serviceIsConfigurable;
	}

	public void setServiceIsConfigurable(Boolean serviceIsConfigurable) {
		this.serviceIsConfigurable = serviceIsConfigurable;
	}

	public Entitie getEntitie() {
		return entitie;
	}

	public void setEntitie(Entitie entitie) {
		this.entitie = entitie;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
