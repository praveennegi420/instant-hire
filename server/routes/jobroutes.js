const router = require("express").Router();
const {Applicant}= require('../models/applicant')
const {Job}= require('../models/jobs')
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");


// POST JOB BY HR
router.post("/post", auth, async(req,res)=>{
	let job= await new Job({...req.body}).save();
	res.status(200).send({message: "Job Posted."})
})

// APPLY BY APPLICANTS
router.post("/apply", async(req, res)=>{
    const user = await Applicant.findOne({ email: req.body.email });
	if (user)
		return res
			.status(403)
			.send({ message: "Already Applied." });
    let applicant= await new Applicant({...req.body}).save();
    res.status(200).send({message: "Successfully Applied."})
})

// GET APPLICANTS BY JOB ID ( HR CAN CHECK )
router.get("/applicants/:id", auth, async (req, res) => {
	const jobid= req.params.id; console.log(jobid)
	const users = await Applicant.find({jobid:jobid});
	res.status(200).send({ data: users });
});

// GET ALL JOBS 
router.get('/', async(req,res)=>{
	const jobs= await Job.find({});
	res.status(200).send({data: jobs});
})


module.exports = router;