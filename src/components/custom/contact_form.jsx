/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import { useState } from "react";

export const ContactForm = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });

  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ message: "", type: "" });

    try {
      const response = await onSubmit(formData);

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          message: result.message || config.success_message,
          type: "success",
        });
        setFormData({ name: "", email: "", message: "", consent: false });
      } else {
        setSubmitStatus({
          message: result.message || config.failure_message,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        message: config.error_message || "An unexpected error occurred.",
        type: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-sm shadow-md rounded-lg p-8 space-y-6"
      >
        {config.fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-white-700 font-medium mb-2"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                className="c-cursor-text w-full px-3 py-2 border bg-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                className="c-cursor-text w-full px-3 py-2 border bg-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}

        <div className="flex items-start space-x-3">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="sr-only"
            />
            <label
              htmlFor="consent"
              className={`c-cursor-pointer w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                formData.consent
                  ? "bg-primary border-primary"
                  : "bg-black/10 border-gray-400 hover:border-primary"
              }`}
            >
              <svg
                className={`w-3 h-3 text-white transition-opacity duration-200 ${
                  formData.consent ? "opacity-100" : "opacity-0"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <label
            htmlFor="consent"
            className="c-cursor-pointer text-white-700 text-sm flex-1"
          >
            I consent to the processing of my personal data for the purpose of
            responding to my inquiry.
          </label>
        </div>

        <button
          type="submit"
          className="c-cursor-pointer w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {config.send_button}
        </button>
      </form>

      {submitStatus.message && (
        <div
          className={`mt-[1rem] text-center ${
            submitStatus.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
    </>
  );
};
