export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://sivasavarapu.com/#website",
        url: "https://sivasavarapu.com",
        name: "Siva Nagendra Savarapu",
        description:
          "Portfolio of Siva Nagendra Savarapu, a senior pipeline engineer building production-grade OpenUSD, Unreal Engine, generative AI, and agentic 3D systems.",
        inLanguage: "en-CA",
      },
      {
        "@type": "Person",
        "@id": "https://sivasavarapu.com/#person",
        name: "Siva Nagendra Savarapu",
        url: "https://sivasavarapu.com",
        image: "https://sivasavarapu.com/opengraph-image",
        email: "siva_nagendra@outlook.com",
        jobTitle: "Senior Pipeline Engineer",
        description:
          "Senior pipeline engineer specializing in OpenUSD, Unreal Engine, generative AI, and production-grade 3D pipeline systems for film, games, and real-time content teams.",
        sameAs: [
          "https://github.com/siva-nagendra",
          "https://linkedin.com/in/sivanagendra",
          "https://www.artstation.com/sivanagendra2",
          "https://www.imdb.com/name/nm8873739/",
        ],
        knowsAbout: [
          "OpenUSD",
          "Pipeline Engineering",
          "Generative AI",
          "Agentic AI",
          "Unreal Engine",
          "Python",
          "C++",
          "PyTorch",
          "TensorFlow",
          "Computer Vision",
          "Model Context Protocol",
          "VFX",
        ],
        homeLocation: [
          {
            "@type": "Place",
            name: "Vancouver, Canada",
          },
          {
            "@type": "Place",
            name: "Sydney, Australia",
          },
        ],
        alumniOf: [
          {
            "@type": "Organization",
            name: "Epic Games",
          },
          {
            "@type": "Organization",
            name: "Sony Pictures Imageworks",
          },
          {
            "@type": "Organization",
            name: "Animal Logic",
          },
          {
            "@type": "Organization",
            name: "MPC Film",
          },
        ],
        knowsLanguage: ["en"],
      },
      {
        "@type": "ProfilePage",
        "@id": "https://sivasavarapu.com/#profile",
        url: "https://sivasavarapu.com",
        name: "Siva Nagendra Savarapu Portfolio",
        about: {
          "@id": "https://sivasavarapu.com/#person",
        },
        isPartOf: {
          "@id": "https://sivasavarapu.com/#website",
        },
        primaryImageOfPage: {
          "@id": "https://sivasavarapu.com/#person",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
