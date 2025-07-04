import React from "react";

const ContactForm = () => (
  <section id="contact" className="contact-section">
    <h2>Contact Us</h2>
    <p>
      To place an order, email us at
      <a href="mailto:tots@example.com" className="contact-link">
        {" "}
        tots@example.com
      </a>
      .
    </p>
    <p>We accept cash on delivery or Instapay.</p>
  </section>
);

export default ContactForm;
