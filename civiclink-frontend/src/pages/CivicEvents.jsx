import React from "react";
import  independence from '../assets/images/independence.jpg';
import  sankranthi from '../assets/images/sankranthi.jpg'

const civicEvents = [
  {
    title: "Swachh Bharat Drive",
    date: "July 10, 2025",
    location: "Ward 2, Park Area",
    description: "Join hands for a cleaner neighborhood with volunteers from all age groups.",
    image: "/images/swachh.jpg",
  },
  {
    title: "Independence Day Celebration",
    date: "August 15, 2025",
    location: "Municipal Office Grounds",
    description: "Cultural performances, flag hoisting, and felicitation of civic workers.",
    image: "/images/independence.jpg",
  },
  {
      title: "Sankranthi celebrations",
      date: "Jan 10-20",
      location: "Municipal Office Grounds",
      image: "/images/sankranthi.jpg",
      description: "Pooja, Activities and games with Cultural performances and felicitation of civic workers.",

    },
];

export default function CivicEvents() {
  return (
    <div className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Civic Events & Festivals</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {civicEvents.map((event, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              {event.image && <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{event.date} • {event.location}</p>
                <p className="mt-3 text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
