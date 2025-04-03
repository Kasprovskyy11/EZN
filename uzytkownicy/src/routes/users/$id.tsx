import { createFileRoute, Link } from "@tanstack/react-router";
import users from "../../users.json";

export const Route = createFileRoute("/users/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const jsonTable = [
    "username",
    "phone",
    "email",
    "city",
    "website",
    "company",
  ];

  const { id } = Route.useParams();

  const user = users.find((user) => user.id == id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center mt-6 p-6 text-3xl uppercase font-bold">
        <h2>User not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <h2 className="p-6 text-3xl">{user?.name}</h2>
        <table className="w-96 text-center border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Value</th>
            </tr>
          </thead>
          <tbody>
            {jsonTable.map((prop, index) => (
              <tr
                key={prop}
                className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="uppercase font-bold px-4 py-2">{prop}</td>
                <td className=" px-4 py-2">
                  {prop === "city" ? (
                    <Link
                      to={`/users/details?typeOfProp=address&user_id=${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.address.city}
                    </Link>
                  ) : prop === "company" ? (
                    <Link
                      to={`/users/details?typeOfProp=company&user_id=${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.company.name}
                    </Link>
                  ) : (
                    user[prop]
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
