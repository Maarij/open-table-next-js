"use client"

import {useEffect, useState} from "react";
import * as React from "react";
import useReservation from "@/hooks/useReservation";
import {CircularProgress} from "@mui/material";

export default function Form(
  {
    slug,
    partySize,
    date
  }: {
    slug: string;
    partySize: string;
    date: string;
  }
) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequests: ""
  });

  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const {error, loading, createReservation} = useReservation();
  const [didBook, setDidBook] = useState(false);

  useEffect(() => {
    if (inputs.bookerFirstName
      && inputs.bookerLastName
      && inputs.bookerEmail
      && inputs.bookerPhone) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  };

  const handleClick = async () => {
    await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequests: inputs.bookerRequests,
      setDidBook
    });
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <p>You are all booked!</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name={"bookerFirstName"}
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name={"bookerLastName"}
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name={"bookerPhone"}
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name={"bookerEmail"}
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name={"bookerOccasion"}
            onChange={handleChangeInput}
            value={inputs.bookerOccasion}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name={"bookerRequests"}
            onChange={handleChangeInput}
            value={inputs.bookerRequests}
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClick}>
            {loading ? <CircularProgress color={"inherit"} /> : "Complete reservation" }
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  )
}