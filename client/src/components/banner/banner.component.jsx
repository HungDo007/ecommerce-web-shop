import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://uidesign.gbtcdn.com/GB/image/brand/20190305_8144/1200x300-A6.jpg",
  },
  {
    label: "Bird",
    imgPath:
      "https://adamshop.vn/wp-content/uploads/2020/08/banner2-1200x300.jpg",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://i.ezbuy.sg/Fq-il5diHcraQT3zXcIAzKhuxL9Z?imageView2/2/w/2400/h/600/q/90/format/webp",
  },
  {
    label: "computer",
    imgPath:
      "https://tanthanhdanh.vn/wp-content/uploads/2021/02/TTD_Featured_Nanoleaf_WebSlider.jpg",
  },
  {
    label: "watch",
    imgPath:
      "https://www.shumswatches.com/uploads/7/7/5/2/77525378/breguet-banner-type-3817-1200x300_orig.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
    maxWidth: 1200,
    flexGrow: 1,
  },
  img: {
    height: 300,
    display: "block",
    maxWidth: 1200,
    overflow: "hidden",
    width: "100%",
    objectFit: "cover",
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
