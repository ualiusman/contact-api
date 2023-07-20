import { ContactRequestModel } from "../../models/contact";

export interface UpdateContactUseCase{
    execute(id:string, data: ContactRequestModel):void;
}