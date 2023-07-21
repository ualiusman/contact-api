import { ContactDataSource } from "../../../src/data/interfaces/data-sources/contact-data-source";
import { ContactRequestModel, ContactResponseModel } from "../../../src/domain/models/contact";
import { ContactRepositoryImpl } from "../../../src/domain/repositories/contact-repository";

class MockContactDataSource implements ContactDataSource{
    create(contact: ContactRequestModel): void {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<ContactResponseModel[]> {
        throw new Error("Method not implemented.");
    }
    deleteOne(id: String): void {
        throw new Error("Method not implemented.");
    }
    updateOne(id: String, data: ContactRequestModel): void {
        throw new Error("Method not implemented.");
    }
    getOne(id: String): Promise<ContactResponseModel | null> {
        throw new Error("Method not implemented.");
    }
    


}


describe("Contact Repository", () =>{

    let mockContactDataSource: MockContactDataSource;
    let contactRepository: ContactRepositoryImpl;

    beforeEach(() =>{
        jest.clearAllMocks();
        mockContactDataSource = new MockContactDataSource();
        contactRepository = new ContactRepositoryImpl(mockContactDataSource);
    });

    describe("get all contacts", () =>{
        test("should return data", async () =>{
            const expectedData = [{ id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }]
            jest.spyOn(mockContactDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await contactRepository.getContacts();
            expect(result).toBe(expectedData)
        });
    });


    describe("createContact", () => {
        test("should make create ds call", async () => {
            jest.spyOn(mockContactDataSource, "create").mockImplementation(() => Promise.resolve())
            await contactRepository.createContact({ surname: "Smith", firstName: "John", email: "john@gmail.com" });
            expect(mockContactDataSource.create).toHaveBeenCalledWith({ surname: "Smith", firstName: "John", email: "john@gmail.com" })
        });
    })


    describe("deleteContact", () => {
        test("should make deleteOne ds call", async () => {
            jest.spyOn(mockContactDataSource, "deleteOne").mockImplementation(() => Promise.resolve())
            const result = await contactRepository.deleteContact("123");
            expect(mockContactDataSource.deleteOne).toHaveBeenCalledWith("123")
        });
    });

    describe("updateContact", () => {
        test("should make updateOne ds call", async () => {
            jest.spyOn(mockContactDataSource, "updateOne").mockImplementation(() => Promise.resolve())
            await contactRepository.updateContact("123", { surname: "Smith", firstName: "John", email: "john@gmail.com" });
            expect(mockContactDataSource.updateOne).toHaveBeenCalledWith("123", { surname: "Smith", firstName: "John", email: "john@gmail.com" })
        });
    });

    describe("getContact", () => {
        test("should make getOne ds call", async () => {
            jest.spyOn(mockContactDataSource, "getOne").mockImplementation(() => Promise.resolve({ id: "123", surname: "Smith", firstName: "John", email: "john@gmail.com" }))
            const result = await contactRepository.getContact("123");
            expect(mockContactDataSource.getOne).toHaveBeenCalledWith("123")
            expect(result).toStrictEqual({ id: "123", surname: "Smith", firstName: "John", email: "john@gmail.com" })
        });
    });
});