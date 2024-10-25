import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { Toast, ToastContainer } from 'react-bootstrap'; // Import Toast components from react-bootstrap

const EventForm = () => {
    const [formData, setFormData] = useState({
        participant_name: '',
        event_name: '',
        event_date: '',
        category: '',
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success'); // default to success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const today = new Date().toISOString().split('T')[0];
        if (formData.event_date < today) {
            showToastMessage("Please choose a date that is today or in the future.", 'danger');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registrasi-event-olahraga', formData);
            if (response.data.code === 200) {
                showToastMessage('Registration successful! Your registration number is: ' + response.data.registration_number, 'success');
                setFormData({
                    participant_name: '',
                    event_name: '',
                    event_date: '',
                    category: '',
                });
            } else {
                showToastMessage('Registration failed! ' + response.data.message, 'danger');
            }
        } catch (error) {
            showToastMessage('Registration failed! Please check your inputs.', 'danger');
            console.error("There was an error registering the event!", error);
        }
    };

    const showToastMessage = (message, variant) => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register for Event</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="participant_name" className="form-label">Participant Name</label>
                    <input
                        type="text"
                        name="participant_name"
                        value={formData.participant_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Participant Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="event_name" className="form-label">Event Name</label>
                    <select
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Event</option>
                        <option value="Marathon">Marathon</option>
                        <option value="Renang">Renang</option>
                        <option value="Sepeda">Sepeda</option>
                        <option value="Sprint">Sprint</option>
                        <option value="Catur">Catur</option>
                        <option value="Basket">Basket</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="event_date" className="form-label">Event Date</label>
                    <input
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Anak Anak">Anak Anak</option>
                        <option value="Remaja">Remaja</option>
                        <option value="Dewasa">Dewasa</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            {/* Toast Container */}
            <ToastContainer position="top-end" className="p-3">
                <Toast bg={toastVariant} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default EventForm;
