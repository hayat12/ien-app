export class BaseEntity{
    id: number
}
export class SignUp implements BaseEntity{
    id: number;
    username:string;
    password: string;
    constructor(id:number){
        this.id = id;
    }
}