"use client"

import { ExternalLink, X } from "lucide-react"
import { useState } from "react"

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null)

  const certs = [
    {
      name: "SQL Injection Attacks",
      issuer: "EC-Council",
      date: "16th Jan 2025",
      link: "https://codered.eccouncil.org/certificate/d3f58d0c-9677-4cd8-81fe-67e4f91152f8?logged=true",
      image: "/images/ec-cert.png",
    },
    {
      name: "Intro to Bug Bounty Hunting and Web Application Hacking",
      issuer: "Udemy",
      date: "27 Sep 2024",
      link: "https://www.udemy.com/certificate/UC-b632c76a-921c-4744-8afa-9b8297130e12/",
      image: "/images/bughunting-cert.png",
    },
    {
      name: "Offensive Hacking Unfolded - The Beginner's Edition",
      issuer: "ComproAvi School",
      date: "Jan 29, 2025",
      link: "https://app.onlinecoursehost.com/certificate-proof/EWCMtAhS9bQgqAhVHuI5wJwrR5r1/YQdCEpJMDMILoe39Nv23/I5vTEi5VbdaqvJmL9mWOUNJhSTq1",
      image: "/images/offensive-cert.png",
    },
    {
      name: "Jr Penetration Tester Learning Path",
      issuer: "TryHackMe",
      date: "28th Jan 2024",
      link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-Q7VYSIVVAQ.png",
      image: "/images/jr-penetration-cert.png",
    },
    {
      name: "Certified Network Security Practitioner (CNSP)",
      issuer: "The SecOps Group",
      date: "17-JAN-2025",
      link: "https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXepCXO5UtnSZhpoNHxCW9pmdHQ1rdcgq85PlXJhB3BZi3ZQMhsXwM1bhaYo3rbQD02Aw15R09X0DJOKD7ovz8nI=",
      image: "/images/secops-cert.png",
    },
    {
      name: "Google Cybersecurity",
      issuer: "Google Career Certificates",
      date: "Jan 23, 2025",
      link: "https://coursera.org/share/144d363a0cf1fb84aad1768ff37ecb39",
      image: "/images/google-cert.png",
    },
    {
      name: "Certified Cybersecurity Educator Professional (CCEP)",
      issuer: "EC-Council",
      date: "Nov 23, 2025",
      link: "https://codered.eccouncil.org/certificate/d3f58d0c-9677-4cd8-81fe-67e4f91152f8?logged=true",
      image: "/images/screenshot-20from-202025-11-23-2019-55-14.png",
    },
    {
      name: "Understanding the OWASP Top 10 Security Threats (SKF100)",
      issuer: "The Linux Foundation",
      date: "Mar 25, 2024",
      link: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/4a7ba8a1-1951-4cd7-8e6b-79afa446ce57-aman-bhuiyan-a3f52a5d-e403-4377-8b72-5858174589dd-certificate.pdf",
      image: "/images/linux-cert.png",
    },
    {
      name: "Web Penetration Testing and Bug Hunting course from Cyber Bangla",
      issuer: "Cyber Bangla",
      date: "19-Aug-25",
      link: "https://www.linkedin.com/posts/bhuiyanaman71_penetration-testing-and-bug-hunting-activity-7365090689627389953-PtCn?utm_source=share&utm_medium=member_desktop&rcm=ACoAADNx69ABNOMQN3l0r3mrwlIrajgYrn9rDEY",
      image: "/images/cyber-bangla-cert.png",
    },
  ]

  const sortedCerts = [...certs].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Certifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCerts.map((cert) => (
            <div
              key={cert.name}
              className="glass-card p-6 hover:border-primary/50 transition-all group cursor-pointer flex flex-col"
              onClick={() => setSelectedCert(cert.image)}
            >
              {/* Certificate thumbnail */}
              <div className="relative mb-4 w-full h-40 rounded-lg overflow-hidden border border-white/20 group-hover:border-primary/50 transition-colors">
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Certificate details */}
              <div className="flex-grow">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">{cert.name}</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p className="text-primary font-medium">{cert.issuer}</p>
                  <p>{cert.date}</p>
                </div>
              </div>

              {/* External link button */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">Click to view</span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                  aria-label="View certificate"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={selectedCert || "/placeholder.svg"} alt="Certificate" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}
