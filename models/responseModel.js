

import mongoose from 'mongoose';

const userResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true },
  responses: {
    type: [
      {
        key: { type: String, required: true },  // Define the key field
        value: { type: String, required: true } // Define the value field
      }
    ],
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});

export const UserResponse = mongoose.model('UserResponse', userResponseSchema);
