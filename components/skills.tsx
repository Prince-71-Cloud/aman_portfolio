export default function Skills() {
  const skillCategories = [
    {
      title: "SQA & Testing",
      skills: ["Manual Testing", "Test Automation", "Selenium", "Test Planning", "Bug Reporting", "Regression Testing"],
    },
    {
      title: "Cybersecurity",
      skills: [
        "Penetration Testing",
        "Bug Hunting",
        "Vulnerability Assessment",
        "OWASP",
        "Ethical Hacking",
        "Security Research",
      ],
    },
    {
      title: "Tools & Technologies",
      skills: ["Postman", "Burp Suite", "Git", "Linux", "Docker", "Jenkins"],
    },
    {
      title: "Programming",
      skills: ["JavaScript", "SQL", "Bash", "HTML/CSS"],
    },
  ]

  return (
    <section className="py-20 px-4" id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass-card">
              <h3 className="text-xl font-bold mb-6 gradient-text">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
