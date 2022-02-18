import { Operator } from "./Operator";
import { SubSector } from "./SubSector";

export interface BasicSector {
    id_sector : string,
}


export class Sector implements BasicSector {
    id_sector : string
    name : string;
    Subsectors? : SubSector[];
    Operators? : Operator[]

    constructor(id: string,name:string, subsectors? : SubSector[], operators? : Operator[]){
        this.id_sector = id;
        this.name = name;
        this.Subsectors = subsectors ? subsectors : []
        this.Operators = operators ? operators : []
    }

}