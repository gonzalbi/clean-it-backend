class Operator {
    Id = "";
    Name = "";
    LastName = "";
    FullName = "";

    constructor(id,name,last_name,full_name){
        this.Id = id;
        this.Name = name;
        this.LastName = last_name;
        this.FullName = full_name;
    }

    
    getFullName(){
        return this.FullName; 
    }
    
    getLastName(){
        return this.LastName; 
    }

    getName(){
        return this.Name; 
    }

    getId(){
        return this.Id;
    }

}

module.exports = Operator