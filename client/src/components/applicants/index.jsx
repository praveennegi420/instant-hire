import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios'
import Applicants from "../applicants";

export default function Job() {
  const [jobs, setJobs] = React.useState([]);
  const [jobId, setJobId] = React.useState(null); 
  const getJobs = async () => {
    const response = await axios.get('http://localhost:8080/api/auth/myjobs',  { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGEwN2FlZTNhNTZhY2QzMzU4YWU5MGQiLCJuYW1lIjoidXNlciIsImlhdCI6MTY4ODMwOTQwMSwiZXhwIjoxNjg4OTE0MjAxfQ.tjUYoOwNAlOfB_evggWVvhEjD2z_3vYnJcaSpVNVs2w` }})
      .then(res=> setJobs(res.data.data))
      .catch(err=> console.log(err))
  };
  React.useEffect(() => {
    getJobs();
  }, []);

  console.log(jobs);
  const  seeApplicants = (jId) =>{
       setJobs([]); 
       setJobId(jId); 
  }
  return (
    jobs.length>0 &&
    jobs.map((job) => (
      <Card jId={job._id} 
        sx={{
          minHeight: 155, 
          minWidth: 230,
          maxWidth: 230,
          boxShadow: " 8px 8px 6px  #2e385614;",
        }}
      >
        <CardContent>
          <div className="title-location">
            <Typography
              sx={{ fontSize: 14, fontWeight: 900 }}
              color="text.primary"
              gutterBottom
            >
              {job.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: 900 }}
              color="text.primary"
              gutterBottom
            >
              {job.location}
            </Typography>
          </div>

          <Typography sx={{ mb: 1.5, fontWeight: 600 }} color="text.secondary overflow:" >
            {job.company}
          </Typography>
          <Typography variant="body2" sx={{height: 250, overflow: 'hidden'}}>
            {job.description}
            <br />
          </Typography>
        </CardContent>
        <CardActions className="apply-btn">
          <Button
            sx={{
              color: "white",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            size="small"
          >
            See Applicants
          </Button>
        </CardActions>
      </Card>
    ))
  );
}
