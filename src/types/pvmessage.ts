interface PvMessage{
    id: number;
    pv_id: number;
    sender_id : number;
    message : string;
    seen_at : Date;
    created_at : Date;
}

interface GroupMessage{
    id : number;
    group_id : number;
    message :string;
    sender_id : number;
    created_at : Date;
}