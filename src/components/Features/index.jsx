// src/components/Features.jsx
import React from "react";
import { useFeatures } from "../../hooks/useFeatures";

function Features() {
  const { features } = useFeatures();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Unlock Your <span className="text-blue-600">Travel Potential</span>
          </h2>
          <p className="text-xl text-gray-600">
            Experience travel like never before with our innovative solutions
            designed to transform your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl"
            >
              <div className="p-8 text-center relative z-10">
                <div
                  className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full ${feature.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}
                >
                  <feature.icon className="w-10 h-10 stroke-current" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
