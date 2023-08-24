import { Request, Response, NextFunction } from "express";
import { DocModel } from "../models/doc";
 


export const getDocumments = async (req: Request, res:Response, next: NextFunction) => {
    // try {
    //     const documents = await Document.find();
    //     return res.status(200).json(documents);
    // } catch (error) {
    //     console.error('Error retrieving documents:', error);
    //     return res.status(500).json({ error: 'Something went wrong.' });
    // }
    // });

    // // Retrieve a specific document by ID
    // app.get('/documents/:id', async (req, res) => {
    //     try {
    //         const document = await Document.findById(req.params.id);

    //         if (!document) {
    //         return res.status(404).json({ error: 'Document not found.' });
    //         }

    //         return res.status(200).json(document);
    //     } catch (error) {
    //         console.error('Error retrieving document:', error);
    //         return res.status(500).json({ error: 'Something went wrong.' });
    //     }
        
}

