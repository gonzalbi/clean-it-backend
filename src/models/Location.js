class Location {
    Id = "";
    Name = "";
    Sectors = [];

    constructor(id,name, sectors){
        this.Id = id;
        this.Name = name;
        this.Sectors.push(sectors);
    }

    addSector(sector){
        this.Sectors.push(sector)
    }

    getId(){
        return this.Id;
    }

    getName(){
        return this.Name; 
    }

    getSectors(){
        return this.Sectors;
    }
}

module.exports = Location