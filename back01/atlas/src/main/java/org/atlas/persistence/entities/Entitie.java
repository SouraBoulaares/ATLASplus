package org.atlas.persistence.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "atlas_entitie")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Entitie extends AuditableSql implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long entitieId;
	
	private String id;
	private String entitieName;
	private String entitieOwner;
	private String entitieVendor;
	private String entitieCategory;
	private String entitieType;
	@Column(length = 999999999)
	private String entitieDescription;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "entitie")
	
	List<ServiceEntitie> entitieServices = new ArrayList<>();
	
	
}
