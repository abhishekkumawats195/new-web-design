# 🎯 Cubic 3D Experience

A stunning **3D interactive website** inspired by [Paffi.it](https://www.paffi.it) featuring scroll-driven cube animations, dynamic backgrounds, and immersive user experience built with **Next.js 16** and **Three.js**.

## ✨ Features

### 🎮 **Interactive 3D Cubes**
- **8 Animated Cubes** with scroll-driven twist effects
- **Dynamic Images** on front faces when cubes are centered
- **Smooth Transitions** with professional easing curves
- **Color-Coded Themes** for each section

### 🎨 **Visual Design**
- **Dark Professional Palette** - Modern corporate colors
- **Glassmorphism UI** - Liquid transparent elements
- **Dynamic Typography** - Animated text with rotation effects
- **Cursor Follower** - Interactive cursor with theme colors

### 📱 **Responsive Experience**
- **Mobile Optimized** - Touch-friendly interactions
- **Adaptive Layouts** - Scales beautifully across devices
- **Performance Focused** - Smooth 60fps animations

### 🔧 **Technical Stack**
- **Next.js 16** with Turbopack
- **Three.js** for 3D rendering
- **Custom Shaders** for advanced visual effects
- **TypeScript** for type safety
- **CSS3** with modern features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cubic-3d-experience

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

## 🎯 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page with modal system
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── SimpleThreeJS.tsx # Main 3D component
│   ├── NoSSR.tsx         # Client-side rendering wrapper
│   └── sections/         # Modal content sections
└── hooks/
    └── useSnapScroll.ts  # Scroll behavior hook
```

## 🎨 Customization

### **Colors & Themes**
```javascript
// Update background colors in SimpleThreeJS.tsx
const bgColors = [
  '#2c3e50', // Dark Blue Gray
  '#34495e', // Wet Asphalt  
  '#8e44ad', // Deep Purple
  // ... add more colors
];
```

### **Cube Content**
```javascript
// Modify cube text and images
const cubeTexts = [
  { title: 'YOUR TITLE', subtitle: 'Your Subtitle' },
  // ... customize content
];

const cubeImages = [
  'https://your-image-url.jpg',
  // ... add your images
];
```

### **Animation Settings**
```javascript
// Adjust twist intensity
material.uniforms.uTwist.value = cubeProgress * 1.5; // Change 1.5

// Modify scroll speed
const fixedGap = 4; // Adjust gap between cubes
```

## 🎭 Key Components

### **3D Cube System**
- **Multi-Material Cubes** - Different materials per face
- **Shader-Based Rendering** - Custom vertex/fragment shaders
- **Scroll-Driven Animation** - Position-based transformations

### **UI Elements**
- **Animated Headings** - Rotation-based hover effects
- **Modal System** - Section details with glassmorphism
- **Bottom Navigation** - Interactive rectangular box
- **Cursor Follower** - Theme-aware cursor tracking

### **Performance Features**
- **Efficient Rendering** - Optimized Three.js setup
- **Texture Management** - Front-face only image loading
- **Smooth Scrolling** - Hardware-accelerated animations

## 🎯 Inspiration

This project draws inspiration from:
- **[Paffi.it](https://www.paffi.it)** - 3D cube interactions
- **Modern Web Design** - Glassmorphism and dark themes
- **Premium UX** - Smooth animations and transitions

## 🛠️ Development

### **Adding New Sections**
1. Add content to `sectionDetails` in `page.tsx`
2. Update `parallaxTexts` and `cubeTexts` arrays
3. Add corresponding image to `cubeImages`

### **Customizing Animations**
- Modify shader uniforms for different effects
- Adjust easing curves in CSS transitions
- Update scroll behavior in event listeners

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Deploy on Vercel**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Midnight Blue | `#2c3e50` | Primary background |
| Wet Asphalt | `#34495e` | Secondary background |
| Deep Purple | `#8e44ad` | Accent color |
| Deep Blue | `#2980b9` | Interactive elements |
| Forest Green | `#27ae60` | Success states |
| Teal | `#16a085` | Highlights |
| Orange | `#f39c12` | Warm accent |
| Deep Red | `#e74c3c` | Attention |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For amazing 3D capabilities
- **Next.js Team** - For the incredible framework
- **Paffi.it** - For design inspiration
- **Unsplash** - For high-quality images

---

**Built with ❤️ using Next.js 16 & Three.js**
