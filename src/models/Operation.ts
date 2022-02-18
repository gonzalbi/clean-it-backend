
export interface BasicOperation {
    id_operation : string,
}

export class Operation implements BasicOperation{
    id_operation : string
    name :string

    constructor(id :string,name :string){
        this.id_operation = id;
        this.name = name;
    }
}
