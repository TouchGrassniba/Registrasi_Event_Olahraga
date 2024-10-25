import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventForm = () => {
    const [formData, setFormData] = useState({
        participant_name: '',
        event_name: '',
        event_date: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the selected date is before today
        const selectedDate = new Date(formData.event_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's time to midnight for accurate comparison

        if (selectedDate < today) {
            alert('Please select a date that is today or in the future.');
            return; // Prevent form submission
        }

        try {
            const response = await axios.post('/api/registrasi-event-olahraga', formData);
            if (response.data.code === 200) {
                toast.success('Registration successful!'); // Show success toast
                setFormData({
                    participant_name: '',
                    event_name: '',
                    event_date: '',
                    category: '',
                });
            } else {
                toast.error('Registration failed! ' + response.data.message); // Show error toast
            }
        } catch (error) {
            toast.error('Registration failed! Please check your inputs.'); // Show error toast
            console.error("There was an error registering the event!", error);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer /> {/* Add ToastContainer here */}
     
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                <h2 className="text-center">Register for Event</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="participant_name"
                        value={formData.participant_name}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Participant Name"
                        required
                    />
                    <select
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        className="form-control mb-3"
                        required
                    >
                        <option value="">Select Event Name</option>
                        <option value="Marathon">Marathon</option>
                        <option value="Renang">Renang</option>
                        <option value="Sepeda">Sepeda</option>
                        <option value="Sprint">Sprint</option>
                        <option value="Catur">Catur</option>
                        <option value="Basket">Basket</option>
                    </select>
                    <input
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        className="form-control mb-3"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control mb-3"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Anak Anak">Anak Anak</option>
                        <option value="Remaja">Remaja</option>
                        <option value="Dewasa">Dewasa</option>
                    </select>
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
