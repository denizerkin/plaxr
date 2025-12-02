"use client";

import { Play, Clock, CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const carCourses = [
    {
    id: "porsche-992-gt3rs",
    name: "Porsche 911 GT3 RS (992) – 2022",
    subtitle: "Track-focused GT car • Performance & safety",
    courses: [
        {
        id: 12,
        title: "GT3 RS Overview, Controls & Track-Day Checklist",
        duration: "15 min",
        status: "Completed",
        progress: 100,
        },
        {
        id: 13,
        title: "Roll Cage, Harness & Fire Safety Systems",
        duration: "20 min",
        status: "Completed",
        progress: 100,
        },
        {
        id: 14,
        title: "Aero Package & Adjustable Wing Setup",
        duration: "25 min",
        status: "In Progress",
        progress: 35,
        },
        {
        id: 15,
        title: "PCCB Brake Inspection & Cooling Management",
        duration: "22 min",
        status: "Not Started",
        progress: 0,
        },
        {
        id: 16,
        title: "Tyre Pressures, Temperature Windows & TPMS",
        duration: "18 min",
        status: "Not Started",
        progress: 0,
        },
        {
            id: 17,
            title: "4.0L Flat-Six Oil Change & Filter Replacement",
            duration: "30 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 18,
            title: "Dry-Sump Lubrication System Inspection",
            duration: "20 min",
            status: "Not Started",
            progress: 0,
          },
      
          // Brakes
          {
            id: 19,
            title: "Brake Pads Change (Front & Rear) – PCCB / Steel Rotors",
            duration: "35 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 20,
            title: "Brake Fluid Flush (DOT 4/5.1) & Bleeding Procedure",
            duration: "25 min",
            status: "Not Started",
            progress: 0,
          },
      
          // Suspension & Alignment
          {
            id: 21,
            title: "Suspension Setup: Ride Height, Toe, Camber, Caster",
            duration: "40 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 22,
            title: "GT3 RS Adaptive Dampers (PASM) – Diagnostics & Tuning",
            duration: "22 min",
            status: "Not Started",
            progress: 0,
          },
      
          // Engine bay & Intake
          {
            id: 23,
            title: "Air Intake System & Throttle Bodies Cleaning",
            duration: "18 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 24,
            title: "Cooling System: Radiator Check & Airflow Optimization",
            duration: "20 min",
            status: "Not Started",
            progress: 0,
          },
      
          // Track preparation
          {
            id: 25,
            title: "Nose Lift System Inspection (Front Axle Lift)",
            duration: "14 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 26,
            title: "Wheel Torque, Wheel Studs & Safety Check",
            duration: "12 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 27,
            title: "Fuel System & Octane Requirements (Track Use)",
            duration: "10 min",
            status: "Not Started",
            progress: 0,
          },
      
          // Electronics & telemetry
          {
            id: 28,
            title: "Porsche Track Precision App (PTPA) Setup & Data Logging",
            duration: "18 min",
            status: "Not Started",
            progress: 0,
          },
          {
            id: 29,
            title: "ECU Fault Codes & Basic Diagnostics",
            duration: "22 min",
            status: "Not Started",
            progress: 0,
          },
    ],
    },
    {
    id: "tesla-model-3",
    name: "Tesla Model 3",
    subtitle: "EV sedan • High-voltage safety",
    courses: [
        {
        id: 1,
        title: "Model 3 Overview & Controls",
        duration: "12 min",
        status: "Completed",
        progress: 100,
        },
        {
        id: 2,
        title: "High-Voltage Safety & Lockout/Tagout",
        duration: "25 min",
        status: "In Progress",
        progress: 40,
        },
        {
        id: 3,
        title: "Battery Pack Inspection & Cooling Circuit",
        duration: "30 min",
        status: "Not Started",
        progress: 0,
        },
        {
        id: 4,
        title: "Brake-by-Wire & Regenerative Braking Checks",
        duration: "20 min",
        status: "Not Started",
        progress: 0,
        },
    ],
    },
    {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    subtitle: "ICE compact • Workshop fundamentals",
    courses: [
        {
        id: 5,
        title: "Corolla Safety Protocols & PPE",
        duration: "10 min",
        status: "Completed",
        progress: 100,
        },
        {
        id: 6,
        title: "Engine Bay Layout & Component ID",
        duration: "18 min",
        status: "Completed",
        progress: 100,
        },
        {
        id: 7,
        title: "Oil Change & Filter Replacement",
        duration: "22 min",
        status: "In Progress",
        progress: 60,
        },
        {
        id: 8,
        title: "Brake System Inspection & Pad Wear",
        duration: "25 min",
        status: "Not Started",
        progress: 0,
        },
    ],
    },
    {
    id: "bmw-i4",
    name: "BMW i4",
    subtitle: "Premium EV • Diagnostics & ADAS",
    courses: [
        {
        id: 9,
        title: "i4 Powertrain Architecture",
        duration: "15 min",
        status: "In Progress",
        progress: 30,
        },
        {
        id: 10,
        title: "Charging System & CCS Port Inspection",
        duration: "18 min",
        status: "Not Started",
        progress: 0,
        },
        {
        id: 11,
        title: "ADAS Sensor Calibration (Radar/LiDAR)",
        duration: "28 min",
        status: "Not Started",
        progress: 0,
        },
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
        Select a vehicle to view its XR maintenance & safety curriculum.
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
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center ${
                            lesson.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : lesson.status === "In Progress"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {lesson.status === "Completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center text-[11px] text-slate-500 mt-1 space-x-3">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />{" "}
                              {lesson.duration}
                            </span>
                            <span>{lesson.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-28">
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              lesson.status === "Completed"
                                ? "bg-green-500"
                                : "bg-cyan-500"
                            }`}
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
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
