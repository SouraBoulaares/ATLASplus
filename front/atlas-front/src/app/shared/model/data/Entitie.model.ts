import { ServiceEntitie } from "./ServiceEntitie.model";

export class Entitie {
	entitieId: number;
	id:String;
	entitieName: String;
	entitieOwner: String;
	entitieVendor: String;
	entitieCategory: String;
	entitieType: String;
	entitieDescription: string;
	entitieServices: ServiceEntitie[];
}