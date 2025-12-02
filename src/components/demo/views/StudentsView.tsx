"use client";

import {
  MoreHorizontal,
  Mail,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const StudentsView = () => {
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      progress: 85,
      lastActive: "2 hours ago",
      status: "Active",
      role: "Student",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      progress: 42,
      lastActive: "1 day ago",
      status: "Active",
      role: "Student",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      progress: 12,
      lastActive: "5 days ago",
      status: "Inactive",
      role: "Student",
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana@example.com",
      progress: 98,
      lastActive: "10 mins ago",
      status: "Active",
      role: "Team Lead",
    },
    {
      id: 5,
      name: "Evan Wright",
      email: "evan@example.com",
      progress: 0,
      lastActive: "Never",
      status: "Pending",
      role: "Student",
    },
    {
      id: 6,
      name: "Fiona Gallagher",
      email: "fiona@example.com",
      progress: 65,
      lastActive: "3 hours ago",
      status: "Active",
      role: "Student",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive" | "Pending">("All");
  const [roleFilter, setRoleFilter] = useState<"All" | "Student" | "Team Lead">("All");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      student.name.toLowerCase().includes(normalizedSearch) ||
      student.email.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "All" || student.status === statusFilter;

    const matchesRole = roleFilter === "All" || student.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalCount = students.length;
  const visibleCount = filteredStudents.length;

  return (
    <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Students</h2>
          <p className="text-slate-400 mt-1">
            Manage your class roster and track progress.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors text-sm font-medium"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all text-sm font-medium">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Search and Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-4">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center justify-between px-6">
          <span className="text-slate-400 text-sm font-medium">
            Total Students
          </span>
          <span className="text-2xl font-bold text-white">{totalCount}</span>
        </div>
      </div>

      {/* Filters row */}
      {showFilters && (
        <div className="mb-6 flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Status
            </span>
            {["All", "Active", "Inactive", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(status as "All" | "Active" | "Inactive" | "Pending")
                }
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  statusFilter === status
                    ? "bg-cyan-600/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900/60 text-slate-400 border-slate-700 hover:border-cyan-500/40 hover:text-cyan-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Role
            </span>
            {["All", "Student", "Team Lead"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setRoleFilter(role as "All" | "Student" | "Team Lead")
                }
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  roleFilter === role
                    ? "bg-cyan-600/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900/60 text-slate-400 border-slate-700 hover:border-cyan-500/40 hover:text-cyan-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-400 font-medium border-b border-slate-800">
              <tr>
                <th className="px-6 py-6">Student</th>
                <th className="px-6 py-6">Role</th>
                <th className="px-6 py-6">Course Progress</th>
                <th className="px-6 py-6">Last Active</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="group hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-sm mr-3 shadow-inner border border-slate-600">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {student.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-slate-300">{student.role}</td>
                  <td className="px-6 py-6">
                    <div className="w-full max-w-xs">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">
                          {student.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            student.progress === 100
                              ? "bg-green-500"
                              : student.progress > 50
                              ? "bg-cyan-500"
                              : student.progress > 0
                              ? "bg-orange-500"
                              : "bg-slate-600"
                          }`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-slate-400">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        student.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : student.status === "Inactive"
                          ? "bg-slate-700/30 text-slate-400 border-slate-600"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          student.status === "Active"
                            ? "bg-emerald-400"
                            : student.status === "Inactive"
                            ? "bg-slate-400"
                            : "bg-amber-400"
                        }`}
                      ></span>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500 text-sm"
                  >
                    No students match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (static, but text reacts to filters) */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-white">
              {visibleCount === 0 ? 0 : 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-white">
              {visibleCount}
            </span>{" "}
            of{" "}
            <span className="font-medium text-white">
              {totalCount}
            </span>{" "}
            results
          </div>
          <div className="flex space-x-2">
            <button className="p-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsView;
