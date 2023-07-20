import { ContactRepository } from "../../interfaces/respositories/contract-respository";
import { GetAllContactsUseCase } from "../../interfaces/use-cases/get-all-contacts-use-case";
import { ContactResponseModel } from "../../models/contact";

export class GetAllContacts implements GetAllContactsUseCase {
    contactRepository:ContactRepository;
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository;
    }
    async execute(): Promise<ContactResponseModel[]> {
        const contacts = await this.contactRepository.getContacts(); 
        return contacts;
    }
    
}