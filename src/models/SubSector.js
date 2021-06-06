class SubSector {
    Name = "";
    Operations = {};

    constructor(name, operations = null){
        this.Name = name;
        this.Operations = operations;
    }
}

module.exports = SubSector