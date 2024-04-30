import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import Axios for making HTTP requests
import "../stylesV2/SelectedDate.css";

function SelectedDate({ selectedDate, onAddAppointment, onDeleteAppointment, accountPresent, accountFirstName, accountLastName, accountType }) {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState("");
  const [otherFirst, setOtherFirst] = useState("");
  const [otherLast, setOtherLast] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5001/api/userschedule/${accountFirstName}/${accountLastName}`)
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.log('Error fetching schedule:', error);
      });
  }, [accountFirstName, accountLastName]);

  const handleAddAppointment = () => {
    if (!accountPresent) {
      alert("Please login to an account to use this feature");
      return;
    }
  
    if (selectedDate && appointment.trim() !== "") {
      axios.get(`http://localhost:5001/api/userdemographics/${otherFirst}/${otherLast}`)
        .then(response => {
          if (response.data.length === 0) {
            alert("The specified account does not exist. Please try again.");
          } else if (response.data[0].user_status === 'Client') {
            alert("The specified account is a client not a trainer.");
          } else {
            const newAppointment = `${selectedDate.toDateString()}: ${appointment}`;
            console.log(selectedDate.toDateString());
            const schedule_id = Math.floor(Math.random() * 1000000);
  
            axios.post('http://localhost:5001/api/userschedule/create', {
              schedule_id: schedule_id,
              user_first: accountFirstName,
              user_last: accountLastName,
              other_first: otherFirst,
              other_last: otherLast,
              user_date: selectedDate.toDateString(),
              user_notes: appointment,
              other_accepted: 'Pending',
            })
            .then(response => {
              //could probably just make another get call here to setAppointments again
              // setAppointments(prevAppointments => [...prevAppointments, { user_date: selectedDate.toDateString(), user_notes: appointment }]);
              console.log(response);
              setAppointment("");
              setOtherFirst("");
              setOtherLast("");
              axios.get(`http://localhost:5001/api/userschedule/${accountFirstName}/${accountLastName}`)
              .then(response => {
                setAppointments(response.data);
                onAddAppointment(selectedDate, newAppointment);
                // setAppointment("");
                // setOtherFirst("");
                // setOtherLast("");
              })
              // onAddAppointment(selectedDate, newAppointment);
              // setAppointment("");
              // setOtherFirst("");
              // setOtherLast("");
            })
            .catch(error => {
              console.error('Error creating appointment:', error);
            });
          }
        })
        .catch(error => {
          console.error('Error checking account:', error);
        });
    }
  };
  
  

  const handleDeleteAppointment = (index) => {
    if (selectedDate) {
      const deletedScheduleId = appointments[index].schedule_id;
      console.log(deletedScheduleId);
      axios.delete(`http://localhost:5001/api/userschedule/delete/${deletedScheduleId}`)
        .then(response => {
          console.log('Appointment deleted successfully:', response.data);
          
          const updatedAppointments = [...appointments];
          updatedAppointments.splice(index, 1);
          setAppointments(updatedAppointments);
          
          onDeleteAppointment(selectedDate, index);
        })
        .catch(error => {
          console.error('Error deleting appointment:', error);
        });
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]+$/.test(value) || value === '') {
      setOtherFirst(value);
    }
  }
  
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]+$/.test(value) || value === '') {
      setOtherLast(value);
    }
  }

  return (
    <div className="selected-date-container">
      <div className="appointment-body">
        <div className="appointment-input">
          <input
            type="text"
            placeholder="  Enter appointment information"
            value={appointment}
            onChange={(e) => setAppointment(e.target.value)}
          />
          <input
            type="text"
            placeholder="  Trainer's First Name"
            value={otherFirst}
            onChange={(e) => handleFirstNameChange(e)}
          />
          <input
            type="text"
            placeholder="  Trainer's Last Name"
            value={otherLast}
            onChange={(e) => handleLastNameChange(e)}
          />
          <button onClick={handleAddAppointment} className="add-button">
            Add Appointment
          </button>
        </div>

        <h3>Appointments:</h3>
        <div className="appointment-list">
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index} className="appointment-card">
                <button
                  onClick={() => handleDeleteAppointment(index)}
                  className="delete-button"
                >
                  Delete
                </button>
                {appointment.user_date}: {appointment.user_notes}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

SelectedDate.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onAddAppointment: PropTypes.func.isRequired,
  onDeleteAppointment: PropTypes.func.isRequired,
  accountPresent: PropTypes.string,
  accountFirstName: PropTypes.string,
  accountLastName: PropTypes.string,
  accountType: PropTypes.string
};

export default SelectedDate;
