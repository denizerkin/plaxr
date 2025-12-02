"use client";

import { Clock, ChevronDown, Pencil, Info, Trash2 } from "lucide-react";
import { useState } from "react";

const carCourses = [
  {
    id: "porsche-992-gt3rs",
    name: "Porsche 911 GT3 RS (992) – 2022",
    subtitle: "Track-focused GT car • Performance & safety",
    courses: [
      { id: 12, title: "GT3 RS Overview, Controls & Track-Day Checklist", duration: "15 min" },
      { id: 13, title: "Roll Cage, Harness & Fire Safety Systems", duration: "20 min" },
      { id: 14, title: "Aero Package & Adjustable Wing Setup", duration: "25 min" },
      { id: 15, title: "PCCB Brake Inspection & Cooling Management", duration: "22 min" },
      { id: 16, title: "Tyre Pressures, Temperature Windows & TPMS", duration: "18 min" },

      { id: 17, title: "4.0L Flat-Six Oil Change & Filter Replacement", duration: "30 min" },
      { id: 18, title: "Dry-Sump Lubrication System Inspection", duration: "20 min" },

      { id: 19, title: "Brake Pads Change (Front & Rear) – PCCB / Steel Rotors", duration: "35 min" },
      { id: 20, title: "Brake Fluid Flush (DOT 4/5.1) & Bleeding Procedure", duration: "25 min" },

      { id: 21, title: "Suspension Setup: Ride Height, Toe, Camber, Caster", duration: "40 min" },
      { id: 22, title: "GT3 RS Adaptive Dampers (PASM) – Diagnostics & Tuning", duration: "22 min" },

      { id: 23, title: "Air Intake System & Throttle Bodies Cleaning", duration: "18 min" },
      { id: 24, title: "Cooling System: Radiator Check & Airflow Optimization", duration: "20 min" },

      { id: 25, title: "Nose Lift System Inspection (Front Axle Lift)", duration: "14 min" },
      { id: 26, title: "Wheel Torque, Wheel Studs & Safety Check", duration: "12 min" },
      { id: 27, title: "Fuel System & Octane Requirements (Track Use)", duration: "10 min" },

      { id: 28, title: "Porsche Track Precision App (PTPA) Setup & Data Logging", duration: "18 min" },
      { id: 29, title: "ECU Fault Codes & Basic Diagnostics", duration: "22 min" },
    ],
  },
  {
    id: "tesla-model-3",
    name: "Tesla Model 3",
    subtitle: "EV sedan • High-voltage safety",
    courses: [
      { id: 1, title: "Model 3 Overview & Controls", duration: "12 min" },
      { id: 2, title: "High-Voltage Safety & Lockout/Tagout", duration: "25 min" },
      { id: 3, title: "Battery Pack Inspection & Cooling Circuit", duration: "30 min" },
      { id: 4, title: "Brake-by-Wire & Regenerative Braking Checks", duration: "20 min" },
    ],
  },
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    subtitle: "ICE compact • Workshop fundamentals",
    courses: [
      { id: 5, title: "Corolla Safety Protocols & PPE", duration: "10 min" },
      { id: 6, title: "Engine Bay Layout & Component ID", duration: "18 min" },
      { id: 7, title: "Oil Change & Filter Replacement", duration: "22 min" },
      { id: 8, title: "Brake System Inspection & Pad Wear", duration: "25 min" },
    ],
  },
  {
    id: "bmw-i4",
    name: "BMW i4",
    subtitle: "Premium EV • Diagnostics & ADAS",
    courses: [
      { id: 9, title: "i4 Powertrain Architecture", duration: "15 min" },
      { id: 10, title: "Charging System & CCS Port Inspection", duration: "18 min" },
      { id: 11, title: "ADAS Sensor Calibration (Radar/LiDAR)", duration: "28 min" },
    ],
  },
];

const LessonsView = () => {
  const [openCarId, setOpenCarId] = useState<string | null>(carCourses[0].id);

  const toggleCar = (id: string) => {
    setOpenCarId((current) => (current === id ? null : id));
  };

  return (
    <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-2">Course Lessons</h2>
      <p className="text-sm text-slate-400 mb-6">
        As a course creator, expand a vehicle to review, edit or remove its XR maintenance lessons.
      </p>

      <div className="space-y-4">
        {carCourses.map((car) => {
          const isOpen = openCarId === car.id;
          return (
            <div
              key={car.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
            >
              {/* Car header / dropdown button */}
              <button
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-900/70 transition-colors"
                onClick={() => toggleCar(car.id)}
              >
                <div className="text-left">
                  <h3 className="text-white font-semibold">{car.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {car.subtitle}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Lessons list */}
              {isOpen && (
                <div className="border-t border-slate-800 px-4 pb-4 pt-2 space-y-3">
                  {car.courses.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-slate-900/70 border border-slate-800 rounded-lg p-3 flex items-center justify-between hover:border-cyan-500/50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-700 transition-colors">
                          {/* Just a simple lesson icon / bullet */}
                          <span className="text-xs font-semibold">
                            {lesson.id}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center text-[11px] text-slate-500 mt-1 space-x-3">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration}
                            </span>
                            <span className="text-slate-500">
                              Lesson #{lesson.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Creator actions: Edit / Info / Delete */}
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-cyan-600 hover:text-white transition-colors"
                          aria-label="Edit lesson"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          aria-label="Lesson details"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
                          aria-label="Delete lesson"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsView;
