import React from "react";
import { Button } from "@mui/material";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
      <>
        <div className={styles.main}>
            <div className={styles.landingContent}>
                <p className={styles.heading}>Upload & Relax</p>
                <p className={styles.description}>
                    A tool to help you reduce food wastage, effortlessly
                </p>
                <Button>Get Started</Button>
            </div>
        </div>
      </>
    );
}

export default LandingPage;