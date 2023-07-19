import { ContactRequestModel, ContactResponseModel } from "../../models/contact";

export interface ContactRepository{
    createContact(contact:ContactRequestModel):void;
    deleteContact(id:string):void;
    updateContact(id:string, data: ContactRequestModel):void;
    getContacts(): Promise<ContactResponseModel[]>;
    getContact(id:string): Promise<ContactResponseModel | null>;
}