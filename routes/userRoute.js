import express from 'express';
import { userController } from '../controllers/userController.js';
const router = express.Router();

// ===========================| SIGNUP AND SAVE USER DATA TO DB |--------------------------------------------------------------------------------------------------------------------------------------------
router.post("/signup", userController.signupUser);


// ===========================| LOGIN USER BY CHECKING FROM DB  |--------------------------------------------------------------------------------------------------------------------------------------------
router.post("/login", userController.loginUser);


// ===========================| ADD NEW FORM DATA TO DB         |--------------------------------------------------------------------------------------------------------------------------------------------
router.post('/add_form', userController.saveForm);


// ===========================| SIGNUP AND SAVE USER DATA TO DB |--------------------------------------------------------------------------------------------------------------------------------------------
router.get('/get_forms/:creatorId', userController.getAllForms);


// ===========================| FIND A SAVED FORM DATA FROM DB  |--------------------------------------------------------------------------------------------------------------------------------------------
router.get('/getA_form/:formId/:creatorId', userController.getAForms);


// ===========================| ADD THE DORM ENTERING USERS RESPONSES TO DB |--------------------------------------------------------------------------------------------------------------------------------------------
router.post('/add_response', userController.addResponse);


// ===========================| GET THE RESPONSE DATAS OF EACH FORM FROM THE DB |--------------------------------------------------------------------------------------------------------------------------------------------
router.get('/get_responses/:formId', userController.getResponses);


// ===========================| DELETE THE SAVED FORM FROM THE DB |--------------------------------------------------------------------------------------------------------------------------------------------
router.post('/delete_form/:formId', userController.deleteForm);


// ===========================| GOOGLE OAUTH LOGIN CHECKING EXSITING USER OR SAVE USER DATA TO OR FROM DB |--------------------------------------------------------------------------------------------------------------------------------------------
router.post("/google_oauth", userController.googleOuth);


// ===========================| A ROUTE FOR LOADING THE SERVER IN THE RENDER PLATFORM |--------------------------------------------------------------------------------------------------------------------------------------------
router.get("/loading", (req, res)=>{
    res.json({data: true});
});



export default router;