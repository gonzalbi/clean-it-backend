export interface BasicInspection {
    id_inspection : string,
}

export class Inspection implements BasicInspection {
    id_inspection : string
    id_operation : string
    img_path : string
    score : number
    date : string
    id_user : string

    constructor(id_operation :string, score:number, imgpath:string,date:string,id_user? : string,id_inspection?:string){
        this.id_inspection = id_inspection,
        this.id_operation = id_operation,
        this.score = score;
        this.img_path = imgpath;
        this.date = date;
        this.id_user = id_user 
    }
}