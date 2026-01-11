import { useState } from "react";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!name || !email) return alert("Please fill all fields");

    setCustomers([...customers, { id: Date.now(), name, email }]);
    setName("");
    setEmail("");
  };

  const handleEdit = (cust) => {
    setEditId(cust.id);
    setName(cust.name);
    setEmail(cust.email);
  };

  const handleUpdate = () => {
    setCustomers(
      customers.map((cust) =>
        cust.id === editId ? { ...cust, name, email } : cust
      )
    );
    setEditId(null);
    setName("");
    setEmail("");
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((cust) => cust.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React CRUD Project</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editId ? (
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>
          Update
        </button>
      ) : (
        <button className="bg-green-500 text-white px-4 py-2" onClick={handleAdd}>
          Add
        </button>
      )}

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td className="border p-2">{cust.name}</td>
              <td className="border p-2">{cust.email}</td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2" onClick={() => handleEdit(cust)}>
                  Edit
                </button>
                <button className="text-red-500" onClick={() => handleDelete(cust.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
