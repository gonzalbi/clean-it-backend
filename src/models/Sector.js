class Sector {
    Id = "";
    Name = "";
    SubSectors = [];

    constructor(id,name, subsectors = null){
        this.Id = id;
        this.Name = name;
        
        if(subsectors) this.SubSectors.push(subsectors);;
        
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