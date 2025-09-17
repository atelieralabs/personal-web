export interface Profile {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    dribbble?: string;
  };
  cvlink: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export interface Education {
  school: string;
  major: string;
  period: string;
}

export interface Person {
  id: string;
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
}

export interface Skill {
  name: string;
  level: number; // 1–10
}

export interface DesignSystem {
  theme: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  typography: {
    fontFamily: string;
    heading: {
      size: string;
      weight: string;
    };
    body: {
      size: string;
      weight: string;
    };
  };
  layout: {
    maxWidth: string;
    gridGap: string;
    padding: string;
  };
  components: {
    card: {
      borderRadius: string;
      shadow: string;
      hoverEffect: string;
    };
    button: {
      borderRadius: string;
      padding: string;
      hoverEffect: string;
    };
    navbar: {
      position: string;
      top: number;
      backdropBlur: boolean;
    };
  };
}