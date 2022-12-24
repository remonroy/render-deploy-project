import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
const About = () => {
  const visitWebsite = () => {
    window.location = "https://ecstatic-heyrovsky-a21277.netlify.app/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/bangla-company/image/upload/v1641456449/avators/xogqdaw7r1tgv54gh4wn.jpg"
              alt="Founder"
            />
            <Typography>Remon roy</Typography>
            <Button target="_blank" onClick={visitWebsite} color="primary">
              Visit Website
            </Button>
            <span>I am a MERN Stack developer</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.linkedin.com/in/remon-roy/">
              <LinkedInIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://github.com/remonroy">
              <GitHubIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
