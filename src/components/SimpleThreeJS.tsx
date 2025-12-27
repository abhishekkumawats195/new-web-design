'use client'

import React, { useEffect, useRef } from 'react'

interface SimpleThreeJSProps {
  onActiveChange: (index: number, bgColor: string, title: string) => void
  onSectionClick: (sectionName: string) => void
}

const SimpleThreeJS: React.FC<SimpleThreeJSProps> = ({ onActiveChange, onSectionClick }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!iframeRef.current) return

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Snap Scroll Cubes</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body { 
            margin: 0; 
            background-color: #2c3e50; 
            overflow: hidden; 
            font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
        }
        
        #canvas-container { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100vh; 
            z-index: 5; 
            pointer-events: none;
        }
        
        .scroll-container {
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scrollbar-width: none;
            position: relative;
            z-index: 1;
        }
        
        .scroll-container::-webkit-scrollbar { 
            display: none; 
        }
        
        .section {
            height: 100vh;
            scroll-snap-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
        }
        
        /* Bottom rectangular box with dynamic text */
        .bottom-info-box {
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 18px 35px;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 500;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 15;
            display: flex;
            align-items: center;
            gap: 25px;
            transition: all 0.4s ease;
            min-width: 400px;
            justify-content: space-between;
            pointer-events: auto;
            cursor: pointer;
        }
        
        .bottom-info-box:hover {
            transform: translateX(-50%) scale(1.02);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }
        
        .dynamic-text {
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            cursor: pointer;
            pointer-events: auto;
        }
        
        .dynamic-text:hover {
            transform: scale(1.05);
            text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
        }
        
        /* Circular arrow button */
        .arrow-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(15px);
            pointer-events: auto;
        }
        
        .arrow-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
            border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        .arrow-icon {
            width: 16px;
            height: 16px;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            transform: rotate(-45deg);
            transition: transform 0.3s ease;
        }
        
        .arrow-btn:hover .arrow-icon {
            transform: rotate(-45deg) translateX(2px);
        }
        
        /* Animated heading styles */
        .animated-heading {
            position: fixed;
            top: 40px;
            left: 40px;
            z-index: 10;
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 12px 18px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            transition: all 0.3s ease;
        }
        
        .animated-heading:hover {
            transform: translateY(-2px);
        }
        
        .word-container {
            display: flex;
            gap: 4px;
            cursor: pointer;
        }
        
        .char {
            display: inline-block;
            color: #ffffff;
            font-size: 2.8rem;
            font-weight: 500;
            transform: rotate(0deg);
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s;
            letter-spacing: 0.5px;
        }
        
        .word-container:hover .char {
            transform: rotate(30deg);
        }
        
        .char:nth-child(1) { transition-delay: 0.0s; }
        .char:nth-child(2) { transition-delay: 0.05s; }
        .char:nth-child(3) { transition-delay: 0.1s; }
        .char:nth-child(4) { transition-delay: 0.15s; }
        
        /* About Us section styles */
        .about-us-section {
            position: fixed;
            top: 40px;
            right: 40px;
            z-index: 10;
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 10px 14px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            transition: all 0.3s ease;
        }
        
        .about-us-section:hover {
            transform: translateY(-2px);
        }
        
        .about-word {
            display: flex;
            gap: 1px;
            cursor: pointer;
            margin-bottom: 5px;
        }
        
        .char-small {
            display: inline-block;
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 500;
            transform: rotate(0deg);
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s;
            letter-spacing: 0.5px;
        }
        
        .about-word:hover .char-small {
            transform: rotate(30deg);
        }
        
        .char-small:nth-child(1) { transition-delay: 0.0s; }
        .char-small:nth-child(2) { transition-delay: 0.05s; }
        .char-small:nth-child(3) { transition-delay: 0.1s; }
        .char-small:nth-child(4) { transition-delay: 0.15s; }
        .char-small:nth-child(5) { transition-delay: 0.2s; }
        .char-small:nth-child(6) { transition-delay: 0.25s; }
        .char-small:nth-child(7) { transition-delay: 0.3s; }
        .char-small:nth-child(8) { transition-delay: 0.35s; }
        .char-small:nth-child(9) { transition-delay: 0.4s; }
        
        /* Cursor follower styles */
        .cursor-follower {
            position: fixed;
            width: 12px;
            height: 12px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease-out;
            mix-blend-mode: difference;
        }
        
        .parallax-text {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.1);
            white-space: nowrap;
            font-family: 'Arial Black', Arial, sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            z-index: 2;
            pointer-events: none;
            animation: moveRightToLeft 20s linear infinite;
            transition: color 0.5s ease;
        }
        
        .parallax-text-mask {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.1);
            white-space: nowrap;
            font-family: 'Arial Black', Arial, sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            z-index: -1;
            pointer-events: none;
            animation: moveRightToLeft 20s linear infinite;
            transition: color 0.5s ease;
            opacity: 0;
        }
        
        @keyframes moveRightToLeft {
            0% {
                transform: translate(-50%, -50%) translateX(100vw);
            }
            100% {
                transform: translate(-50%, -50%) translateX(-100vw);
            }
        }
        
        @media (max-width: 768px) {
            .parallax-text {
                font-size: 3rem;
            }
            
            .animated-heading {
                top: 20px;
                left: 20px;
                padding: 10px 14px;
            }
            
            .char {
                font-size: 2.2rem;
            }
            
            .about-us-section {
                top: 20px;
                right: 20px;
                padding: 8px 12px;
            }
            
            .char-small {
                font-size: 1rem;
            }
            
            .bottom-info-box {
                bottom: 20px;
                min-width: 320px;
                padding: 15px 25px;
                font-size: 1.1rem;
            }
            
            .arrow-btn {
                width: 40px;
                height: 40px;
            }
        }
    </style>
