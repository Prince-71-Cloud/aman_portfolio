# Aman Bhuiyan - Portfolio Website

Welcome to my personal portfolio website! This is a modern, responsive portfolio showcasing my work as an SQA Engineer and Cybersecurity Enthusiast.

## Overview

This portfolio features:
- Responsive design that works on all devices
- Modern UI with dark/light mode toggle
- Sections for hero, about, skills, projects, experience, and contact
- Interactive elements and smooth animations
- Optimized for performance

## Features

- 🎨 Clean, modern design with animations
- 🌙 Dark/light mode toggle
- 📱 Fully responsive for mobile and desktop
- ⚡ Fast loading times with Next.js
- 🔐 Secure authentication system (in /icecream and /notes sections)

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Lucide React](https://lucide.dev/) - Beautiful icon library

## Project Structure

```
├── app/                 # Next.js 13+ app directory
│   ├── api/             # API routes
│   ├── icecream/        # Authenticated dashboard area
│   ├── notes/           # Note-taking application
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
├── public/              # Static assets
└── lib/                 # Utility functions
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Prince-71-Cloud/aman_portfolio.git
   cd aman_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

If you plan to use the authenticated sections, create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your_secret_here
DB_PATH=./data/db.json  # Path for local database
GITHUB_TOKEN=your_github_token  # For GitHub integration
```

## Deployment

You can deploy this application to various platforms:

### Vercel (Recommended for Next.js)
1. Push to GitHub
2. Connect to [Vercel](https://vercel.com/)
3. Import your repository
4. Deploy!

### Other Platforms
This is a standard Next.js application that can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Any platform supporting Next.js

## Security Features

The portfolio includes secure authentication systems:
- JWT-based authentication
- Protected routes via middleware
- Secure password handling with bcrypt
- GitHub integration with personal access tokens

## Contributing

Feel free to fork this repository and make changes! Pull requests are welcome.

## License

This project is open source and available under the [MIT License](LICENSE).
