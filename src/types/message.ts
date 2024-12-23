export class NewMessage{
    reciever_id:number;
    message : string;
    
    action_type = 0;
    target_type : 0 | 1;
    constructor( reciever_id:number, message : string,target_type : 0|1){
        this.reciever_id=reciever_id;
        this.message=message;
        this.target_type = target_type;
    }
}