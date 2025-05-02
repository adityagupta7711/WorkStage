"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

interface AuthFormProps {
  mode: "sign-up" | "log-in";
  buttonText: string;
  linkText: string;
  linkHref: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  buttonText,
  linkText,
  linkHref,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (email) {
      setIsEmailValid(/\S+@\S+\.\S+/.test(email));
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      setIsPasswordValid(password.length >= 6);
    }
  }, [password]);

  const handleSubmit = async () => {
    if (!email || !password || (mode === "sign-up" && !fullName)) {
      setErrorMessage("All fields are required");
      return;
    }

    if (isEmailValid && isPasswordValid) {
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);

      const requestData = {
        email,
        password,
        ...(mode === "sign-up" && { fullName }),
      };

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/${
            mode === "sign-up" ? "register" : "login"
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage(
            `${mode === "sign-up" ? "Registration" : "Log in"} successful`
          );
          console.log(data); // Handle the response data as needed

          // Navigate to the home page after success
          router.push("/"); // Redirect to home

          // Clear form after success
          setFullName("");
          setEmail("");
          setPassword("");
        } else {
          setErrorMessage(data.msg || "An error occurred");
        }
      } catch (error) {
        setErrorMessage("An error occurred");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const allFieldsFilled =
    mode === "sign-up" ? fullName && email && password : email && password;

  return (
    <div className="authBg w-full h-screen flex justify-center items-center">
      <div className="w-[648px] h-[476px] authDivBg rounded-[16px] border border-gray-300 p-6">
        <h3 className="text-[48px] text-center font-semibold">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </h3>
        <div className="flex flex-col gap-6 w-[90%] mx-auto mt-6">
          {mode === "sign-up" && (
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="py-2.5 bg-[#EBEBEB] px-4 rounded-[8px] border w-[528px]"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`py-2.5 px-4 rounded-[8px] border w-[528px] ${
              isEmailValid ? "bg-[#EBEBEB]" : "bg-red-200"
            }`}
          />
          {!isEmailValid && (
            <p className="text-red-600 text-sm">Invalid email address</p>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`py-2.5 px-4 rounded-[8px] border w-[528px] ${
              isPasswordValid ? "bg-[#EBEBEB]" : "bg-red-200"
            }`}
          />
          {!isPasswordValid && (
            <p className="text-red-600 text-sm">
              Password must be at least 6 characters
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
          <button
            onClick={handleSubmit}
            className={`py-2.5 px-4 rounded-[8px] border w-[528px] h-[52px] text-[#FFFFFF] text-[20px] ${
              allFieldsFilled ? "authFinalBtn" : "authBtnBg"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : buttonText}
          </button>
          <p className="text-[#606060] text-center text-[20px]">
            {mode === "sign-up"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Link href={linkHref} className="text-[#0054A1]">
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
