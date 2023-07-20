import { ContactRepository } from "../../interfaces/respositories/contract-respository";
import { UpdateContactUseCase } from "../../interfaces/use-cases/update-contact-use-case";
import { ContactRequestModel } from "../../models/contact";

export class UpdateContact implements UpdateContactUseCase{
    contactRepository:ContactRepository;
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository;
    }
    async execute(id: string, data: ContactRequestModel) {
        this.contactRepository.updateContact(id,data);
    }
    
}