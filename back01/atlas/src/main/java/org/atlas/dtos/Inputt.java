package org.atlas.dtos;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name="Input")
public class Inputt {
	private Long ID;
	private String Type;
	private String Description;
	@XmlAttribute(name="id")
	public Long getID() {
		return ID;
	}
	public void setID(Long iD) {
		ID = iD;
	}
	@XmlElement(name="type")
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	@XmlElement(name="description")
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	
}
