class Sector {
    Id = "";
    Name = "";
    SubSectors = [];
    Operators = []

    constructor(id,name, subsectors = null, operator = null){
        this.Id = id;
        this.Name = name;
        
        if(subsectors) this.SubSectors.push(subsectors);
        if(operator) this.Operators.push(operator);
        
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

    addOperator(operator){
        this.Operators.push(operator)
    }
}

module.exports = Sector