import { FormModel } from "../models/formModel.js";
import { UserResponse } from "../models/responseModel.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

class UserController {
  signupUser = async (req, res) => {
    try {
      let user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        const newUserCreate = await UserModel.create(req.body);

        if (newUserCreate) {
          const savedData = {
            _id: newUserCreate._id,
            email: newUserCreate.email,
            name: newUserCreate.name,
          };

          if (newUserCreate) {
            res.status(200).json({
              message: "User data saved successfully",
              data: savedData,
              success: true,
            });
          } else {
            res.status(200).json({
              message: "Error while saving user data",
              data: null,
              success: false,
            });
          }
        }
      } else {
        res.status(200).json({
          message: "User already exist",
          data: null,
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Internal server error", data: null, success: false });
    }
  };

  loginUser = async (req, res) => {
    try {
      console.log(req.body);
      let user = await UserModel.findOne({ email: req.body.userData.email });

      if (user) {
        if (user.email === req.body.userData.email) {
          const checkPassword = await bcrypt.compare(
            req.body.userData.password,
            user?.password
          );
          if (checkPassword) {
            const userData = {
              _id: user._id,
              email: user.email,
              name: user.name,
            };

            res.json({
              message: "Successfully logged in",
              success: true,
              data: userData,
            });
          } else {
            res.status(400).json({
              message: "Invalid credentials.",
              success: false,
              data: null,
            });
          }
        } else {
          res.status(400).json({
            message: "Invalid credentials",
            success: false,
            data: null,
          });
        }
      } else {
        res
          .status(400)
          .json({ message: "User doesn't exist", success: false, data: null });
      }
    } catch (error) {
      res.status(500).json({ message: error, success: false, data: null });
    }
  };

  saveForm = async (req, res) => {
    try {
      console.log(req.body)
      const { creatorId, title, fields } = req.body;

      if (!creatorId || !title || !fields || fields.length === 0) {
        return res.status(400).json({
          message: "Creator ID, title, and fields are required.",
          success: false,
        });
      }

      const newForm = new FormModel({
        creatorId,
        title,
        fields,
      });

      const savedForm = await newForm.save();

      return res.status(201).json({
        message: "Form saved successfully",
        data: savedForm,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
    }
  };

  getAForms = async (req, res) => {
    try {
      const { creatorId, formId } = req.params;
      const form = await FormModel.findOne({ _id: formId, creatorId });
  
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      return res.json(form);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  
  getAllForms = async (req, res) => {
    try {
      const { creatorId } = req.params;
      const form = await FormModel.find({ creatorId });
  
      if (!form) {
        return res.status(404).json({ message: 'Form not found', success: false });
      }
  
      return res.status(200).json({message: "data successfully fetched", data: form, success: true});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  addResponse = async (req, res) => {
  try {

    console.log(req.body)
    const { formId, responses } = req.body;

    if (!formId || !responses) {
      return res.status(400).json({ message: 'Form ID and responses are required.' });
    }

    const newResponse = new UserResponse({ formId, responses });

    await newResponse.save();

    res.status(201).json({ message: 'Response saved successfully', response: newResponse, success: true });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'An error occurred while saving the response' });
  }
  };

  getResponses = async (req, res) => {
    const {formId}  = req.params;
  
    console.log(req.params)
    try {
      const result = await UserResponse.find({formId: formId}) // Make sure this function is defined
      return res.status(201).json({ message: 'all respons', data: result });
    } catch (error) {
      console.error('Error adding response:', error);
      return res.status(500).json({ message: 'An error occurred while adding response', error: error.message });
    }
  }

  deleteForm = async(req, res)=>{
    try {
      const deleteForm = await FormModel.findOneAndDelete({_id: req.params.formId})
      if(deleteForm){
        res.json({message: "deleted succesfully", success: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

}

export const userController = new UserController();
