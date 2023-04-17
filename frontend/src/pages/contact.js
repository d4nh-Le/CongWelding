import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import './contact.css'

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submit = () => {
        if (name && email && message) {
            const serviceId = 'service_10ht8ug';
            const templateId = 'template_kne5buk';
            const publicKey = 'vBRXY7HSo6ym0ClRz';
            const templateParams = {
                name,
                email,
                message
            };

            emailjs.send(serviceId, templateId, templateParams, publicKey)
                .then(response => console.log(response))
                .then(error => console.log(error));

            setName('');
            setEmail('');
            setMessage('');
        } else {
            alert('Please fill in all fields.');
        }
    }

    return (
        <><h1>Please fill our contact form to contact us directly:</h1><div id="contact-form">
            <input className="contact-input" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            <input  className="contact-input" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button className="contact-button" onClick={submit}>Send Message</button>
        </div>
        <h4>We will respond via email within 2 business days.</h4></>
    );
};

export default Contact;