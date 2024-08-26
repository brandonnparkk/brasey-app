"use client";

import "./PasswordDialog.css";
import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const PasswordPromptDialog = () => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const request = await fetch(`/api/password`, {
      body: JSON.stringify({password, firstName, lastName, email}),
      headers: {"Content-Type": "application/json"},
      method: "post",
    });

    if (request.status !== 200)
      return setPasswordIncorrect(true), setLoading(false);
    else window.location.reload();
  }

  return (
    <>
    {loading ?
      <div>Is Loading...</div> :
      <div className="password-dialog-container flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-start">Please enter your password:</h1>
        <form className="flex space-x-2" onSubmit={handleSubmit}>
          <div className="flex-1">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email address here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="self-end bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
    }
    </>
  );
};

export default PasswordPromptDialog;
