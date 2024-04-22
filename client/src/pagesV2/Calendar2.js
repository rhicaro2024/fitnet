//To copy over to other pages for layout
import React ,{useState, useEffect} from "react";
import '../stylesV2/Home2.css';
import { Link, link } from 'react-router-dom';
import CalendarComponent from "../components/CalendarComponent";
import SelectedDate from "../components/SelectedDate";

function Calendar2({updateAccountInfo, accountPresent, accountFirstName, accountLastName, accountType}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
  
    const handleAddAppointment = (date, appointment) => {
      setAppointments([...appointments, appointment]);
    };
  
    const handleDeleteAppointment = (date, index) => {
      const updatedAppointments = [...appointments];
      updatedAppointments.splice(index, 1);
      setAppointments(updatedAppointments);
    };

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
                                <h1>Calendar</h1>
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
                            <div class="main-body-calendar">
                                <CalendarComponent
                                    selectedDate={selectedDate}
                                    onDateChange={setSelectedDate}
                                />
                            </div>
                            <div class="main-body-appointment">
                            <SelectedDate
                                selectedDate={selectedDate}
                                onAddAppointment={handleAddAppointment}
                                onDeleteAppointment={handleDeleteAppointment}
                                accountPresent={accountPresent} 
                                accountFirstName={accountFirstName}
                                accountLastName={accountLastName} 
                                accountType={accountType}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                </body>
            </html>
        </span>
        )
}

export default Calendar2;