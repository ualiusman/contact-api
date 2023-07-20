import { ContactRepository } from "../../interfaces/respositories/contract-respository";
import { GetOneContactUseCase } from "../../interfaces/use-cases/get-one-contact-use-case";
import { ContactResponseModel } from "../../models/contact";

export class GetOneContact implements GetOneContactUseCase {
    contactRepository: ContactRepository;
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository;
    }
    async execute(id: string): Promise<ContactResponseModel | null> {
       const contact = await this.contactRepository.getContact(id);
       return contact;
    }
    
}