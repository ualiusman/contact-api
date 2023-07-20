import { ContactRepository } from "../../interfaces/respositories/contract-respository";
import { CreateContacatUseCase } from "../../interfaces/use-cases/create-contact-use-case";
import { ContactRequestModel } from "../../models/contact";

export class CreateContact implements CreateContacatUseCase{
    contactRepository:ContactRepository;
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository;
    }

    async execute(contact: ContactRequestModel) {
      await  this.contactRepository.createContact(contact);
    }
    
}