import React from "react";
import { Button } from "@mui/material";

import styles from "./LandingPage.module.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.landingContent}>
            <p className={styles.heading}>Your step towards Sustainability</p>
            <p className={styles.description}>
              A tool to help you reduce food wastage, effortlessly
            </p>
            <div className={styles.pointers}>
              <p>
                <TaskAltIcon fontSize="small" />
                Just add food items
              </p>
              <p>
                <TaskAltIcon fontSize="small" />
                And receive notifs to consume them before they expire
              </p>
              <p>
                <TaskAltIcon fontSize="small" />
                Also, search for amazing recipes to be made ONLY using food
                items you already have!
              </p>
            </div>
            <NavLink to="/signup">
              <Button
                className={styles.button}
                variant="outlined"
                color="success"
              >
                Get Started
              </Button>
            </NavLink>
          </div>
        </div>
      </>
    );
}

export default LandingPage;