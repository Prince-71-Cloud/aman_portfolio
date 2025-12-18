import { Briefcase, Shield, Trophy } from "lucide-react"
import Image from "next/image"

export default function Experience() {
  const experienceItems = [
    {
      title: "Software Quality Assurance Engineer",
      company: "SOFTEKO",
      period: "November 2025 — Present",
      description:
        "Leading quality assurance initiatives, conducting comprehensive manual and security testing, and ensuring software reliability across projects.",
      logo: "/images/softeko-logo.png",
      icon: Briefcase,
      type: "work",
    },
    {
      title: "Software Quality Assurance Engineer Intern",
      company: "SOFTEKO",
      period: "August 2025 — October 2025",
      description:
        "Manual testing, test case creation, bug documentation, and quality assurance support for web applications.",
      logo: "/images/softeko-logo.png",
      icon: Briefcase,
      type: "work",
    },
    {
      title: "Independent Security Researcher",
      company: "Bugcrowd",
      period: "June 2024 — Present",
      description:
        "Identified and reported critical vulnerabilities to companies. Specialized in web application security with focus on XSS, SQL injection, and authentication flaws.",
      logo: "/images/bugcrowd-logo.png",
      icon: Shield,
      type: "security",
    },
    {
      title: "Independent Security Researcher",
      company: "HackerOne",
      period: "June 2024 — Present",
      description:
        "Conducting security assessments and vulnerability research for various organizations through responsible disclosure programs.",
      logo: "/images/hackerone-logo.png",
      icon: Shield,
      type: "security",
    },
    {
      title: "Cyber Security Practitioner",
      company: "TryHackMe",
      period: "January 2021 — July 2023",
      description:
        "Completed hands-on cybersecurity challenges, learning paths, and CTF competitions to develop practical security testing skills.",
      logo: null,
      icon: Trophy,
      type: "learning",
      customIcon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-10 h-10 text-red-600"
        >
          <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0 -4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a0.625 0.625 0 1 0 0 -1.25H4.761a3.273 3.273 0 0 1 -3.27 -3.27A3.273 3.273 0 0 1 6.59 7.08a0.625 0.625 0 0 0 0.7 -1.035 4.488 4.488 0 0 0 -1.68 -0.69 5.223 5.223 0 0 1 5.096 -4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0 -0.488 0.305 0.625 0.625 0 1 0 0.731 1.013 3.245 3.245 0 0 1 1.912 -0.616 3.278 3.278 0 0 1 3.203 2.61 0.625 0.625 0 0 0 1.225 -0.251 4.533 4.533 0 0 0 -4.428 -3.61 4.54 4.54 0 0 0 -0.958 0.105C16.556 2.328 13.9 0 10.705 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="experience"
      className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-slate-900/30"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Experience</h2>

        <div className="space-y-8">
          {experienceItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="relative">
                {/* Connector dot on the left for desktop */}
                <div className="hidden md:flex absolute -left-4 top-8 w-3 h-3 rounded-full bg-primary shadow-lg"></div>

                <div className="glass-card hover:shadow-2xl transition-all duration-300 border-l-4 border-primary">
                  {/* Logo/Icon header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 shadow-md flex items-center justify-center p-2">
                      {item.customIcon ? (
                        item.customIcon
                      ) : item.logo ? (
                        <Image
                          src={item.logo || "/placeholder.svg"}
                          alt={item.company}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <IconComponent className="w-8 h-8 text-primary" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-lg text-primary font-semibold">{item.company}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground-secondary font-medium mb-3 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                    {item.period}
                  </p>
                  <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
