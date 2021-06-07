class SubSector {
    Id = "";
    Name = "";
    Operations = {};

    constructor(id,name, operations = null){
        this.Id = id;
        this.Name = name;
        this.Operations = operations;
    }

    getId(){
        return this.Id;
    }
}

module.exports = SubSector