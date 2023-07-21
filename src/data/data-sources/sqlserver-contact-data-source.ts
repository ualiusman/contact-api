import { ContactRequestModel, ContactResponseModel } from "../../domain/models/contact";
import { ContactDataSource } from "../interfaces/data-sources/contact-data-source";
import { SQLDatabaseWrapper } from "../interfaces/data-sources/sql-database-wrapper";

const DB_TABLE = "contacts";
export class SQLServerContactDataSource implements ContactDataSource{
    private db: SQLDatabaseWrapper;
    constructor(db: SQLDatabaseWrapper){
        this.db = db;
    }
    async create(contact: ContactRequestModel) {
        await this.db.query(`insert into ${DB_TABLE} (firstName,surname,email) values ($1, $2, $3)`, [contact.firstName,contact.surname, contact.email])
    }
    async getAll(): Promise<ContactResponseModel[]> {
        const dbResponse = await this.db.query(`select * from ${DB_TABLE}`)
        const result = dbResponse.rows.map(item => ({
            id: item.id,
            firstName: item.firstName,
            surname: item.surname,
            email: item.email
        }));
        return result;
    }
    async deleteOne(id: String) {
        await this.db.query(`delete ${DB_TABLE} where id = $1`, [id])
    }
    async updateOne(id: String, data: ContactRequestModel) {
        await this.db.query(`update ${DB_TABLE} set firstName = $1, surname = $2, email = $3 where id = $4`, [data.firstName, data.surname, data.email, id])
    }
    async getOne(id: String): Promise<ContactResponseModel | null> {
        const dbResponse = await this.db.query(`select * from ${DB_TABLE} where id = $1 limit 1`, [id])
        const result = dbResponse.rows.map(item => ({
            id: item.id,
            firstName: item.firstName,
            surname: item.surname,
            email: item.email,
        }));

        return result[0];
    }
    
}