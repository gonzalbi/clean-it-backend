class Sector {
    Id = "";
    Name = "";
    SubSectors = [];

    constructor(id,name, subsectors){
        this.Id = id;
        this.Name = name;
        this.SubSectors.push(subsectors);
    }

    getName(){
        return this.Name; 
    }

    getId(){
        return this.Id;
    }

    addSubSector(subsector){
        this.SubSectors.push(subsector);
    }
}

module.exports = Sector