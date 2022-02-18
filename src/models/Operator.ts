export interface BasicOperator {
    id_operator : string,
}

export class Operator implements BasicOperator {
    id_operator: string;
    name : string;
    last_name :string;
    full_name : string;

    constructor(id:string,name:string,last_name:string,full_name:string){
        this.id_operator = id;
        this.name = name;
        this.last_name = last_name;
        this.full_name = full_name;
    }    
}
