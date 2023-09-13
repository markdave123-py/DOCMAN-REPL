import { Schema, Document, model } from "mongoose";

const inviteSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  acceptedAt: {
    type: Date,
  },

  invitationStatus: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
    default: "pending",
  },

  rejectedAt: {
    type: Date,
  },
});

const inviteAdminModel = model("Invite", inviteSchema);

export { inviteAdminModel };
