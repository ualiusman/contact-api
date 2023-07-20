import { ContactDataSource } from "../../data/interfaces/data-sources/contact-data-source";
import { ContactRepository } from "../interfaces/respositories/contract-respository";
import { ContactRequestModel, ContactResponseModel } from "../models/contact";

export class ContactRepositoryImpl implements ContactRepository {
    contactDataSource: ContactDataSource
    constructor(contactDataSource: ContactDataSource) {
        this.contactDataSource = contactDataSource
    }
    async deleteContact(id: String) {
        await this.contactDataSource.deleteOne(id)
    }
    async updateContact(id: String, data: ContactRequestModel) {
        await this.contactDataSource.updateOne(id, data);
    }
    async getContact(id: String): Promise<ContactResponseModel | null> {
        const result = await this.contactDataSource.getOne(id);
        return result;
    }

    async createContact(contact: ContactRequestModel) {
        await this.contactDataSource.create(contact)

    }
    async getContacts(): Promise<ContactResponseModel[]> {
        const result = await this.contactDataSource.getAll()
        return result;
    }
}