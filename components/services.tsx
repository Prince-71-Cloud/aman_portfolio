export default function Services() {
  const services = [
    {
      icon: "🐛",
      title: "Bug Hunting",
      description:
        "Passionate bug hunter with a keen eye for discovering security vulnerabilities in web applications. Specializing in ethical hacking and helping organizations strengthen their defenses.",
    },
    {
      icon: "🔐",
      title: "Penetration Testing",
      description:
        "Penetration tester specializing in identifying security vulnerabilities in web applications. Dedicated to enhancing cybersecurity through ethical hacking and vulnerability assessments.",
    },
    {
      icon: "✓",
      title: "Manual Testing",
      description:
        "Learning Software Testing with keen interest in pursuing a career in SQA. Eager to contribute to enhancing software quality through rigorous testing practices.",
    },
    {
      icon: "✍️",
      title: "Technical Writing",
      description:
        "Hobbyist writer sharing thoughts on technical insights, cybersecurity issues, and CTF writeups. Passionate about documenting and analyzing complex topics in tech.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">What I'm Doing</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="glass-card group">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-foreground-secondary leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
