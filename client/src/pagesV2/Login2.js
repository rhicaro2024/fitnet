import React ,{useState, useEffect} from "react";
import '../stylesV2/Home2.css';
import { Link, link } from 'react-router-dom';
import LoginComponent from "../components/LoginComponent";

function Login2({updateAccountInfo, accountPresent, accountFirstName, accountLastName, accountType }) {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupClick = (e) => {
        e.preventDefault();
        setShowPopup(prevState => !prevState);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const handleLogoutClick = () => {
        setShowPopup(false);
        updateAccountInfo("", false, "", "", "")
    }

    return (
        <span style={{fontfamily: 'verdana, geneva, sans-serif'}}>
            <html lang="en">
                <head>
                    {/* Need to keep for the icons */}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                </head>
                <body>
                <div class="container">
                    <nav>
                        <div class="navbar">
                            <div class="logo">
                                {/* Change to FitNetLogo */}
                            {/* <img src="/pic/logo.jpg" alt=""> */}
                                <h1>Login</h1>
                            </div>
                            <ul>
                                <Link to='/'>
                                    <li>
                                        <a href="#">
                                            <i class="fas fa-home"></i>
                                            <span class="nav-item">Home</span>
                                        </a>
                                    </li>
                                </Link>
                                <Link to='/Calendar'>
                                    <li>
                                        <a href="#">
                                            <i class="fas fa-calendar"></i>
                                            <span class="nav-item">Calendar</span>
                                        </a>
                                    </li>
                                </Link>
                                <Link to='/About'>
                                    <li>
                                        <a href="#">
                                            <i class="fas fa-info-circle"></i>
                                            <span class="nav-item">About</span>
                                        </a>
                                    </li>
                                </Link>
                                    <Link to='/Login'>
                                    <li>
                                        <a href="#">
                                            <i class="fas fa-sign-in-alt"></i>
                                            <span class="nav-item">Login</span>
                                        </a>
                                    </li>
                                </Link>
                                <Link to='/Signup'>
                                    <li>
                                        <a href="#">
                                            <i class="fas fa-share"></i>
                                            <span class="nav-item">Register</span>
                                        </a>
                                    </li>
                                </Link>
                                <li>
                                    {accountPresent && (
                                        <div class='nav-item-options-container'>
                                            <a href="#" class='options' onClick={handlePopupClick}>
                                                <i className="fas fa-cog"/>
                                                <span className="nav-item">More Options</span>
                                            </a>
                                            {showPopup && (
                                                <div className="popup">
                                                    {accountType === 'Trainer' ? (
                                                        <>
                                                            <a href="#" class="style-btn" onClick={handleLogoutClick}>Logout</a>
                                                            <Link 
                                                                to={`/AccountScreen/${accountFirstName}/${accountLastName}`} 
                                                                className='style-btn'
                                                                onClick={handleClosePopup}>
                                                                {/* <Button className='account-btn' onClick={handleClosePopup}>My Account</Button> */}
                                                                My Account
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <a href="#" class="style-btn" onClick={handleLogoutClick}>Logout</a>
                                                        // <Button className='logout-btn' onClick={handleLogoutClick}>Logout</Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <section class="main">
                        <div class="main-top">
                            <Link to='/'>
                                <p>FitNet | Find Your Trainer Today</p>
                            </Link>
                        </div>
                        <div class="main-body">
                            {/* Where the main component will live */}
                            <LoginComponent updateAccountInfo={updateAccountInfo}/>
                        </div>
                    </section>
                </div>

                </body>
            </html>
        </span>
        )
}

export default Login2;