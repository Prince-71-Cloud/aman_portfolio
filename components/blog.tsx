export default function Blog() {
  const blogPosts = [
    {
      title: "Active Reconnaissance | TryHackMe (THM) | With Details Writeups",
      excerpt:
        "Active reconnaissance is a phase in the penetration testing or hacking process where the attacker or security tester directly interacts with the target system.",
      date: "Jan 12, 2025",
      source: "Medium",
      link: "https://medium.com/@icecream23/active-reconnaissance-tryhackme-thm-with-details-writeups-50c2ad33aafa",
      image: "/active-reconnaissance.jpg",
    },
    {
      title: "How to Identify Some of the Easiest P4 Bugs",
      excerpt:
        "Exif Geo Location, Broken authentication, No rate limit, Email Verification Bypass, External Authentication Injection, and more.",
      date: "Dec 23, 2024",
      source: "Bug Bounty",
      link: "https://medium.com/@icecream23/some-easiest-p4-bugs-561cd710a7e1",
      image: "/p4-bugs.jpg",
    },
    {
      title: "5 Common Methods to Bypass OTP Authentication in Bug Hunting",
      excerpt:
        "Response Manipulation, MFA Code Leakage, Brute Force MFA Code, Sensitive Information Leakage, and Authentication bypass via Host-Header injection.",
      date: "Mar 20, 2024",
      source: "Medium",
      link: "https://medium.com/@icecream23/5-common-methods-to-bypass-otp-authentication-in-bug-hunting-1899df84441d",
      image: "/otp-bypass.jpg",
    },
    {
      title: "7 Best Tools for OSINT",
      excerpt:
        "Explore the most effective Open Source Intelligence tools including The Harvester, Maltego, TweetDeck, Google Dorks, OSINT Framework, TinyEye, and more.",
      date: "Oct 19, 2023",
      source: "Medium",
      link: "https://medium.com/@icecream23",
      image: "/osint-tools.jpg",
    },
  ]

  return (
    <section className="py-20 px-4" id="blog">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Latest Articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.title}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card overflow-hidden group flex flex-col h-full"
            >
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{post.source}</span>
                <span className="text-foreground-secondary">{post.date}</span>
              </div>

              <h3 className="text-lg font-bold mb-3 leading-snug flex-grow">{post.title}</h3>
              <p className="text-sm text-foreground-secondary line-clamp-2">{post.excerpt}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <a
            href="https://amanbhuiyanprince.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border-2 border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 font-semibold"
          >
            Personal Blog
          </a>
          <a
            href="https://medium.com/@icecream23"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border-2 border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 font-semibold"
          >
            Technical Blog
          </a>
        </div>
      </div>
    </section>
  )
}
