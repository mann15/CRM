import React from "react";
import Profile from "./Profile.jsx";
import { School, GraduationCap, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const userType = useSelector((state) => state.auth.userType);
  const cards = [
    { title: "College", icon: School, route: "/college" },
    { title: "University", icon: GraduationCap, route: "/university" },
    { title: "Industry", icon: Briefcase, route: "/industry" },
  ];

  if (userType === "admin") {
    cards.push({ title: "User", icon: User, route: "/user" });
  }

  const isThreeCards = cards.length === 3;

  return (
    <div className="min-h-screen bg-[var(--table-color)] flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-4 right-5 flex justify-end items-center w-full max-w-7xl">
        <Profile />
      </div>

      <div className="w-full max-w-7xl">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            isThreeCards ? "lg:grid-cols-3 mx-auto" : "lg:grid-cols-4"
          } gap-6 w-full ${isThreeCards ? "lg:w-3/4 xl:w-3/4 mx-auto" : ""}`}
        >
          {cards.map((card) => (
            <Link to={card.route} key={card.title}>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center justify-center aspect-square">
                <card.icon
                  strokeWidth={0.5}
                  size={120}
                  className="text-[#365ED9] mb-3"
                />
                <h2 className="text-xl font-medium text-[#3A58B9]">
                  {card.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
