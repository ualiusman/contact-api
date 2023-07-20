import { ContactRepository } from "../../interfaces/respositories/contract-respository";
import { DeleteContactUseCase } from "../../interfaces/use-cases/delete-contact-use-case";

export class DeleteContact implements DeleteContactUseCase {
    contactRepository:ContactRepository;
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository;
    }
    async execute(id: string) {
        await this.contactRepository.deleteContact(id);
    }
    
}