</head>
<body>
    <div id="canvas-container"></div>
    
    <div class="scroll-container" id="scroll-container">
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
    </div>
    
    <!-- Bottom rectangular box with dynamic text and arrow button -->
    <div class="bottom-info-box" id="bottom-info-box">
        <div class="dynamic-text" id="dynamic-text">CREATIVE STUDIO</div>
        <div class="arrow-btn" id="arrow-btn">
            <div class="arrow-icon"></div>
        </div>
    </div>
    
    <!-- Animated heading in top left corner -->
    <div class="animated-heading">
        <div class="word-container">
            <span class="char">T</span>
            <span class="char">a</span>
            <span class="char">k</span>
            <span class="char">e</span>
        </div>
    </div>
    
    <!-- About Us section in top right corner -->
    <div class="about-us-section">
        <div class="word-container about-word">
            <span class="char-small">A</span>
            <span class="char-small">b</span>
            <span class="char-small">o</span>
            <span class="char-small">u</span>
            <span class="char-small">t</span>
            <span class="char-small">_</span>
            <span class="char-small">_</span>
            <span class="char-small">U</span>
            <span class="char-small">s</span>
        </div>
    </div>
    
    <!-- Custom cursor follower -->
    <div class="cursor-follower" id="cursor-follower"></div>
    
    <div class="parallax-text" id="parallax-text">CREATIVE STUDIO</div>
    
    <!-- Additional text elements for masking effect -->
    <div class="parallax-text-mask" id="text-mask-1"></div>
    <div class="parallax-text-mask" id="text-mask-2"></div>
    <div class="parallax-text-mask" id="text-mask-3"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

    <script id="vertexShader" type="x-shader/x-vertex">
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float uTwist;
        
        void main() {
            vUv = uv;
            vNormal = normal;
            vec3 pos = position;
            
            float twist = pos.y * uTwist;
            float c = cos(twist);
            float s = sin(twist);
            mat2 m = mat2(c, -s, s, c);
            pos.xz = m * pos.xz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    </script>

    <script id="fragmentShader" type="x-shader/x-fragment">
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uIsActive;
        uniform sampler2D uTexture;
        uniform float uShowTexture;
        
        void main() {
            vec3 light = vec3(0.5, 0.5, 1.0);
            float d = dot(vNormal, light);
            
            // Get texture color
            vec4 textureColor = texture2D(uTexture, vUv);
            
            // Mix between solid color and texture based on uShowTexture
            vec3 baseColor = mix(uColor, textureColor.rgb, uShowTexture);
            vec3 finalColor = baseColor * (0.8 + d * 0.2);
            
            if (uIsActive > 0.5) {
                float borderWidth = 0.032;
                float border = 1.0;
                
                if (vUv.x < borderWidth || vUv.x > 1.0 - borderWidth ||
                    vUv.y < borderWidth || vUv.y > 1.0 - borderWidth) {
                    finalColor = mix(finalColor, vec3(1.0), 0.6);
                    border = 1.2;
                }
                
                float shadow = 1.0 - (d * 0.3);
                finalColor *= shadow;
                
                finalColor = mix(finalColor, finalColor * 1.3, 0.3);
            }
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    </script>

    <script>
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0); // Transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(renderer.domElement);
        
        camera.position.z = 12;
        
        const cubes = [];
        const cubeCount = 8;
        const fixedGap = 4;
        const bgColors = ['#2c3e50', '#34495e', '#8e44ad', '#2980b9', '#27ae60', '#16a085', '#f39c12', '#e74c3c'];
        const titles = ['Asolo Prosecco', 'Serprino', 'Taverna Kus', 'Podcast Co', 'Modern Studio', 'Creative Lab', 'Digital Art', 'Brand Design'];
        
        // Random images for each cube
        const cubeImages = [
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center'
        ];
        
        const cubeColors = [
            new THREE.Color(0x2c3e50),
            new THREE.Color(0x34495e),
            new THREE.Color(0x8e44ad),
            new THREE.Color(0x2980b9),
            new THREE.Color(0x27ae60),
            new THREE.Color(0x16a085),
            new THREE.Color(0xf39c12),
            new THREE.Color(0xe74c3c)
        ];
        
        const geometry = new THREE.BoxGeometry(2.7, 2.7, 2.7, 10, 60, 10);
        const textureLoader = new THREE.TextureLoader();
        
        for (let i = 0; i < cubeCount; i++) {
            // Load texture for front face only
            const texture = textureLoader.load(cubeImages[i]);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            
            // Create materials array for each face of the cube
            const materials = [];
            
            // Right face (index 0) - solid color
            materials.push(new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 },
                    uTexture: { value: null },
                    uShowTexture: { value: 0.0 }
                }
            }));
            
            // Left face (index 1) - solid color
            materials.push(new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 },
                    uTexture: { value: null },
                    uShowTexture: { value: 0.0 }
                }
            }));
            
            // Top face (index 2) - solid color
            materials.push(new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 },
                    uTexture: { value: null },
                    uShowTexture: { value: 0.0 }
                }
            }));
            
            // Bottom face (index 3) - solid color
            materials.push(new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 },
                    uTexture: { value: null },
                    uShowTexture: { value: 0.0 }
                }
            }));
            
            // Front face (index 4) - with texture
            materials.push(new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 },
                    uTexture: { value: texture },
                    uShowTexture: { value: 0.0 }
                }
            }));
            
            // Back face (index 5) - solid color
            materials.push(new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 },
                    uTexture: { value: null },
                    uShowTexture: { value: 0.0 }
                }
            }));
            
            const cube = new THREE.Mesh(geometry, materials);
            cube.position.y = -i * fixedGap;
            scene.add(cube);
            cubes.push(cube);
        }
        
        const scrollContainer = document.getElementById('scroll-container');
        const parallaxText = document.getElementById('parallax-text');
        const animatedHeading = document.querySelector('.animated-heading .word-container');
        const aboutUsSection = document.querySelector('.about-us-section');
        const cursorFollower = document.getElementById('cursor-follower');
        const dynamicText = document.getElementById('dynamic-text');
        const bottomInfoBox = document.getElementById('bottom-info-box');
        
        const parallaxTexts = [
            'CREATIVE STUDIO',
            'DESIGN EXCELLENCE', 
            'VISUAL IDENTITY',
            'DIGITAL CRAFT',
            'BRAND EXPERIENCE',
            'ARTISTIC VISION',
            'MODERN AESTHETICS',
            'INNOVATIVE SOLUTIONS'
        ];
        
        function darkenColor(hex, percent) {
            const num = parseInt(hex.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) - amt;
            const G = (num >> 8 & 0x00FF) - amt;
            const B = (num & 0x0000FF) - amt;
            return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        }
        
        // Convert hex to rgba with alpha
        function hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        }
        
        // Get contrast color (colorful options) based on background brightness
        function getContrastColor(hexColor) {
            // Convert hex to RGB
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            
            // Calculate brightness using luminance formula
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            
            // Return colorful contrasts based on background
            if (brightness > 150) {
                // For light backgrounds, use dark vibrant colors
                const darkColors = ['#2c3e50', '#8e44ad', '#27ae60', '#e74c3c', '#f39c12', '#34495e'];
                const colorIndex = Math.floor((r + g + b) / 3) % darkColors.length;
                return darkColors[colorIndex];
            } else {
                // For dark backgrounds, use light vibrant colors
                const lightColors = ['#ecf0f1', '#f1c40f', '#e67e22', '#3498db', '#e74c3c', '#9b59b6'];
                const colorIndex = Math.floor((r + g + b) / 3) % lightColors.length;
                return lightColors[colorIndex];
            }
        }
        
        scrollContainer.addEventListener('scroll', () => {
            const scrollY = scrollContainer.scrollTop;
            const vh = window.innerHeight;
            const progress = scrollY / vh;
            
            let activeIndex = -1;
            
            if (parallaxText) {
                const textIndex = Math.floor(progress) % parallaxTexts.length;
                if (parallaxText.textContent !== parallaxTexts[textIndex]) {
                    parallaxText.textContent = parallaxTexts[textIndex];
                }
                
                // Update bottom box text to match parallax text
                if (dynamicText) {
                    dynamicText.textContent = parallaxTexts[textIndex];
                }
            }
            
            cubes.forEach((cube, index) => {
                const cubeProgress = progress - index;
                
                cube.position.y = cubeProgress * fixedGap;
                
                const isActive = Math.abs(cubeProgress) < 0.5;
                
                // Update all materials for twist and active state
                cube.material.forEach((material, faceIndex) => {
                    material.uniforms.uTwist.value = cubeProgress * 0.8;
                    material.uniforms.uIsActive.value = isActive ? 1.0 : 0.0;
                    
                    // Show texture only on front face (index 4) when active
                    if (faceIndex === 4) {
                        material.uniforms.uShowTexture.value = isActive ? 1.0 : 0.0;
                    }
                });
                
                if (isActive) {
                    activeIndex = index;
                    document.body.style.backgroundColor = bgColors[index];
                    
                    // Update animated heading color and background
                    if (animatedHeading) {
                        const chars = animatedHeading.querySelectorAll('.char');
                        const contrastColor = getContrastColor(bgColors[index]);
                        const headingBg = hexToRgba(bgColors[index], 0.15); // Subtle background
                        
                        chars.forEach(char => {
                            char.style.color = contrastColor;
                        });
                        
                        // Update heading background to match theme
                        animatedHeading.style.background = headingBg;
                        animatedHeading.style.borderColor = hexToRgba(contrastColor, 0.2);
                    }
                    
                    // Update about us section color and background
                    if (aboutUsSection) {
                        const smallChars = aboutUsSection.querySelectorAll('.char-small');
                        const contrastColor = getContrastColor(bgColors[index]);
                        const aboutBg = hexToRgba(bgColors[index], 0.15); // Subtle background
                        
                        smallChars.forEach(char => {
                            char.style.color = contrastColor;
                        });
                        
                        // Update about us background to match theme
                        aboutUsSection.style.background = aboutBg;
                        aboutUsSection.style.borderColor = hexToRgba(contrastColor, 0.2);
                    }
                    
                    // Update cursor follower color
                    if (cursorFollower) {
                        cursorFollower.style.backgroundColor = bgColors[index];
                    }
                    
                    // Update bottom box background color to match theme (more subtle for liquid effect)
                    if (bottomInfoBox) {
                        const boxColor = darkenColor(bgColors[index], 10); // Less darkening for liquid effect
                        const r = parseInt(boxColor.slice(1,3), 16);
                        const g = parseInt(boxColor.slice(3,5), 16);
                        const b = parseInt(boxColor.slice(5,7), 16);
                        bottomInfoBox.style.background = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.15)'; // More transparent
                    }
                    
                    if (parallaxText) {
                        const darkColor = darkenColor(bgColors[index], 40);
                        parallaxText.style.color = darkColor + '80';
                    }
                    
                    cubes.forEach((c) => {
                        c.material.forEach((mat) => {
                            mat.uniforms.uColor.value = cubeColors[index];
                        });
                    });
                    
                    window.parent.postMessage({
                        type: 'activeChange',
                        index: index,
                        bgColor: bgColors[index],
                        title: titles[index]
                    }, '*');
                }
            });
            
            // Apply text masking based on cube positions
            applyTextMasking(progress);
        });
        
        function applyTextMasking(progress) {
            if (!parallaxText) return;
            
            // Calculate which cubes are visible and their approximate screen positions
            let visibleCubes = [];
            
            for (let i = 0; i < cubeCount; i++) {
                const cubeProgress = progress - i;
                const distanceFromCenter = Math.abs(cubeProgress);
                
                // Only consider cubes that are close to the center (visible on screen)
                if (distanceFromCenter < 1.5) {
                    // Convert 3D position to approximate screen position
                    const screenY = window.innerHeight / 2 - (cubeProgress * fixedGap * 25); // Approximate conversion
                    visibleCubes.push({
                        y: screenY,
                        progress: cubeProgress,
                        distance: distanceFromCenter
                    });
                }
            }
            
            // Calculate opacity based on cube positions
            let opacity = 1;
            const textCenterY = window.innerHeight / 2; // Text is centered vertically
            const cubeSize = 120; // Approximate cube size on screen
            
            visibleCubes.forEach(cube => {
                const distanceFromText = Math.abs(textCenterY - cube.y);
                
                // If cube is close to text center, reduce opacity
                if (distanceFromText < cubeSize) {
                    const fadeAmount = 1 - (distanceFromText / cubeSize);
                    opacity = Math.min(opacity, 1 - fadeAmount * 0.8); // Fade up to 80%
                }
            });
            
            // Apply the calculated opacity
            parallaxText.style.opacity = Math.max(0.1, opacity); // Minimum 10% opacity
        }
        
        // Cursor follower functionality
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateCursor() {
            // Smooth following with easing
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            if (cursorFollower) {
                cursorFollower.style.left = cursorX + 'px';
                cursorFollower.style.top = cursorY + 'px';
            }
            
            requestAnimationFrame(updateCursor);
        }
        
        // Start cursor animation
        updateCursor();
        
        // Add click functionality to the entire bottom box with better debugging
        if (bottomInfoBox) {
            console.log('Bottom info box found, adding click handler');
            
            bottomInfoBox.addEventListener('click', function(e) {
                console.log('=== BOTTOM BOX CLICKED ===');
                e.preventDefault();
                e.stopPropagation();
                
                const currentText = dynamicText ? dynamicText.textContent : 'CREATIVE STUDIO';
                console.log('Current text:', currentText);
                
                // Visual confirmation
                alert('Bottom box clicked! Opening: ' + currentText);
                
                // Send message to parent with detailed logging
                try {
                    console.log('Sending message to parent...');
                    window.parent.postMessage({
                        type: 'sectionClick',
                        sectionName: currentText,
                        timestamp: Date.now()
                    }, '*');
                    console.log('Message sent successfully to parent');
                } catch (error) {
                    console.error('Error sending message to parent:', error);
                }
            });
            
            // Make sure it's clickable
            bottomInfoBox.style.cursor = 'pointer';
            bottomInfoBox.style.pointerEvents = 'auto';
            console.log('Bottom box click handler attached successfully');
        } else {
            console.error('Bottom info box not found!');
        }
        
        // Also add click to dynamic text with better debugging
        if (dynamicText) {
            console.log('Dynamic text found, adding click handler');
            
            dynamicText.addEventListener('click', function(e) {
                console.log('=== DYNAMIC TEXT CLICKED ===');
                e.preventDefault();
                e.stopPropagation();
                
                const currentText = dynamicText.textContent;
                console.log('Dynamic text content:', currentText);
                
                // Visual confirmation
                alert('Dynamic text clicked! Opening: ' + currentText);
                
                // Send message to parent
                try {
                    console.log('Sending message from dynamic text...');
                    window.parent.postMessage({
                        type: 'sectionClick',
                        sectionName: currentText,
                        source: 'dynamicText',
                        timestamp: Date.now()
                    }, '*');
                    console.log('Message sent successfully from dynamic text');
                } catch (error) {
                    console.error('Error sending message from dynamic text:', error);
                }
            });
            
            // Make sure it's clickable
            dynamicText.style.cursor = 'pointer';
            dynamicText.style.pointerEvents = 'auto';
            console.log('Dynamic text click handler attached successfully');
        } else {
            console.error('Dynamic text not found!');
        }
        
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        console.log('3D Scene initialized with', cubes.length, 'cubes');
        console.log('Click handlers attached to bottom box and dynamic text');
    </script>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url

    const handleMessage = (event: MessageEvent) => {
      console.log('=== MESSAGE RECEIVED IN PARENT ===');
      console.log('Event data:', event.data);
      console.log('Event origin:', event.origin);
      
      if (event.data.type === 'activeChange') {
        console.log('Active change message received');
        onActiveChange(event.data.index, event.data.bgColor, event.data.title)
      }
      
      if (event.data.type === 'sectionClick') {
        console.log('Section click message received:', event.data.sectionName);
        console.log('Calling onSectionClick...');
        onSectionClick(event.data.sectionName)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
      URL.revokeObjectURL(url)
    }
  }, [onActiveChange, onSectionClick])

  return (
    <iframe
      ref={iframeRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: 1
      }}
      title="3D Snap Scroll Experience"
    />
  )
}

export default SimpleThreeJS