class Sector {
    Name = "";
    SubSectors = [];

    constructor(name, subsectors){
        this.Name = name;
        this.SubSectors.push(subsectors);
    }

    getName(){
        return this.Name; 
    }

    addSubSector(subsector){
        this.SubSectors.push(subsector);
    }
}

module.exports = Sector