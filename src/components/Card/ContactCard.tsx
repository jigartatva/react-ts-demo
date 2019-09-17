import React from "react";

interface ContactCardProps {
  contact: {
    title: string;
    subTitle: string;
    details: string;
    avatar: string;
  };
  active: boolean;
}

const ContactCard = (props: ContactCardProps) => {
  const { contact, active } = props;

  return (
    <div
      className={
        active ? "chat__contact chat__contact--active" : "chat__contact"
      }
    >
      <div className="chat__contact-avatar">
        <img src={contact.avatar ? contact.avatar : ""} alt="ava" />
      </div>
      <div className="chat__contact-preview">
        <p className="chat__contact-name">{contact.title}</p>
        <p className="chat__contact-post">{contact.subTitle}</p>
        <p className="chat__contact-last-message">{contact.details}</p>
      </div>
    </div>
  );
};

export default ContactCard;
