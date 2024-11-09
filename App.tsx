import { useState, useEffect } from 'react';
import { Calendar, Search, Plus, Trash, Edit } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  phone: string;
  birthday: string;
  services: string;
}

const initialClients: Client[] = [
  { id: 1, name: 'John Doe', phone: '123456789', birthday: '1990-01-01', services: 'Service 1' },
  { id: 2, name: 'Jane Doe', phone: '987654321', birthday: '1995-06-01', services: 'Service 2' },
];

const App = () => {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [services, setServices] = useState('');
  const [todayBirthdays, setTodayBirthdays] = useState<Client[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const birthdays = clients.filter((client) => client.birthday.split('-').slice(1).join('-') === today.split('-').slice(1).join('-'));
    setTodayBirthdays(birthdays);
  }, [clients]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newClient: Client = {
      id: clients.length + 1,
      name,
      phone,
      birthday,
      services,
    };
    setClients([...clients, newClient]);
    setName('');
    setPhone('');
    setBirthday('');
    setServices('');
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleEdit = (id: number) => {
    const client = clients.find((client) => client.id === id);
    if (client) {
      setName(client.name);
      setPhone(client.phone);
      setBirthday(client.birthday);
      setServices(client.services);
      handleDelete(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Client Database</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSearch('')}>
          All Clients
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSearch(new Date().toISOString().split('T')[0].split('-').slice(1).join('-'))}>
          Today's Birthdays
        </button>
        <form className="flex justify-end">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by birthday"
            className="border-2 border-gray-300 rounded-l p-2"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
      <h2 className="text-2xl font-bold mb-4">Add Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthday">
            Birthday:
          </label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="services">
            Services:
          </label>
          <input
            type="text"
            id="services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          <Plus className="w-5 h-5" />
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4 mt-8">Client Database</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Birthday</th>
            <th className="border border-gray-300 p-2">Services</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients
            .filter((client) => client.birthday.includes(search) || search === '')
            .map((client) => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2">{client.name}</td>
                <td className="border border-gray-300 p-2">{client.phone}</td>
                <td className="border border-gray-300 p-2">{client.birthday}</td>
                <td className="border border-gray-300 p-2">{client.services}</td>
                <td className="border border-gray-300 p-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(client.id)}>
                    <Trash className="w-5 h-5" />
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(client.id)}>
                    <Edit className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2 className="text-2xl font-bold mb-4 mt-8">Today's Birthdays</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Birthday</th>
            <th className="border border-gray-300 p-2">Services</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todayBirthdays.map((client) => (
            <tr key={client.id}>
              <td className="border border-gray-300 p-2">{client.name}</td>
              <td className="border border-gray-300 p-2">{client.phone}</td>
              <td className="border border-gray-300 p-2">{client.birthday}</td>
              <td className="border border-gray-300 p-2">{client.services}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(client.id)}>
                  <Trash className="w-5 h-5" />
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(client.id)}>
                  <Edit className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;