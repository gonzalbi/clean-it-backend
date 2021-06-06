class Location {
    Name = "";
    Sectors = [];

    constructor(name, sectors){
        this.Name = name;
        this.Sectors.push(sectors);
    }

    addSector(sector){
        this.Sectors.push(sector)
    }

    getName(){
        return this.Name; 
    }

    getSectors(){
        return this.Sectors;
    }
}

module.exports = Location