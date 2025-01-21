import React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-blue-100 max-w-2xl">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
