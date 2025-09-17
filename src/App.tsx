import { profiles } from "./data/profileData";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Profil</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((p) => (
          <Link
            key={p.id}
            to={`/${p.id}`}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={p.profile.profileImage}
              alt={p.profile.name}
              className="w-24 h-24 rounded-full mb-3"
              loading="lazy"
            />
            <h2 className="text-xl font-semibold">{p.profile.name}</h2>
            <p className="text-gray-500">{p.profile.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
