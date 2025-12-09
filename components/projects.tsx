export default function Projects() {
  const projects = [
    {
      title: "Alumni Student Connect Hub",
      category: "Database Management Project",
      image: "/images/alumni-student-connect-hub.jpg",
      link: "https://github.com/Prince-71-Cloud/Alumni-Connect-hub.git",
      tags: ["Database", "Full-Stack", "Project"],
    },
    {
      title: "OpenCart Manual Testing Project",
      category: "Test Case, Test Plan, Bug Report",
      image: "/images/opencart-testing.jpg",
      link: "https://github.com/Prince-71-Cloud/Software_Testing_Project",
      tags: ["QA", "Testing", "Manual Testing"],
    },
    {
      title: "Bug Bounty Newsletter",
      category: "Security Newsletter",
      image: "/images/bug-bounty.jpg",
      link: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7215804705837367297",
      tags: ["Bug Bounty", "Security", "Newsletter"],
    },
    {
      title: "Dear GEN-Z",
      category: "Personal Blog",
      image: "/images/dear-gen-z.jpg",
      link: "https://amanbhuiyanprince.blogspot.com/2024/08/dear-gen-z.html",
      tags: ["Writing", "Blog", "Personal"],
    },
    {
      title: "Appium for App Automation",
      category: "Mobile App Automation",
      image: "/images/appium-automation.jpg",
      link: "https://github.com/Prince-71-Cloud/appiumMobileAppAutomation",
      tags: ["Mobile Testing", "Automation", "Appium"],
    },
    {
      title: "JSCRAWLER",
      category: "JavaScript Enumeration Suite for Red Teams",
      image: "/images/jscrawler.jpg",
      link: "https://github.com/Prince-71-Cloud/JsEnumeration",
      tags: ["Security", "JavaScript", "Bug Bounty"],
    },
    {
      title: "SubdomainCollector",
      category: "Passive Subdomain Enumeration Tool",
      image: "/images/subdomain-collector.jpg",
      link: "https://github.com/Prince-71-Cloud/SubdomainCollector",
      tags: ["Security", "Enumeration", "Red Team"],
    },
    {
      title: "Web Application Automation with Playwright",
      category: "End-to-End Testing Framework",
      image: "/images/playwright-automation.jpg",
      link: "https://github.com/Prince-71-Cloud/playwrightForQABrains",
      tags: ["QA", "Automation", "Playwright"],
    },
  ]

  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group overflow-hidden"
            >
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-primary font-medium mb-4">{project.category}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
