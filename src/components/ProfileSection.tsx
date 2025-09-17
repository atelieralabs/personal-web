import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Dribbble,
} from "lucide-react";
import { Profile } from "../types";

interface ProfileSectionProps {
  profile?: Profile | null; // optional biar bisa null
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  // Jika tidak ada profile, jangan render apa pun
  if (!profile) {
    return null;
  }

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
    dribbble: Dribbble,
  };

  // Default image kalau tidak ada foto
  const profileImage =
    profile.profileImage && profile.profileImage.trim() !== ""
      ? profile.profileImage
      : "https://ociacc.com/wp-content/uploads/2019/03/blank-profile-picture-973460_1280-1030x1030.png";

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                  {profile.name}
                </h1>
                <h2 className="text-xl lg:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-6">
                  {profile.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {profile.description}
                </p>
              </div>

              <div className="space-y-3">
                {profile.email && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Tombol Download CV */}
              <div className="pt-6">
                <a
                  href={profile.cvlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-full shadow-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors transform hover:scale-105"
                >
                  Download CV
                </a>
              </div>

              {profile.socials && (
                <div className="flex space-x-4 pt-4">
                  {Object.entries(profile.socials).map(([platform, url]) => {
                    const Icon =
                      socialIcons[platform as keyof typeof socialIcons];
                    if (!url || !Icon) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors transform hover:scale-105"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-600 dark:border-purple-400 shadow-2xl">
                <img
                  src={profileImage}
                  alt={profile.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
