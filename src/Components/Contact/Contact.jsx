import React, { useState } from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "246b0522-e99b-483c-aa21-80669530ed47");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset(); // Reset the form
      } else {
        console.error("Error:", data);
        setResult(data.message || "Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResult("Network error. Please try again later.");
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} alt="Message Icon" />
        </h3>
      </div>

      <div className="contact-col">
        <p>
          Feel free to reach out through the contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          university community.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="Mail Icon" />
            Contact@Greatstack.dev
          </li>
          <li>
            <img src={phone_icon} alt="Phone Icon" />
            +1 123-456-7890
          </li>
          <li>
            <img src={location_icon} alt="Location Icon" />
            77 Massachusetts Ave, Cambridge <br />
            MA 02139, United States
          </li>
        </ul>
      </div>

      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter your mobile number" required />

          <label>Write your message here</label>
          <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>

          <button type="submit" className="btn dark-btn">
            Submit Now <img src={white_arrow} alt="Arrow Icon" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
