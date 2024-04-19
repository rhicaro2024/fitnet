import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import LinkColumn from '../template/LinkColumn';
import { Link, link } from 'react-router-dom';
import axios from 'axios';
import '../styles/About.css';

//This is the about page

function About({updateAccountInfo, accountPresent, accountFirstName, accountLastName, accountType}) {
    const [showPopup, setShowPopup] = useState(false);

    console.log(accountFirstName, accountLastName);

    useEffect(() => {
        // Function to fetch appointments based on user's first name and last name
    //     axios.get(`http://localhost:5001/api/userschedule/${accountFirstName}/${accountLastName}`)
    //       .then(response => {
    //         console.log('Schedule found:', response.data);
    //       })
    //       .catch(error => {
    //         console.log('Error fetching schedule:', error);
    //       });
    //   }, [accountFirstName, accountLastName]); // Add accountFirstName and accountLastName to the dependency array

        axios.get('http://localhost:5001/api/userschedule')
        .then(response => {
            console.log('Data found:', response)
        })
        .catch(error => {
            console.log('Error fetching schedule:', error);
        });
    });

    const handlePopupClick = () => {
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
        <div className='fitnet'>
        <div className='header'>
                <Link to="/" className='header_title'>FitNet</Link>
                <div className="options-container" style={{ position: 'relative' }}>
                    {accountPresent ? (
                        <button className='options-btn' onClick={handlePopupClick}> More Options </button>
                    ) : (
                        <Link to="/Login" className='header_login'>Login / Register</Link>
                    )}
                    {showPopup && (
                        <div className="popup">
                            {accountType === 'Trainer' ? (
                                <>
                                    <Button className='logout-btn' onClick={handleLogoutClick}>Logout</Button>
                                    <Link 
                                        to={`/AccountScreen/${accountFirstName}/${accountLastName}`} 
                                        className='account-btn'>
                                        <Button className='account-btn' onClick={handleClosePopup}>My Account</Button>
                                    </Link>
                                
                                </>
                            ) : (
                                <Button className='logout-btn' onClick={handleLogoutClick}>Logout</Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

        <div className='content'>
            <LinkColumn />

            <div className='main'>
                <div className='about-main'>
                    <img src='/images/pfp/garp.png' className='aboutpfp'/>
                    <h2>About Raphael Hicaro</h2>
                    <p>
                        Welcome to FitNet, where fitness meets personalized guidance! I'm Raphael Hicaro, a dedicated senior computer science student with a passion for both technology and fitness. My journey into the world of health and wellness began as a novice in the gym, clueless about where to start and uncertain about investing in a suitable trainer.
                        With two years of hands-on experience in the fitness realm, I've encountered the challenges many individuals face when trying to embark on a transformative fitness journey. It wasn't easy for me at first, navigating the complexities of workouts, nutrition, and finding the right trainer. The struggle to make progress while managing time and resources fueled my desire to create a solution – FitNet.
                        FitNet is more than just a fitness platform; it's a reflection of my commitment to making fitness accessible and tailored to your unique needs. I understand the frustration of spending hard-earned money on trainers without witnessing significant progress. That's why FitNet is designed to be a comprehensive resource, providing you with the tools and support necessary to achieve your fitness goals.
                        As a senior computer science student, my expertise extends beyond the gym floor. I bring a tech-savvy approach to fitness, leveraging cutting-edge technology to enhance your experience on the FitNet platform. Here, you'll find personalized workout plans, nutritional guidance, and a supportive community to keep you motivated every step of the way.
                        Join me on this journey towards a healthier and happier you. Let's leverage technology to transform your fitness routine and make progress that's not just visible but sustainable. FitNet is not just a fitness platform; it's your partner in achieving the best version of yourself.
                        Get ready to embark on a fitness journey like never before – welcome to FitNet, where your goals become our mission.
                    </p>
                </div>
            </div>
        </div>

            <div className='footer'>
                <p>&copy; 2023 FitNet | FitNet.com</p>
            </div>
        </div>
    )
}

export default About;