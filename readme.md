# Personal Website

A modern, responsive personal website built with Next.js and Tailwind CSS, featuring a clean design and smooth dark mode support.

## Features

### Core Features
- 🌓 Dark/Light mode support with system preference detection
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Next.js
- 🔍 SEO optimized
- 🖼️ Image optimization with Next.js Image component

### Components

#### Navigation
- Smooth scrolling navigation
- Mobile-responsive menu
- Dark mode toggle
- Active section highlighting

#### Hero Section
- Professional introduction
- Social media links
- Call-to-action buttons
- Animated background

#### About Section
- Professional summary
- Key skills and expertise
- Personal interests
- Downloadable resume

#### Research Projects
- Grid layout with project cards
- Project images with hover effects
- Project descriptions
- External links to project details
- "View All Projects" section
- Dedicated research projects page

#### Course Projects
- Similar layout to research projects
- Course-specific information
- Project links and descriptions
- Dedicated course projects page

#### Publications
- Clean, professional layout
- Publication details with authors and conference information
- Multiple link types (PDF, Video, External)
- Status indicators
- Hover effects and transitions

#### Education
- Academic history
- Institution details
- Degree information
- Timeline layout

#### Contact Section
- Contact form
- Social media links
- Professional networks
- Email contact

## Technical Details

### Built With
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- React Icons

### Project Structure
```
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── data/
│   │   ├── CourseProjects.json
│   │   ├── Education.json
│   │   ├── Publications.json
│   │   └── ResearchProjects.json
│   ├── CourseProjects.tsx
│   ├── Education.tsx
│   ├── ExtLink.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── PublicationItem.tsx
│   └── ResearchProjects.tsx
├── pages/
│   ├── course-projects.tsx
│   └── research.tsx
├── public/
│   └── images/
├── styles/
│   └── globals.css
└── tailwind.config.js
```

### Key Features Implementation

#### Dark Mode
- System preference detection
- Manual toggle option
- Persistent preference storage
- Smooth transitions

#### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Flexible grid systems
- Optimized images

#### Performance
- Image optimization
- Code splitting
- Lazy loading
- Minimal dependencies

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Adding New Projects
1. Update the respective JSON file in `components/data/`
2. Add project images to `public/images/`
3. Update the component to display new projects

### Modifying Styles
- Tailwind classes can be modified in the component files
- Global styles can be updated in `styles/globals.css`
- Theme configuration in `tailwind.config.js`

### Adding New Sections
1. Create a new component in the `components/` directory
2. Add the component to `app/page.tsx`
3. Update the navigation if needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Kepinski](https://kepinski.ch/) and [Lynne](https://github.com/lydhr)