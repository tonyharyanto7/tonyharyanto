/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export const LegalInfo = ({ legal }) => {
  if (!legal.enabled) return null;

  return (
    <div className="mt-12 bg-black/50 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Legal Disclosure
      </h2>
      <div className="space-y-2 text-center">
        {legal.name && (
          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="inline-block" />
            {legal.name}
          </p>
        )}
        {legal.address && (
          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="inline-block" />
            {legal.address}
          </p>
        )}
        {legal.email && (
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope className="inline-block" />
            {legal.email}
          </p>
        )}
        {legal.phone && (
          <p className="flex items-center justify-center gap-2">
            <FaPhone className="inline-block" />
            {legal.phone}
          </p>
        )}
        {legal.legal_disclaimer && (
          <p className="text-sm text-gray-400 mt-4">{legal.legal_disclaimer}</p>
        )}
      </div>
    </div>
  );
};
