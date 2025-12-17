import { GraduationCap } from "lucide-react"
import Image from "next/image"

export default function AcademicLife() {
  const academicItems = [
    {
      institution: "Comilla University",
      degree: "BSc. in Engineering",
      field: "Computer Science & Engineering",
      period: "January 2020 — May 2025",
      cgpa: "CGPA: 3.47",
      logo: "/images/comilla-university-logo.png",
    },
    {
      institution: "Brahmanbaria Government College",
      degree: "Higher Secondary Certificate (HSC)",
      field: "Science",
      period: "June 2017 — May 2019",
      cgpa: "GPA: 5.00 (Merit-based Scholarship - General)",
      logo: "/images/brahmanbaria-college-logo.png",
    },
  ]

  return (
    <section id="academic" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Academic Life</h2>

        <div className="space-y-8">
          {academicItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector dot on the left for desktop */}
              <div className="hidden md:flex absolute -left-4 top-8 w-3 h-3 rounded-full bg-blue-600 shadow-lg"></div>

              <div className="glass-card hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600">
                {/* Logo/Icon header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 shadow-md flex items-center justify-center p-2">
                    {item.logo ? (
                      <Image
                        src={item.logo || "/placeholder.svg"}
                        alt={item.institution}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-blue-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{item.institution}</h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">{item.degree}</p>
                  </div>
                </div>

                <p className="text-md text-foreground-secondary mb-2">{item.field}</p>
                <p className="text-sm text-foreground-secondary font-medium mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                  {item.period}
                </p>
                {item.cgpa && (
                  <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">{item.cgpa}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
