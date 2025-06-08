// components/profile/FieldWrapper.tsx
import React from "react";

interface FieldWrapperProps {
  label: string;
  children: React.ReactNode;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({ label, children }) => (
  <div className="space-y-1.5">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    {children}
  </div>
);

export default FieldWrapper;
