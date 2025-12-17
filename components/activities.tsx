"use client"

export default function Activities() {
  const activities = [
    {
      company: "Google",
      logo: "/images/sq-google-g-logo-update-dezeen-2364-col-0.jpg",
      title: "Security Researcher",
      description:
        "Discovered and reported a Unicode homoglyph bypass vulnerability affecting the username validation system on Google's support platform.",
      date: "20 May, 2025",
      color: "from-blue-500 to-blue-600",
    },
    {
      company: "Adobe",
      logo: "/images/5436949.png",
      title: "Hall of Fame",
      description:
        "Identified and disclosed a critical username filter bypass through homoglyph injection techniques on Adobe's platform.",
      date: "22 May, 2025",
      color: "from-red-500 to-red-600",
    },
    {
      company: "Comcast Xfinity",
      logo: "/images/images.png",
      title: "Hall of Fame",
      description: "Uncovered a critical security vulnerability in the Xfinity Chromecast integration system.",
      date: "22 July, 2024",
      color: "from-purple-500 to-purple-600",
    },
    {
      company: "Sony",
      logo: "/images/sony.png",
      title: "Security Finding",
      description:
        "Discovered a cross-site scripting vulnerability affecting Sony's Global Protect VPN infrastructure.",
      date: "2024",
      color: "from-pink-500 to-pink-600",
    },
    {
      company: "Ferrari",
      logo: "/images/vecteezy-ferrari-brand-logo-car-symbol-with-name-black-design-italian-20500781.jpg",
      title: "Hall of Fame",
      description:
        "Identified rate limiting vulnerabilities in authentication endpoint mechanisms across Ferrari's digital infrastructure.",
      date: "2025",
      color: "from-red-600 to-red-700",
    },
    {
      company: "Programiz Pro",
      logo: "/images/maxresdefault.jpg",
      title: "Hall of Fame",
      description:
        "Demonstrated homoglyph payload injection techniques combined with advanced rate limiting evasion strategies on the platform.",
      date: "2025",
      color: "from-purple-500 to-purple-600",
    },
    {
      company: "UNESCO",
      logo: "/images/flag-of-unesco.png",
      title: "Hall of Fame",
      description:
        "Reported a significant security vulnerability categorized as CVE-0133 affecting UNESCO's digital infrastructure.",
      date: "2025",
      color: "from-blue-600 to-blue-700",
    },
    {
      company: "HP",
      logo: "/images/hp-logo.png",
      title: "Hall of Fame",
      description:
        "Successfully engineered and executed a homoglyph attack that circumvented authentication mechanisms on HP systems.",
      date: "2025",
      color: "from-blue-400 to-blue-500",
    },
  ]

  return (
    <section className="py-20 px-4" id="activities">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Hall of Fame</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={`${activity.company}-${activity.date}`} className="glass-card flex flex-col h-full">
              <div className={`h-2 rounded-full bg-gradient-to-r ${activity.color} mb-4`}></div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={activity.logo || "/placeholder.svg"}
                  alt={activity.company}
                  className="w-8 h-8 object-contain dark:invert opacity-80"
                />
                <h3 className="text-2xl font-bold">{activity.company}</h3>
              </div>
              <p className="text-sm font-medium text-primary mb-3">{activity.title}</p>
              <p className="text-sm text-foreground-secondary mb-4 flex-1">{activity.description}</p>
              <p className="text-xs text-foreground-secondary">{activity.date}</p>
            </div>
          ))}

          <div className="glass-card flex flex-col h-full opacity-40 hover:opacity-60 transition-opacity">
            <div className="h-2 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 mb-4"></div>
            <div className="flex items-center justify-center flex-1">
              <h3 className="text-3xl font-bold text-center">And Many More...</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
