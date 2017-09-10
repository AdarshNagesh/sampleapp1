export class User {
    active: boolean;

    constructor(public userId: number,
                public Emp_Id: string,
                public username: string,
                public First_name: string,
                public Last_name: string,
                public Email: string,
                public Branch_Id: string,
                public Role: string,
                public savedtoDB:boolean=false) {
        this.active = false;
    }
}