import ProfilePicture from '../assets/profile_picture.jpg';
import GrayOutScreenshot from '../assets/grayout.png';
import TetchrisDemo from '../assets/tetchris_demo.webm';
import CleanExit from '../assets/cleanexit.png';
import SpatialEquity from '../assets/spatial_equity.png';
import AwsDev from '../assets/cert_badges/aws_developer.png';
import AwsSolnArch from '../assets/cert_badges/aws_solutions_architect.png';
import AzureAdmin from '../assets/cert_badges/azure_administrator.png';
import AzureDevOps from '../assets/cert_badges/azure_devops_engineer.png';
import GitHub from '../assets/link_logos/github.png';
import LinkedIn from '../assets/link_logos/linkedin.png';
import DownloadCV from '../assets/link_logos/download_cv.png';
import { Link } from "react-router-dom";
import "./HomePage.css";


function HomePage() {
  return (
    <>
      <div id="home-maincontent-wrapper">
        <div id="home-content-wrapper">
          <div className="home-content-wrap">
            <h2>Hi.</h2>
            <p>Welcome to my website!</p>
            <p>I&apos;m a software engineer, currently based in London.</p>
            <p>You can check out a selection of my projects below, or <a href="/cv_chris_vroegop.pdf">download my CV.</a></p>
          </div>
          <div className="home-content-wrap home-content-flex">
            <div className="home-content-text">
              <h3>GrayOut</h3>
              <p>Set Windows to grayscale, on a schedule.</p>
              <p>Source and builds available on <a href="https://github.com/Scienciser/GrayOut">GitHub</a>.</p>
            </div>
            <div className="image-align-right">
              <a href="https://github.com/Scienciser/GrayOut">
                <img className="home-img" src={GrayOutScreenshot}></img>
              </a>
            </div>
          </div>
          <div className="home-content-wrap home-content-flex">
            <video className="home-img" autoPlay loop muted playsInline id="home-tetchris-img" src={TetchrisDemo}></video>
            <div className="home-content-text text-padding-right">
              <h3>Play Tetchris!</h3>
              <p>The latest in browser-based entertainment :)</p>
            </div>
            <Link to="/tetchris">
              <span className="panel-link"></span>
            </Link>
          </div>
          <div className="home-content-wrap home-content-flex">
            <div className="home-content-text">
              <h3>CleanExit</h3>
              <p>Privacy-enhancing browser extension.</p>
            <p>Available from the <a href="https://chromewebstore.google.com/detail/cleanexit/chjjljigikgecfimljpjkbmdkiiimaop">Chrome Web Store</a> or <a href="https://github.com/Scienciser/CleanExit">GitHub</a>.</p>
            </div>
            <div className="image-align-right">
              <a href="https://chromewebstore.google.com/detail/cleanexit/chjjljigikgecfimljpjkbmdkiiimaop">
                <img className="home-img" src={CleanExit} height={"300px"} style={{textAlign: "right"}} />
              </a>
            </div>
          </div>
          <div className="home-content-wrap home-content-flex">
            <a href="https://github.com/Scienciser/spatialequityproject/blob/main/report/compsci380_spatial_equity_project.pdf">
              <img className="home-img" src={SpatialEquity} height={"300px"} style={{textAlign: "right"}} />
            </a>
            <div className='home-content-text text-padding-right'>
              <h3>Spatial Equity Project Aotearoa</h3>
              <p>An <a href="https://github.com/Scienciser/spatialequityproject/blob/main/report/compsci380_spatial_equity_project.pdf">report</a> on equitable access to amenity in New Zealand, with attached <a href="https://github.com/Scienciser/spatialequityproject">R library.</a></p>
            </div>
          </div>
        </div>
        <div id="home-img-wrapper">
          <img id="home-personalintro-img" src={ProfilePicture}></img>
          <div id="home-badges-text">
            <h3>My certifications</h3>
            <div id="home-badges-wrapper">
              <img className="home-badgeimg" src={AwsDev}></img>
              <img className="home-badgeimg" src={AwsSolnArch}></img>
              <img className="home-badgeimg" src={AzureAdmin}></img>
              <img className="home-badgeimg" src={AzureDevOps}></img>
            </div>
          </div>
        </div>
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
