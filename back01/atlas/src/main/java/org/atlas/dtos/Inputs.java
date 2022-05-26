package org.atlas.dtos;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name="Inputs")
public class Inputs {
private List<Inputt> Inputs;
@XmlElement(name="Input")
public List<Inputt> getInputs() {
	return Inputs;
}

public void setInputs(List<Inputt> inputs) {
	Inputs = inputs;
}

}
