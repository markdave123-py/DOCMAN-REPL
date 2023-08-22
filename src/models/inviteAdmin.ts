import {Schema, Document, model} from 'mongoose';



const inviteSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,

},
  adminId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Admin',
    required: true,

  },
  acceptedAt: { 
    type: Date
},

  invitationStatus:{
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending',
    required: true
},

  rejectedAt: { 
    type: Date,  
  }

})






const inviteAdminModel = model('Doc', inviteSchema);

export { inviteAdminModel }
