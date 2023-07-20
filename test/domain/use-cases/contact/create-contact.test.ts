import { ContactRepository } from "../../../../src/domain/interfaces/respositories/contract-respository";
import { ContactRequestModel, ContactResponseModel } from "../../../../src/domain/models/contact";
import { CreateContact } from "../../../../src/domain/use-cases/contact/create-contact";

describe("Create Contact Use case", () =>{
    class MockContactRepository implements ContactRepository {
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


    let mockContactRepository:  MockContactRepository;

    beforeEach(() =>{
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository();
    });

    test("should return true", () =>{
        const inputData = { surname: "Smith", firstName: "John", email: "john@gmail.com" };

        jest.spyOn(mockContactRepository, "createContact").mockImplementation(() => Promise.resolve(true));
        const createContactUseCase = new CreateContact(mockContactRepository);
        const resposne = createContactUseCase.execute(inputData);
        expect(resposne).toBe(true);
        expect(mockContactRepository.createContact).toBeCalledTimes(1)

    });
});