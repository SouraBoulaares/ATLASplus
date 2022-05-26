package org.atlas.dtos;

import javax.xml.bind.annotation.XmlRootElement;

import javax.xml.bind.annotation.XmlAttribute;  
import javax.xml.bind.annotation.XmlElement;  
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name="Entity")
public class Entity {
private DescriptiveMetadata Descriptive_Metadata;
private ResourceService Resource_Service;
@XmlElement(name="Descriptive_Metadata")
public DescriptiveMetadata getDescriptive_Metadata() {
	return Descriptive_Metadata;
}
public void setDescriptive_Metadata(DescriptiveMetadata descriptive_Metadata) {
	Descriptive_Metadata = descriptive_Metadata;
}
@XmlElement(name="Resource_Service")
public ResourceService getResource_Service() {
	return Resource_Service;
}
public void setResource_Service(ResourceService resource_Service) {
	Resource_Service = resource_Service;
}

}
