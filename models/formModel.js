import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "text",
      "number",
      "dropdown",
      "checkbox",
      "radio",
      "upload",
      "datetime",
      "email",
      "password",
    ],
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const formSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    fields: [fieldSchema],
  },
  { timestamps: true }
);

export const FormModel = mongoose.model("Form", formSchema);
export const FieldModel = mongoose.model("Field", fieldSchema);
