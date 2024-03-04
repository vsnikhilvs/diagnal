import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.homeTitle}>Welcome to My OTT Platform</div>
            <div className={styles.navSection}>
                <Link to="/">Home</Link>
                <Link to="comedy">Comedy</Link>
            </div>
        </div>
    );
};

export default Home;
