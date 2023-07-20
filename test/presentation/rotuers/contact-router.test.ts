import request from "supertest";
import { CreateContacatUseCase } from "../../../src/domain/interfaces/use-cases/create-contact-use-case";
import { GetAllContactsUseCase } from "../../../src/domain/interfaces/use-cases/get-all-contacts-use-case";
import { ContactRequestModel, ContactResponseModel } from "../../../src/domain/models/contact";
import ContactsRouter from "../../../src/presentation/routers/contact-router";
import server from "../../../src/server";

class MockGetAllContactsUseCase implements GetAllContactsUseCase{
    execute(): Promise<ContactResponseModel[]> {
        throw new Error("Method not implemented.");
    }
    
}

class MockCreateContactUseCase implements CreateContacatUseCase{
    execute(contact: ContactRequestModel): void {
        throw new Error("Method not implemented.");
    }
    
}

describe('Contact Router', () =>{
    let mockCreateContactUseCase: CreateContacatUseCase;
    let mockGetAllContactsUseCase: GetAllContactsUseCase;


    beforeAll(() =>{
        mockGetAllContactsUseCase: new MockGetAllContactsUseCase();
        mockCreateContactUseCase: new MockCreateContactUseCase();
        server.use("/contact", ContactsRouter(mockGetAllContactsUseCase, mockCreateContactUseCase));
    });

    beforeEach(() =>{
        jest.clearAllMocks();
    });

    describe('GET /contact', () =>{
        test("should return 200 with data", async () =>{
            const expectedData = [{id: "1", surname: "smith", firstName: "john", email: "john@gmail.com"}];
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(()=> Promise.resolve(expectedData));

            const response = await request(server).get("/contact");

            expect(response.status).toBe(200);
            expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(expectedData);
        });

        test ('get /contact return 500 on use case error', async ()=>{
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).get('/contact');

            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });

    });

    describe("POST /contact",() =>{
        test("POST /contact", async ()=>{
            const inputData = {  surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.resolve(true));
            const response = await request(server).post('/contact').send(inputData);

            expect(response.status).toBe(201);

        });

        test("POST /Contact return 500 on use case error", async () => {
            const inputData = {  surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response =  await request(server).post("/contact").send(inputData);

            expect(response.status).toBe(500);
            
        });

    });
});