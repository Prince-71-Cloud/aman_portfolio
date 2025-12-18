export default function About() {
  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">About Me</h2>

        <div className="glass-panel p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
                <img src="/headshot.jpg" alt="Aman Bhuiyan - Professional Headshot" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-foreground-secondary leading-relaxed font-medium">
                A dedicated SQA enthusiast exploring the art of software testing with curiosity and precision.
                Passionate about ensuring flawless user experiences through meticulous quality assurance practices.
              </p>

              <p className="text-lg text-foreground-secondary leading-relaxed font-medium">
                Experienced in detecting vulnerabilities, performing comprehensive security evaluations, and providing
                practical recommendations. Adept at utilizing advanced tools and strategies to replicate real-world
                attacks, strengthening cybersecurity defenses efficiently. A proactive team member dedicated to
                continuous professional development and staying updated with industry trends to address emerging cyber
                threats.
              </p>

              <div className="pt-6 flex gap-8">
                <div>
                  <div className="text-2xl font-bold gradient-text">2024 - Present</div>
                  <div className="text-sm text-foreground-secondary font-medium">Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-foreground-secondary font-medium">Vulnerabilities Found</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
