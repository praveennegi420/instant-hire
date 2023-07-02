import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Job() {
  const [jobs, setJobs] = React.useState([]);
  const getJobs = async () => {
    const response = await fetch(`http://localhost:8000/api/job`, {
      method: "GET",
    });
    const data = await response.json();
    setJobs(data.data);
  };
  React.useEffect(() => {
    getJobs();
  }, []);

  console.log(jobs);
  return (
    jobs.length &&
    jobs.map((job) => (
      <Card
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
          <Typography variant="body2">
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
            Apply
          </Button>
        </CardActions>
      </Card>
    ))
  );
}
