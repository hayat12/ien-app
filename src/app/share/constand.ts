export class Pagination{
    public static PAGE_SIZE = 15;
    public static VERTICAL_PAGE_SIZE = 5;
}

export class Sort{
    asc = "ASC";
    desc = "DESC";
    constructor(asc:string, desc:string){
        this.asc = asc;
        this.desc = desc;
    }
}