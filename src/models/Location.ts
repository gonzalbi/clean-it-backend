import { Sector } from "./Sector";

export interface BasicLocation {
    id_location : string,
}

export class Location implements BasicLocation {
    id_location : string
    name : string;
    Sectors? : Sector[];

    constructor(id: string,name: string, sectors? : Sector[]){
        this.id_location = id;
        this.name = name;
        this.Sectors = sectors
       
    }

    addSector(sector){
        this.Sectors.push(sector)
    }

    getId(){
        return this.id_location;
    }

    getName(){
        return this.name; 
    }

    getSectors(){
        return this.Sectors;
    }
}