import express from "express";
import { Request, Response } from 'express'
import { CreateContacatUseCase } from "../../domain/interfaces/use-cases/create-contact-use-case";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/get-all-contacts-use-case";

export default function ContactsRouter(
    getAllContactUseCase: GetAllContactsUseCase,
    createContactUSeCase: CreateContacatUseCase
){
    const router = express.Router();

    router.get('/', async (req:Request, res: Response) => {
        try {
            const contacts = await getAllContactUseCase.execute();
            res.send(contacts);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data"});
        }
    });


    router.post('/',async (req:Request, res: Response) => {
        try {
            await createContactUSeCase.execute(req.body);
            res.statusCode = 201;
            res.json({message: "created"});
            
        } catch (err) {
            res.status(500).send({ message: "Error saving data"});
        }
    });

    return router;
}