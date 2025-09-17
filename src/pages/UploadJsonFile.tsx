// src/pages/UploadJsonPage.tsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function UploadJsonPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [status, setStatus] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const CORRECT_PASSWORD = "atelierainputdatacustomer";

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setAuthenticated(true);
      setPassword("");
      setStatus("");
    } else {
      setStatus("❌ Password salah!");
    }
  };

  // =======================
  // JSON Validator
  // =======================
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

    // Validasi struktur
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        if (!validateJson(item)) {
          setStatus("❌ Format JSON tidak sesuai template (struktur wajib hilang).");
          return;
        }
      }
    } else {
      if (!validateJson(parsed)) {
        setStatus("❌ Format JSON tidak sesuai template (struktur wajib hilang).");
        return;
      }
    }

    // Upload ke Firestore
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        const docRef = doc(collection(db, "datacust"), item.id);
        await setDoc(docRef, item);
      }
    } else {
      const docRef = doc(collection(db, "datacust"), parsed.id);
      await setDoc(docRef, parsed);
    }

    // ✅ Reset form & popup sukses
    setJsonInput("");
    setStatus("✅ Data berhasil di-upload ke Firestore!");
    window.alert("✅ Data berhasil di-upload ke Firestore!");
  } catch (err: any) {
    setStatus("❌ Error: " + err.message);
  }
};


  const handleDownloadTemplate = () => {
    const template = {
      id: "andikadwiputra1",
      profile: {
        name: "Andika Dwiputra",
        title: "Mobile Flutter Developer",
        description:
          "Gen Z developer passionate about building impactful apps with Flutter and exploring AI-driven solutions.",
        profileImage:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
        email: "andika@example.com",
        phone: "+62 812-3456-7890",
        location: "Bandung, Indonesia",
        socials: {
          linkedin: "https://www.linkedin.com/in/andika",
          github: "https://github.com/andika",
          instagram: "https://instagram.com/andika",
          dribbble: "https://dribbble.com/andika",
        },
        cvlink: "https://drive.google.com/uc?export=download&id=FILE_ID",
      },
      skills: [
        { name: "Flutter", level: 8 },
        { name: "Dart", level: 7 },
        { name: "Firebase", level: 6 },
        { name: "UI/UX Design", level: 7 },
      ],
      experiences: [
        {
          role: "Head of Embedded Research Group",
          company: "Universitas Komputer Indonesia",
          period: "2020 - 2024",
          description:
            "Led research and development projects, participated in national competitions, and mentored junior members.",
        },
      ],
      projects: [
        {
          title: "Carenotes",
          description:
            "AI-powered doctor-patient consultation recorder with transcription and summarization features.",
          tech: ["Flutter", "Flask", "BERT", "Firebase"],
          link: "https://github.com/andika/carenotes",
        },
      ],
      education: [
        {
          school: "Universitas Komputer Indonesia",
          major: "Computer Systems",
          period: "2019 - 2024",
        },
      ],
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "template.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // =======================
  // Render
  // =======================
  if (!authenticated) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Masukkan Password</label>
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
          onClick={handleDownloadTemplate}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Template JSON
        </button>
      </div>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
