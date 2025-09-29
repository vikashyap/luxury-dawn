# Luxury Dawn - Infinite Golden-Hour Scroll

A luxurious Next.js 15 landing page that delivers an infinite golden-hour scroll experience, transitioning seamlessly from dawn through warm whites to sunset with buttery smooth animations and Apple-like feel.

## ✨ Features

- **Infinite Golden-Hour Scroll**: Continuous color phase transitions that never end
- **Subtle Parallax**: Smooth text logo movement that responds to scroll
- **Buttery Smooth Animations**: Powered by Framer Motion with luxury easing curves
- **Performance Optimized**: RequestAnimationFrame with scroll position diffing
- **Accessibility First**: Respects `prefers-reduced-motion` settings
- **SEO Ready**: Complete metadata and semantic structure
- **Responsive Design**: Beautiful on all screen sizes

## 🎨 Design System

### Color Palette
- **Dawn**: Pure white (#FFFFFF)
- **Pre-Golden**: Warm white (#FFF9F5)
- **Golden**: Soft golden (#FFF5E6)
- **Warm Golden**: Rich golden (#FFE4B5)
- **Sunset**: Amber glow (#FFCC80)
- **Deep Sunset**: Apricot warmth (#FF8A65)

### Animation Principles
- **Luxury Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` for Apple-like feel
- **Scroll Mapping**: 3.5 viewport heights with infinite wrapping
- **Parallax Range**: ±20px with sine wave smoothing
- **Performance**: Sub-1px scroll change threshold

## 🚀 Getting Started

### Prerequisites
- Node.js 20.18+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd luxury-dawn

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the infinite golden-hour scroll in action.

## 🏗️ Architecture

### Project Structure
```
app/
├── (marketing)/
│   ├── landing/
│   │   └── page.tsx      # Main landing page with scroll effects
│   └── layout.tsx        # Marketing section metadata
├── globals.css           # CSS variables and gradient system
├── layout.tsx           # Root layout with Geist fonts
└── page.tsx             # Redirect to landing page
```

### Key Technologies
- **Next.js 15**: App Router with TypeScript
- **Tailwind CSS 4**: Utility-first styling
- **Framer Motion**: Smooth animations and reduced motion support
- **Geist Font**: Modern typography system

### CSS Variables System
```css
:root {
  --phase: 0;              /* Scroll phase (0-1) */
  --ease-luxury: cubic-bezier(0.25, 0.1, 0.25, 1);
  --dawn: #FFFFFF;
  --pre-golden: #FFF9F5;
  /* ... color palette */
}
```

## 🎯 Performance Features

- **Scroll Optimization**: Only updates when scroll position changes by >1px
- **RequestAnimationFrame**: Smooth 60fps animations
- **Reduced Motion**: Automatically disables parallax for accessibility
- **Efficient Gradients**: CSS-based color interpolation

## 🛠️ Customization

### Adjusting Animation Intensity
Modify the parallax calculation in `landing/page.tsx`:
```typescript
const parallaxOffset = shouldReduceMotion ? 0 : Math.sin(phase * Math.PI * 2) * 20;
//                                                                              ^^
//                                                                        Adjust range
```

### Changing Scroll Range
Update the scroll mapping in the `updatePhase` function:
```typescript
const scrollRange = viewportHeight * 3.5; // Increase for longer scroll
```

### Color Customization
Edit the color palette in `globals.css`:
```css
:root {
  --dawn: #FFFFFF;
  --sunset: #FF8A65;
  /* Add your colors */
}
```

## 📱 Responsive Breakpoints

- **Mobile**: `text-5xl` (48px)
- **Tablet**: `md:text-7xl` (72px)  
- **Desktop**: `lg:text-8xl` (96px)
- **Large**: `xl:text-9xl` (128px)

## 🚀 Deployment

### Vercel (Recommended)
```bash
yarn build
# Deploy to Vercel
```

### Other Platforms
```bash
yarn build
yarn start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by luxury web experiences and Apple's design principles
- Built with modern web technologies for optimal performance
- Designed for the final days of summer ✨

---

*Experience the infinite golden-hour scroll at [your-domain.com](https://your-domain.com)*