import { ContactRequestModel } from "../../models/contact";

export interface CreateContacatUseCase{
    execute(contact: ContactRequestModel):void;
}