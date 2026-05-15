// Portfolio data for AI assistant
export const portfolioData = `# About Me

**Marta Hayrapetyan**
Front-End Developer

- telegram +374 091-23-17-19
- marta.hayrapetyan.a@gmail.com
- discord:https://discord.com/
- GitHub: https://github.com/Marta109
- Projects: https://github.com/Marta109/Marta109.github.io

---

## Summary

I am an aspiring Front-End Developer, currently completing a JavaScript Front-End course at The Rolling Scopes School. I know how to create modern, responsive web applications. I am passionate about designing user-friendly interfaces, enjoy solving complex problems, and am eager to grow professionally. I am communicative and able to work effectively in a team.

---

## Languages

- Armenian
- Russian
- English

---

## Skills

- GitHub / Git
- JavaScript / TypeScript / React
- JSHint / ESLint / Prettier
- Webpack / Vite
- Bootstrap / React Bootstrap / Material UI
- HTML / CSS / Figma
- Node.js / npm

---

## Education

- NPUA — Bachelor of Computer Science in Software Engineering (2017 - 2021)
- The Rolling Scopes School — JavaScript Front-End Program (2023 - 2024)
- AGBU — Women Coders Training (2024 - 2025)
- TUMO Labs — Web Development Course (2022 - 2023)

---

## Certificates

- The Rolling Scopes School — Mentorship program, JavaScript / Front-end Course — 2024 — https://app.rs.school/certificate/zl52p7q1
- AGBU — Women Coders — 2025 — https://drive.google.com/file/d/1dPPDDbBJ9ajuj8TDO_0hgzrew5ND16sV/view

---

## Experience

I have practical experience from course projects and am ready to apply my skills in real-world development.

---

## Contact Information

- Email: marta.hayrapetyan.a@gmail.com
- Telegram: +374 091-23-17-19
- Discord: https://discord.com/
- GitHub: https://github.com/Marta109
- Portfolio: https://github.com/Marta109/Marta109.github.io`;

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  imageUrl: string;
  certificateUrl: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "rss-certificate",
    title: "Mentorship program, JavaScript / Front-end Course",
    issuer: "The Rolling Scopes School",
    year: "2024",
    imageUrl: "/images/certificates/RSS.jpg",
    certificateUrl: "https://app.rs.school/certificate/zl52p7q1",
  },
  {
    id: "agbu-certificate",
    title: "Women Coders",
    issuer: "AGBU",
    year: "2025",
    imageUrl: "/images/certificates/AGBU.jpg",
    certificateUrl: "https://drive.google.com/file/d/1dPPDDbBJ9ajuj8TDO_0hgzrew5ND16sV/view",
  },
];
