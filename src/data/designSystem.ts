import { DesignSystem } from '../types';

export const designSystem: DesignSystem = {
  theme: {
    light: {
      background: "#FFFFFF",
      primary: "#6C63FF",
      secondary: "#FF6584",
      textPrimary: "#1A1A1A",
      textSecondary: "#555555",
      cardBackground: "#F9F9F9"
    },
    dark: {
      background: "#0F0F0F",
      primary: "#6C63FF",
      secondary: "#FF6584",
      textPrimary: "#FFFFFF",
      textSecondary: "#BBBBBB",
      cardBackground: "#1C1C1C"
    }
  },
  typography: {
    fontFamily: "Inter, Poppins, sans-serif",
    heading: {
      size: "clamp(1.5rem, 2vw, 2.5rem)",
      weight: "700"
    },
    body: {
      size: "clamp(0.9rem, 1vw, 1.1rem)",
      weight: "400"
    }
  },
  layout: {
    maxWidth: "1200px",
    gridGap: "1.5rem",
    padding: "1rem"
  },
  components: {
    card: {
      borderRadius: "1rem",
      shadow: "0 4px 12px rgba(0,0,0,0.1)",
      hoverEffect: "scale(1.02)"
    },
    button: {
      borderRadius: "2rem",
      padding: "0.6rem 1.2rem",
      hoverEffect: "opacity(0.9)"
    },
    navbar: {
      position: "sticky",
      top: 0,
      backdropBlur: true
    }
  }
};