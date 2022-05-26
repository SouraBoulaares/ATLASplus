package org.atlas.dtos;


import javax.xml.bind.annotation.XmlAttribute;  
import javax.xml.bind.annotation.XmlElement;  
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name="Descriptive_Metadata")
public class DescriptiveMetadata {

private String id;
private String Name;
private String Owner;
private String Vendor;
private String Category;
private String Type;
private String Description;
@XmlElement(name="ID")
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}

@XmlElement(name="Name")
public String getName() {
	return Name;
}
public void setName(String name) {
	Name = name;
}
@XmlElement(name="Owner")
public String getOwner() {
	return Owner;
}
public void setOwner(String owner) {
	Owner = owner;
}
@XmlElement(name="Vendor")
public String getVendor() {
	return Vendor;
}
public void setVendor(String vendor) {
	Vendor = vendor;
}
@XmlElement(name="Category")
public String getCategory() {
	return Category;
}
public void setCategory(String category) {
	Category = category;
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

}
