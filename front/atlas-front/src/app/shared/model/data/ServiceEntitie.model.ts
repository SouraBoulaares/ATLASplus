import { Output } from "@angular/core";
import { Input } from "./Input.model";
import { Keyword } from "./keyword.model";

export class ServiceEntitie {
    serviceId: number;
    id:number;
    serviceName: String;
    serviceType: String;
    serviceDescription: String;
    serviceCategory:String;
    keywords: Keyword[];
    inputs: Input[];
    serviceOutput: Output;
    serviceIsConfigurable : boolean;
}