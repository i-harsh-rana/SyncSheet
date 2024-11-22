import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { acceptInvite, allInvitation, allPendingInvites, cancelInvite, sendInvite } from "../controllers/invitation.controllers.js";

const router = Router();
router.use(verifyJWT);

router.route('/sendInvite/:docId').post(sendInvite);

router.route('/allPending/:id').get(allPendingInvites);

router.route('/cancelInvite/:docId/:inviteId').get(cancelInvite);

router.route('/allInvite').get(allInvitation);

router.route('/acceptInvite/:inviteId').patch(acceptInvite);

export default router;