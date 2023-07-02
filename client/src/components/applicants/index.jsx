import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Applicants({jId}) {
  const [applicants, setApplicants] = React.useState([]);
  const getApplicants = async () => {
    const response = await fetch(`http://localhost:8000/api/job/applicants/${jId}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setApplicants(data.data);
  };
  React.useEffect(() => {
    getApplicants();
  }, []);

  console.log(applicants);
  return (
    applicants.length &&
    applicants.map((applicant) => (
      <Card userId={applicant._id}
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
              {applicant.name}
            </Typography>
            {/* <Typography
              sx={{ fontSize: 14, fontWeight: 900 }}
              color="text.primary"
              gutterBottom
            >
              {applicant.experience}
            </Typography> */}
          </div>
          <Typography variant="body2">
            <span className="span-txt">Experience:</span> 
            {applicant.experience}
            <br />
          </Typography>
          <Typography variant="body2">
          <span className="span-txt"> Email:  </span>
            {applicant.email}
            <br />
          </Typography>
          <Typography variant="body2"><span className="span-txt">Phone no.:</span> 
            {applicant.phone}
            <br />
          </Typography>
          <Typography variant="body2"><span className="span-txt">Education:</span>  
            {applicant.education}
            <br />
          </Typography>
          <Typography variant="body2"> <span className="span-txt">CGPA:</span> 
            {applicant.cgpa}
            <br />
          </Typography>
          <Typography variant="body2"><span className="span-txt">salary expectation: </span> 
            {applicant.salaryexpect}
            <br />
          </Typography>
        </CardContent>
        {/* <CardActions className="apply-btn">
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
            Apply
          </Button>
        </CardActions> */}
      </Card>
    ))
  );
}
