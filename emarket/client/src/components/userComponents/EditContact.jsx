import React, { useState, useEffect } from "react";
import OTPVeify from "./otpVerify";
import useAxiosInstance from "../../utils/useAxios";
import "../../styles/editcontact.css";

export default function EditContact() {
  const [change, setChange] = useState(false);
  const [contact, setContact] = useState(null);
  const api = useAxiosInstance();
  const url = "";
  useEffect(() => {
    async function changeContact() {
      // try {
      //   const response = await api.get(url);
      // } catch (error) {
      //   console.error(error);
      // }
      // console.log("got here");
      // console.log(contact);
      setChange(false);
    }

    changeContact();
  }, [contact]);

  const getContact = (val) => {
    setContact(val);
  };

  const handleEdit = () => {
    setChange(true);
  };
  if (!change) {
    return (
      <div>
        <button onClick={handleEdit} className="edit-btn">
          Edit Info <i className="fa fa-edit"></i>
        </button>
      </div>
    );
  } else {
    return (
      <div className="edit-form">
        <OTPVeify getContact={getContact} />
        <button
          onClick={() => {
            setChange(false);
          }}
          className="cancel-btn"
        >
          cancel
        </button>
      </div>
    );
  }
}
