import { get } from "http";
import { ContactRepository } from "../../../../src/domain/interfaces/respositories/contract-respository";
import { ContactRequestModel, ContactResponseModel } from "../../../../src/domain/models/contact";
import { GetAllContacts } from "../../../../src/domain/use-cases/contact/get-all-contacts";

describe("get all contact use case", () =>{

    class MockContactRepository implements ContactRepository{
        createContact(contact: ContactRequestModel): void {
            throw new Error("Method not implemented.");
        }
        deleteContact(id: string): void {
            throw new Error("Method not implemented.");
        }
        updateContact(id: string, data: ContactRequestModel): void {
            throw new Error("Method not implemented.");
        }
        getContacts(): Promise<ContactResponseModel[]> {
            throw new Error("Method not implemented.");
        }
        getContact(id: string): Promise<ContactResponseModel | null> {
            throw new Error("Method not implemented.");
        }
        
    }


    let mockContactRepository: MockContactRepository;

    beforeEach(() =>{
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository();
    })

    test("should return data", async () =>{
        const expectedResult = [{ id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }];

        jest.spyOn(mockContactRepository, "getContacts").mockImplementation(() => Promise.resolve(expectedResult));
        const getAllcontacts = new GetAllContacts(mockContactRepository);
        const result = await getAllcontacts.execute();
        expect(result).toStrictEqual(expectedResult);
    });
});