// components/PasswordPromptDialog.tsx
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import "./PasswordDialog.css";

const PasswordPromptDialog = () => {
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const request = await fetch(`/api/password`, {
      body: JSON.stringify({password}),
      headers: {"Content-Type": "application/json"},
      method: "post",
    });

    if (request.status !== 200)
      return setPasswordIncorrect(true), setLoading(false);
    else window.location.reload();
  }

  return (
    <div className="password-prompt-dialog flex justify-center items-center">
      <div className="border p-6 rounded sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-xl font-semibold leading-9 text-gray-900">Enter the password to continue</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="password-container">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password:</label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full	bg-primary-500" type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPromptDialog;
