// src/ProfilePage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

import { profiles } from "./data/profileData";
import ProfileSection from "./components/ProfileSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import { Person } from "./types";

function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        // 👉 Normalisasi ke lowercase
        const normalizedId = id.toLowerCase();

        const docRef = doc(db, "datacust", normalizedId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Person;
          setProfile(data);

          const existingIndex = profiles.findIndex(
            (p) => p.id.toLowerCase() === normalizedId
          );
          if (existingIndex >= 0) {
            profiles[existingIndex] = data;
          } else {
            profiles.push(data);
          }
        } else {
          console.warn("⚠️ Tidak ada dokumen dengan id:", normalizedId);
        }
      } catch (err) {
        console.error("❌ Error fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Data tidak ditemukan</p>;

  return (
    <div>
      <ProfileSection profile={profile.profile} />
      <SkillsSection skills={profile.skills} />
      <ExperienceSection experiences={profile.experiences} />
      <ProjectsSection projects={profile.projects} />
      <EducationSection education={profile.education} />
    </div>
  );
}

export default ProfilePage;
