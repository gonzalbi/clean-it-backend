class Inspection {
    Id;
    Name;
    Score;
    ImgPath;
    Date;
    constructor(id, name,score,imgpath,date){
        this.Id = id,
        this.Name = name,
        this.Score = score;
        this.ImgPath = imgpath;
        this.Date = date;
    }
}

module.exports = Inspection;