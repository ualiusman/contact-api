import { ContactResponseModel } from "../../models/contact";

export interface GetOneContactUseCase{
    execute(id:string):Promise<ContactResponseModel | null>;
}