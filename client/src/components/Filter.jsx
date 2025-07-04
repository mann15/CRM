import React, { useState } from "react";
import axios from "axios";
import {
  FolderPen,
  LayoutGrid,
  ListChecks,
  TicketX,
  ChevronDown,
  LogOut,
} from "lucide-react";



const Collapsible = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="mb-4">
    <div
      className="flex justify-between items-center cursor-pointer py-2"
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6" />
        <span className="text-lg font-medium">{title}</span>
      </div>
      <ChevronDown
        className={`h-6 w-6 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
    {isOpen && <div className="pt-4">{children}</div>}
  </div>
);

const Filter = () => {
  const [isCollegeOpen, setCollegeOpen] = useState(true);
  const [isDepartmentOpen, setDepartmentOpen] = useState(true);
  const [isCoursesOpen, setCoursesOpen] = useState(true);
  return (
    <div className="space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="rounded-xl bg-[var(--input-color)] p-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-black" />
          <span className="text-lg text-black font-medium">Dashboard</span>
        </div>
      </div>
      <Collapsible
        title="College"
        icon={FolderPen}
        isOpen={isCollegeOpen}
        onToggle={() => setCollegeOpen(!isCollegeOpen)}
      >
        <input
          type="text"
          placeholder="Enter College"
          className="w-full p-2 rounded bg-[var(--input-color)] text-black placeholder:text-black mb-2 focus:outline-none"
        />
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-white" />
            Self Financed
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-white" />
            Government
          </label>
        </div>
      </Collapsible>

      <Collapsible
        title="Department"
        icon={TicketX}
        isOpen={isDepartmentOpen}
        onToggle={() => setDepartmentOpen(!isDepartmentOpen)}
      >
        <select className="w-full p-2 rounded bg-[var(--input-color)] text-black focus:outline-none">
          <option value="computer">Computer Engineering</option>
          <option value="civil">Civil Engineering</option>
          <option value="mechanical">Mechanical Engineering</option>
          <option value="electrical">Electrical Engineering</option>
          <option value="automobile">Automobile Engineering</option>
        </select>
      </Collapsible>

      <Collapsible
        title="Courses"
        icon={ListChecks}
        isOpen={isCoursesOpen}
        onToggle={() => setCoursesOpen(!isCoursesOpen)}
      >
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="course"
              value="a"
              className="accent-black"
            />
            <span>Option A</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="course"
              value="b"
              className="accent-black"
            />
            <span>Option B</span>
          </label>
        </div>
      </Collapsible>
      <div>
       
      </div>
    </div>
  );
};

export default Filter;
