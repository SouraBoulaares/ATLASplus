package org.atlas.dtos;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name="Resource_Service")
public class ResourceService {
private List<Services> services;
@XmlElement(name="Service")
public List<Services> getServices() {
	return services;
}

public void setServices(List<Services> services) {
	this.services = services;
}


}
