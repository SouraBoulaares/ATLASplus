package org.atlas.dtos;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name="Service")
public class Services {
	private Long ID;
	private String Name;
	private String Type;
	private String Description;
	private Keywords keywords;
	private Inputs Inputs;
	private outputt output;

	@XmlAttribute(name="id")
	public Long getID() {
		return ID;
	}
	public void setID(Long iD) {
		ID = iD;
	}
	@XmlElement(name="Name")
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	@XmlElement(name="Type")
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	@XmlElement(name="Description")
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	@XmlElement(name="Keywords")
	public Keywords getKeywords() {
		return keywords;
	}
	public void setKeywords(Keywords keywords) {
		this.keywords = keywords;
	}
	@XmlElement(name="Inputs")
	public Inputs getInputs() {
		return Inputs;
	}
	public void setInputs(Inputs inputs) {
		Inputs = inputs;
	}
	@XmlElement(name="output")
	public outputt getOutput() {
		return output;
	}
	public void setOutput(outputt output) {
		this.output = output;
	}
	
}
