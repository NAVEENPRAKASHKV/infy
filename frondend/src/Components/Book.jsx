import React, { useState } from "react";

const Book = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const generateSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 17; hour++) {
      if (hour === 13) continue; // Skip 1 PM
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour;
      slots.push(`${displayHour}:00 ${period}`);
      slots.push(`${displayHour}:30 ${period}`);
    }
    return slots;
  };

  console.log(generateSlots());

  const availableSlots = generateSlots().filter(
    (slot) => !(appointments[date] && appointments[date].includes(slot))
  );
  const handleBookAppointment = () => {
    if (!name || !phone || !selectedSlot) {
      setError("Date, slote ,name and phone number is mandatory");
      return;
    }
    setError("");
    setAppointments((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), selectedSlot],
    }));
    setName("");
    setPhone("");
    setSelectedSlot(null);
  };

  return (
    <div className="w-full h-screen bg-green-100 flex justify-center py-10">
      <div className="bg-green-300 w-auto rounded-lg ">
        <div className=" flex flex-col px-10 justify-center gap-5 ">
          <h4 className="text-center  font-bold text-lg">BOOK YOUR SLOTS</h4>

          <div className=" flex justify-center gap-5  ">
            <label className="font-semibold" htmlFor="date">
              {" "}
              Select the date
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              className="px-2 rounded-md"
              type="date"
            />
          </div>
          {/* slots */}
          <div className=" flex flex-wrap w-[400px] gap-4 justify-center">
            {availableSlots.map((slot) => {
              return (
                <div
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={` cursor-pointer px-2 py-1 bg-white w-24 rounded-md ${
                    selectedSlot === slot ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {slot}
                </div>
              );
            })}
          </div>
          {/* name and number */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5 ">
              <label className="font-semibold" htmlFor="name">
                Enter your name
              </label>
              <input
                className="rounded-md px-2 py-1"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
            </div>
            <div className="flex justify-between gap-5 ">
              <label className="font-semibold" htmlFor="phone">
                Enter your Number
              </label>
              <input
                className="rounded-md px-2 py-1"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                id="phone"
              />
            </div>
            {/* button */}
          </div>

          <div className="w-full flex justify-center">
            <button
              onClick={handleBookAppointment}
              className="bg-blue-600  py-2 px-3 text-white rounded-md"
            >
              sumbit
            </button>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Book;
