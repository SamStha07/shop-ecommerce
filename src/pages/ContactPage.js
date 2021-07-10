import React from 'react';
import ContactForm from '../components/Contact/ContactForm';

const ContactPage = () => {
  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      <h4 style={{ display: 'flex', justifyContent: 'center' }}>Contact Us</h4>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
