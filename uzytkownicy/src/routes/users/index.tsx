import { createFileRoute, Link } from "@tanstack/react-router";
import users from "../../users.json";

export const Route = createFileRoute("/users/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="flex justify-center mt-6">
        <table className="w-96 text-center border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">User Name</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`./${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
