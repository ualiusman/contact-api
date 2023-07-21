import { before } from "node:test";
import { SQLDatabaseWrapper } from "../../src/data/interfaces/data-sources/sql-database-wrapper";
import { SQLServerContactDataSource } from "../../src/data/data-sources/sqlserver-contact-data-source";

describe("SQL server data source", () =>{

    let mockDatabase:SQLDatabaseWrapper;

    beforeAll(() =>{
        mockDatabase = {
            query: jest.fn()
        }
    });

    beforeEach(() =>{
        jest.clearAllMocks();
    });


    test("getAll", async () => {
        const ds = new SQLServerContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ firstName: "Smith", surname:"John", email: "mail@mail.com", id: "123" }] }))
        const result = await ds.getAll();
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from contacts")
        expect(result).toStrictEqual([{ firstName: "Smith", surname:"John", email: "mail@mail.com", id: "123"  }])
    })

    test("create", async () => {
        const ds = new SQLServerContactDataSource(mockDatabase);
        await ds.create({ firstName: "Smith", surname:"John", email: "mail@mail.com" });
        expect(mockDatabase.query).toHaveBeenCalledWith(`insert into contacts (firstName,surname,email) values ($1, $2, $3)`, ["Smith","John", "mail@mail.com"])
    })

    test("deleteOne", async () => {
        const ds = new SQLServerContactDataSource(mockDatabase);
        await ds.deleteOne("1");
        expect(mockDatabase.query).toHaveBeenCalledWith(`delete contacts where id = $1`, ["1"])
    })

    test("updateOne", async () => {
        const ds = new SQLServerContactDataSource(mockDatabase);
        await ds.updateOne("1", { firstName: "Smith", surname:"John", email: "mail@mail.com" });
        expect(mockDatabase.query).toHaveBeenCalledWith(`update contacts set firstName = $1, surname = $2, email = $3 where id = $4`, ["Smith","John", "mail@mail.com", "1"])
    })

    test("getOne", async () => {
        const ds = new SQLServerContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: "123", firstName: "Smith", surname:"John", email: "mail@mail.com"}] }))
        const result = await ds.getOne("123");
        expect(result).toStrictEqual({ firstName: "Smith", surname:"John", email: "mail@mail.com", id: "123" })
        expect(mockDatabase.query).toHaveBeenCalledWith(`select * from contacts where id = $1 limit 1`, ["123"])
    })
});