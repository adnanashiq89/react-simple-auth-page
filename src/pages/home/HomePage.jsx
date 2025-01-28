import React from "react";

export const HomesPages = () => {
  const events = [
    // Your dummy events data
  ];

  return (
    <div className="p-4">
      {/* Location, Notifications, Search */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xs">Current Location</h1>
          <h2 className="text-lg font-bold">New York, USA</h2>
        </div>
        <button className="bg-white p-2 rounded-full shadow-md">
          <i className="text-lg">🔔</i> {/* Notification Icon */}
        </button>
      </header>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Events"
          className="w-full p-3 rounded-full shadow-md"
        />
      </div>

      {/* Upcoming Events and Today's Events Sections */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Upcoming Events</h3>
          <a href="#" className="text-sm text-gray-600">
            See All
          </a>
        </div>
        <div className="flex overflow-x-auto space-x-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[250px] p-4 rounded-lg shadow-md bg-white"
            >
              <img
                src={event.image}
                alt={event.title}
                className="rounded-lg mb-2"
              />
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs">{event.date}</span>
                <button className="bg-white p-2 rounded-full shadow-md">
                  <i className="text-lg">❤️</i> {/* Like Icon */}
                </button>
              </div>
              <h4 className="text-sm font-bold">{event.title}</h4>
              <p className="text-xs text-gray-500">{event.location}</p>
              <div className="flex items-center mt-2">
                <div className="flex -space-x-2">
                  {event.interested.map((user, idx) => (
                    <img
                      key={idx}
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  +{event.interestedCount} Interested
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
