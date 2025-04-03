import { createFileRoute, useSearch } from "@tanstack/react-router";
import z from "zod";
import { useState } from "react";
import users from "../../../users.json";
import "../../../index.css";

export const Route = createFileRoute("/users/details/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      typeOfProp: String(search.typeOfProp || ""), // Zapewniamy, że to string
      user_id: String(search.user_id || ""), // Zapewniamy, że to string
    };
  },
});

function RouteComponent() {
  const search = useSearch({ from: "/users/details/" });
  const user_id = search.user_id;
  const typeOfProp = search.typeOfProp;
  console.log(search);
  const addressTable = ["city", "street", "zipcode"];
  const companyTable = ["name", "catchPhrase", "bs"];
  const [headerText, setHeaderText] = useState("");
  const user = users.find((user) => user.id === Number(user_id));

  console.log(user);

  if (!user) {
    throw new Error("User not found");
  }

  if (typeOfProp === "address") {
    setHeaderText("Address Details");
  } else if (typeOfProp === "company") {
    setHeaderText("Company Details");
  }

  return (
    <>
      <div className="flex justify-center mt-6">
        <h2>{headerText}</h2>
        <table className="w-96 text-center border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Value</th>
            </tr>
          </thead>
          <tbody>
            {typeOfProp == "address"
              ? addressTable.map((prop, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-2 px-4">{prop}</td>
                    <td className="py-2 px-4">{user?.[typeOfProp]?.[prop]}</td>
                  </tr>
                ))
              : companyTable.map((prop, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-2 px-4">{prop}</td>
                    <td className="py-2 px-4">{user?.[typeOfProp]?.[prop]}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
