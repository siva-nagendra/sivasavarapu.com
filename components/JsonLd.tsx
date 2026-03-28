export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Siva Nagendra Savarapu",
    jobTitle: "Senior Pipeline Engineer",
    description:
      "Senior Pipeline Engineer and Generative AI specialist with 10+ years at Epic Games, Sony Pictures Imageworks, Animal Logic, and MPC.",
    url: "https://sivasavarapu.com",
    email: "siva_nagendra@outlook.com",
    sameAs: [
      "https://github.com/siva-nagendra",
      "https://linkedin.com/in/sivanagendra",
      "https://www.artstation.com/sivanagendra2",
    ],
    knowsAbout: [
      "OpenUSD",
      "Pipeline Engineering",
      "Generative AI",
      "Unreal Engine",
      "Python",
      "C++",
      "Model Context Protocol",
      "VFX",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Independent",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressCountry: "CA",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
