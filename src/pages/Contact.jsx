import { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (formData.fullName.length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters long";
    }

    if (formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters long";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.message.length < 3) {
      newErrors.message = "Message must be at least 3 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
      setFormData({ fullName: "", subject: "", email: "", message: "" });
    }
  };

  return (
    <div className={styles.contactContainer}>
      {" "}
      {/* ✅ Bruker CSS Module */}
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>Full Name:</label>
          <input
            className={styles.input}
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          {errors.fullName && (
            <p className={styles.errorMessage}>{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Subject:</label>
          <input
            className={styles.input}
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          {errors.subject && (
            <p className={styles.errorMessage}>{errors.subject}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Message:</label>
          <textarea
            className={styles.input}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          {errors.message && (
            <p className={styles.errorMessage}>{errors.message}</p>
          )}
        </div>

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
