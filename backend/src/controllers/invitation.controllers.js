import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Document } from "../models/document.model.js";
import { User } from "../models/user.model.js";
import { Invitation } from "../models/invitation.model.js";

const sendInvite = asyncHandler(async (req, res) => {
    const { docId } = req.params;
    const { email, permission } = req.body;

    // Validate input
    if (!email || !permission) {
        throw new ApiError(400, "Email and permission are required");
    }

    const validPermissions = ['read-only', 'read-write'];
    if (!validPermissions.includes(permission)) {
        throw new ApiError(400, "Invalid permission type");
    }

    // Fetch document by ID
    const document = await Document.findById(docId);
    if (!document) {
        throw new ApiError(404, "No such document found");
    }

    // Check if the user is the owner of the document
    if (document.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You don't have permission to invite users to this document");
    }

    // Find the user to invite by email
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
        throw new ApiError(404, "User not found");
    }

    // Check if an invitation already exists for this user and document
    const existingInvite = await Invitation.findOne({
        documentId: docId,
        invitedUserEmail: email
    });
    if (existingInvite) {
        throw new ApiError(400, "User is already invited to this document");
    }

    // Check if the user already has permissions on the document
    const hasExistingPermission = document.permissions.some(
        p => p.userId.toString() === userToInvite._id.toString()
    );
    if (hasExistingPermission) {
        throw new ApiError(400, "User already has permissions for this document");
    }

    // Create a new invitation
    const newInvite = await Invitation.create({
        documentId: docId,
        invitedUserEmail: email,
        permission: permission,
    });

    // Send response
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                inviteId: newInvite._id,
                status: newInvite.status,
                expiredAt: newInvite.expiredAt
            },
            "Invite sent successfully"
        )
    );
});

const cancelInvite = asyncHandler(async(req, res) => {
    const { docId, inviteId } = req.params;

    // Validate input IDs
    if (!docId || !inviteId) {
        throw new ApiError(400, "Document ID and Invitation ID are required");
    }

    // Find the invitation and populate document info
    const invite = await Invitation.findOne({
        _id: inviteId,
        documentId: docId,  // Ensure the invite belongs to the specified document
    });

    if (!invite) {
        throw new ApiError(404, "Invitation not found");
    }

    // Find the document to check permissions
    const document = await Document.findById(docId);
    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    // Check if the user has permission to cancel the invite
    // Only document owner can cancel invites
    if (document.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You don't have permission to cancel this invitation");
    }

    // Check if invite is still pending
    if (invite.status !== 'pending') {
        throw new ApiError(400, `Cannot cancel invitation that has been ${invite.status}`);
    }

    // Delete the invitation
    const deleteStatus = await Invitation.findByIdAndDelete(inviteId);
    
    if (!deleteStatus) {
        throw new ApiError(500, "Failed to cancel invitation. Please try again.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                {
                    inviteId: inviteId,
                    documentId: docId
                },
                "Invitation cancelled successfully"
            )
        );
});

const cleanupExpiredInvitations = async () => {
    try {
        const result = await Invitation.deleteMany({
            expiredAt: { $lt: new Date() },
            status: 'pending'
        });
        console.log(`Cleaned up ${result.deletedCount} expired invitations`);
    } catch (error) {
        console.error('Failed to cleanup expired invitations:', error);
    }
};

const acceptInvite = asyncHandler(async (req, res) => {
    const { inviteId } = req.params;
    const userId = req.user._id;  // Assumes authenticated user’s ID is in req.user
    const userEmail = req.user.email;  // Assumes user’s email is in req.user

    // Step 1: Find the invitation by ID
    const invite = await Invitation.findById(inviteId);
    if (!invite) {
        throw new ApiError(404, "Invitation not found");
    }

    // Step 2: Check if the invitation is for the logged-in user and is still pending
    if (invite.invitedUserEmail !== userEmail) {
        throw new ApiError(403, "You are not authorized to accept this invitation");
    }
    if (invite.status !== 'pending') {
        throw new ApiError(400, "This invitation has already been processed");
    }
    if (invite.expiredAt < Date.now()) {
        throw new ApiError(400, "This invitation has expired");
    }

    // Step 3: Find the document associated with the invitation
    const document = await Document.findById(invite.documentId);
    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    // Step 4: Ensure the user doesn’t already have permissions on the document
    const alreadyHasPermission = document.permissions.some(
        (perm) => perm.userId.toString() === userId.toString()
    );
    if (alreadyHasPermission) {
        throw new ApiError(400, "You already have permissions for this document");
    }

    // Step 5: Add the user’s permission to the document’s permissions array
    document.permissions.push({
        userId: userId,
        permission: invite.permission
    });
    await document.save();

    // Step 6: Update the invitation status to accepted
    invite.status = 'accepted';
    await invite.save();

    // Step 7: Send a success response
    return res.status(200).json(
        new ApiResponse(200, { documentId: document._id }, "Invitation accepted successfully")
    );
});

const allPendingInvites = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    if(!id){
        throw new ApiError(400, "Please provide proper document ID")
    }

    const document = await Document.findById(id);
    if(!document){
        throw new ApiError(404, "No such document found")
    }

    const currentUser = req.user._id;

    if (!document.owner.equals(currentUser)) {  
        throw new ApiError(403, "Access denied");  
    }

    const allPendingInvites = await Invitation.find({documentId: id, status: 'pending'});

    return res
    .status(200)
    .json(
        new ApiResponse(200, allPendingInvites, "Send Successfully")
    )
})

export {
    sendInvite,
    cancelInvite,
    cleanupExpiredInvitations,
    acceptInvite,
    allPendingInvites
}