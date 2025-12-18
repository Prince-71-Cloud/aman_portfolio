import { Briefcase, GraduationCap } from "lucide-react"

export default function Timeline() {
  const timelineItems = [
    {
      title: "Comilla University",
      period: "2020 — 2025",
      description: "BSc.(Eng.) in Computer Science & Engineering",
      detail: "CGPA 3.57",
      logo: "https://placeholder.svg?height=32&width=32&query=Comilla%20University%20logo",
      icon: GraduationCap,
    },
    {
      title: "Software Quality Assurance Engineer",
      period: "November 2025 — Present",
      company: "Softeko",
      description: "Software testing, bug reporting, and quality assurance",
      logo: "https://placeholder.svg?height=32&width=32&query=Softeko%20logo",
      icon: Briefcase,
    },
    {
      title: "SQA Engineer Intern",
      period: "August 2025 — October 2025",
      company: "Softeko",
      description: "Manual testing, test case creation, and bug documentation",
      logo: "https://placeholder.svg?height=32&width=32&query=Softeko%20logo",
      icon: Briefcase,
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Experience & Education</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="ml-24 glass-card">
                  <div className="absolute -left-5 top-6 w-10 h-10 rounded-full bg-primary border-4 border-white dark:border-slate-900 flex items-center justify-center">
                    {item.logo ? (
                      <img src={item.logo || "/placeholder.svg"} alt={item.title} className="w-6 h-6 object-contain" />
                    ) : (
                      <IconComponent className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  {item.company && <p className="text-sm text-primary font-medium">{item.company}</p>}
                  <p className="text-sm text-foreground-secondary mb-3">{item.period}</p>
                  <p className="text-foreground-secondary">{item.description}</p>
                  {item.detail && <p className="text-sm mt-2 font-medium">{item.detail}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
