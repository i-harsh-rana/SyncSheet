import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createDocument, deleteDocument, getDocumentByID, getDocuments, revertToVersion, shareDocument, updateDocument } from "../controllers/document.controllers";

const router = Router();

router.use(verifyJWT);

router.route('/createDoc').post(createDocument);

router.route('/getAllDoc').get(getDocuments);

router.route('/openDoc').get(getDocumentByID);

router.route('/shareDoc').post(shareDocument);

router.route('/updateDoc').put(updateDocument);

router.route('/deleteDoc').delete(deleteDocument);

router.route('/undoDoc').post(revertToVersion);

export default router;