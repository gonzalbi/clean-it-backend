import { Operation } from "./Operation";

export interface BasicSubsector {
    id_subsector : string,
}

export class SubSector implements BasicSubsector{
    id_subsector: string;
    name : string;
    Operations? : Operation[]

    constructor(id: string,name :string, operations? : Operation[]){
        this.id_subsector = id;
        this.name = name;
        this.Operations = operations ? operations : [];
    }

}
