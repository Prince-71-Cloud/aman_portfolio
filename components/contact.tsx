"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Mail, MapPin, Linkedin, Github } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5727f476-2bcb-42ee-a7e1-8e2cbdb32dc4",
          ...formData,
        }),
      })

      if (response.ok) {
        setSubmitStatus("Message sent successfully!")
        setFormData({ fullname: "", email: "", message: "" })
      } else {
        setSubmitStatus("Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("Error sending message. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Let's Connect</h2>

        <div className="flex flex-col gap-8">
          {/* Contact Info */}
          <div className="glass-panel p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email
              </h3>
              <Link
                href="mailto:bhuiyanaman71@gmail.com"
                className="text-primary hover:text-primary-light transition-colors flex items-center gap-2"
              >
                <span>bhuiyanaman71@gmail.com</span>
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location
              </h3>
              <p className="text-foreground-secondary">Dhanmandi, Dhaka, Bangladesh</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.linkedin.com/in/bhuiyanaman71"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-blue-500/20 transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </Link>
                <Link
                  href="https://github.com/Prince-71-Cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-slate-600/20 transition-all"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                </Link>
                <Link
                  href="https://medium.com/@icecream23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-slate-700/20 transition-all"
                  title="Medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-5 h-5 text-slate-900 dark:text-slate-100"
                  >
                    <path d="M9.025 8c0 2.485 -2.02 4.5 -4.513 4.5A4.506 4.506 0 0 1 0 8c0 -2.486 2.02 -4.5 4.512 -4.5A4.506 4.506 0 0 1 9.025 8m4.95 0c0 2.34 -1.01 4.236 -2.256 4.236S9.463 10.339 9.463 8c0 -2.34 1.01 -4.236 2.256 -4.236S13.975 5.661 13.975 8M16 8c0 2.096 -0.355 3.795 -0.794 3.795 -0.438 0 -0.793 -1.7 -0.793 -3.795 0 -2.096 0.355 -3.795 0.794 -3.795 0.438 0 0.793 1.699 0.793 3.795" />
                  </svg>
                </Link>
                <Link
                  href="https://tryhackme.com/r/p/IceCream23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-red-500/20 transition-all"
                  title="TryHackMe"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5 text-red-600 dark:text-red-400"
                  >
                    <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0 -4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a0.625 0.625 0 1 0 0 -1.25H4.761a3.273 3.273 0 0 1 -3.27 -3.27A3.273 3.273 0 0 1 6.59 7.08a0.625 0.625 0 0 0 0.7 -1.035 4.488 4.488 0 0 0 -1.68 -0.69 5.223 5.223 0 0 1 5.096 -4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0 -0.488 0.305 0.625 0.625 0 1 0 0.731 1.013 3.245 3.245 0 0 1 1.912 -0.616 3.278 3.278 0 0 1 3.203 2.61 0.625 0.625 0 0 0 1.225 -0.251 4.533 4.533 0 0 0 -4.428 -3.61 4.54 4.54 0 0 0 -0.958 0.105C16.556 2.328 13.9 0 10.705 0z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/bhuiyanaman71"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-blue-600/20 transition-all"
                  title="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  >
                    <path d="M16 8.049c0 -4.446 -3.582 -8.05 -8 -8.05C3.58 0 -0.002 3.603 -0.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0 -2.017 1.195 -3.131 3.022 -3.131 0.876 0 1.791 0.157 1.791 0.157v1.98h-1.009c-0.993 0 -1.303 0.621 -1.303 1.258v1.51h2.218l-0.354 2.326H9.25V16c3.824 -0.604 6.75 -3.934 6.75 -7.951" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="fullname"
                placeholder="Your Name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-foreground-secondary/50 focus:outline-none focus:border-primary transition-colors"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-foreground-secondary/50 focus:outline-none focus:border-primary transition-colors"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-foreground-secondary/50 focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus && (
                <p
                  className={`text-sm text-center ${submitStatus.includes("successfully") ? "text-green-500" : "text-red-500"}`}
                >
                  {submitStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
