import { useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function UploadJsonPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [status, setStatus] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthenticated(true);
      setEmail("");
      setPassword("");
      setStatus("✅ Login berhasil!");
    } catch (err: any) {
      setStatus("❌ Gagal login: " + err.message);
    }
  };

  const validateJson = (data: any) => {
    if (!data || typeof data !== "object") return false;
    if (typeof data.id !== "string") return false;
    if (typeof data.profile !== "object") return false;
    if (!Array.isArray(data.skills)) return false;
    if (!Array.isArray(data.experiences)) return false;
    if (!Array.isArray(data.projects)) return false;
    if (!Array.isArray(data.education)) return false;
    return true;
  };

  const handleUpload = async () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (!validateJson(item)) {
            setStatus("❌ Format JSON tidak sesuai template.");
            return;
          }
          await setDoc(doc(collection(db, "datacust"), item.id), item);
        }
      } else {
        if (!validateJson(parsed)) {
          setStatus("❌ Format JSON tidak sesuai template.");
          return;
        }
        await setDoc(doc(collection(db, "datacust"), parsed.id), parsed);
      }

      setJsonInput("");
      setStatus("✅ Data berhasil di-upload ke Firestore!");
      alert("✅ Data berhasil di-upload ke Firestore!");
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    }
  };

  if (!authenticated) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Email..."
          />

          <label className="block mb-2 font-medium">Password</label>
          <div className="flex items-center border rounded px-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow p-2 outline-none"
              placeholder="Password..."
            />
            <button
              type="button"
              className="px-2 text-sm text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>

        {status && <p className="mt-4 text-red-600">{status}</p>}
      </div>
    );
  }

  const handleDownloadFromFirestore = async () => {
    try {
      const docRef = doc(db, "datacust", "andikadwiputra1");
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "template-andika.json";
        link.click();
        URL.revokeObjectURL(url);
        setStatus("✅ Template berhasil diunduh!");
      } else {
        setStatus("❌ Dokumen tidak ditemukan di Firestore!");
      }
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload JSON ke Firestore</h1>

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Masukkan JSON di sini..."
        className="w-full h-40 p-2 border rounded mb-4"
      />

      <div className="flex gap-4">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Upload
        </button>

        <button
          onClick={handleDownloadFromFirestore}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Download Template
        </button>
      </div>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
