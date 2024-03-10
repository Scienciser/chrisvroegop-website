import ProfilePicture from '../assets/profile_picture.jpg'
import TetchrisDemo from '../assets/tetchris_demo.webm'
import AWSCloudPract from '../assets/cert_badges/aws_cloud_practitioner.png'
import AzureFund from '../assets/cert_badges/azure_fundamentals.png'
import AzureAdmin from '../assets/cert_badges/azure_administrator.png'
import AzureDevOps from '../assets/cert_badges/azure_devops_engineer.png'
import GitHub from '../assets/link_logos/github.png'
import LinkedIn from '../assets/link_logos/linkedin.png'
import DownloadCV from '../assets/link_logos/download_cv.png'
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    return (
        <>
            <div id="home-maincontent-wrapper">
                <div id="home-content-wrapper">
                    <div className="home-content-text" id="home-personalintro-text">
                        <h2>Hi.</h2>
                        <p>{"I'm Chris, and I love technology."}</p>
                    </div>
                    <div className="home-content-text" id="home-badges-text">
                        <h3>Cloud technology.</h3>
                        <div id="home-badges-wrapper">
                            <img className="home-badgeimg" src={AWSCloudPract}></img>
                            <img className="home-badgeimg" src={AzureFund}></img>
                            <img className="home-badgeimg" src={AzureAdmin}></img>
                            <img className="home-badgeimg" src={AzureDevOps}></img>
                        </div>
                    </div>
                    <div className="home-content-text" id="home-tetchris-text">
                        <h3>Web technology.</h3>
                        <Link to="/tetchris"><video autoPlay loop muted playsInline id="home-tetchris-img" src={TetchrisDemo}></video></Link>

                    </div>
                </div>
                <div id="home-img-wrapper">
                    <img id="home-personalintro-img" src={ProfilePicture}></img>
                </div>
                <div id="home-links-wrapper"></div>
            </div>
            <div id="home-footer-wrapper">
                <div className="home-content-text" id="home-footer-links">
                    <h3>Check out my links:</h3>
                    <div id="home-badges-wrapper">
                        <a href="/cv_chris_vroegop.pdf"><img className="home-badgeimg" src={DownloadCV} ></img></a>
                        <a href="https://github.com/Scienciser"><img className="home-badgeimg" src={GitHub} ></img></a>
                        <a href="https://www.linkedin.com/in/christopher-vroegop"><img className="home-badgeimg" src={LinkedIn}></img></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
