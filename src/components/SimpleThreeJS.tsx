'use client'

import React, { useEffect, useRef } from 'react'

interface SimpleThreeJSProps {
  onActiveChange: (index: number, bgColor: string, title: string) => void
}

const SimpleThreeJS: React.FC<SimpleThreeJSProps> = ({ onActiveChange }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!iframeRef.current) return

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Snap Scroll Cubes</title>
    <style>
        body { 
            margin: 0; 
            background-color: #e0c08d; 
            overflow: hidden; 
            font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
        }
        
        #canvas-container { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100vh; 
            z-index: -1; 
        }
        
        .scroll-container {
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scrollbar-width: none;
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
            pointer-events: none;
        }
        
        .nav-ui {
            position: fixed; 
            bottom: 30px; 
            left: 50%; 
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95); 
            padding: 12px 30px; 
            border-radius: 20px;
            font-weight: bold; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.15); 
            z-index: 10;
            color: #333;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
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
            z-index: -1;
            pointer-events: none;
            animation: moveRightToLeft 20s linear infinite;
            transition: color 0.5s ease;
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
    
    <div class="nav-ui">
        <span id="project-title">Asolo Prosecco</span>
    </div>
    
    <div class="parallax-text" id="parallax-text">CREATIVE STUDIO</div>

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
        
        void main() {
            vec3 light = vec3(0.5, 0.5, 1.0);
            float d = dot(vNormal, light);
            
            vec3 finalColor = uColor * (0.8 + d * 0.2);
            
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
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(renderer.domElement);
        
        camera.position.z = 12;
        
        const cubes = [];
        const cubeCount = 8;
        const fixedGap = 4;
        const bgColors = ['#e0c08d', '#8ea35d', '#d16a5e', '#5d8ea3', '#a38d5d', '#c08de0', '#8d5da3', '#5de08d'];
        const titles = ['Asolo Prosecco', 'Serprino', 'Taverna Kus', 'Podcast Co', 'Modern Studio', 'Creative Lab', 'Digital Art', 'Brand Design'];
        
        const cubeColors = [
            new THREE.Color(0xe0c08d),
            new THREE.Color(0x8ea35d),
            new THREE.Color(0xd16a5e),
            new THREE.Color(0x5d8ea3),
            new THREE.Color(0xa38d5d),
            new THREE.Color(0xc08de0),
            new THREE.Color(0x8d5da3),
            new THREE.Color(0x5de08d)
        ];
        
        const geometry = new THREE.BoxGeometry(2.7, 2.7, 2.7, 10, 60, 10);
        
        for (let i = 0; i < cubeCount; i++) {
            const material = new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                uniforms: { 
                    uTwist: { value: 0 },
                    uColor: { value: cubeColors[i] },
                    uIsActive: { value: 0.0 }
                }
            });
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.y = -i * fixedGap;
            scene.add(cube);
            cubes.push(cube);
        }
        
        const scrollContainer = document.getElementById('scroll-container');
        const parallaxText = document.getElementById('parallax-text');
        
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
            }
            
            cubes.forEach((cube, index) => {
                const cubeProgress = progress - index;
                
                cube.position.y = cubeProgress * fixedGap;
                cube.material.uniforms.uTwist.value = cubeProgress * 1.5;
                
                const isActive = Math.abs(cubeProgress) < 0.5;
                cube.material.uniforms.uIsActive.value = isActive ? 1.0 : 0.0;
                
                if (isActive) {
                    activeIndex = index;
                    document.body.style.backgroundColor = bgColors[index];
                    document.getElementById('project-title').innerText = titles[index];
                    
                    if (parallaxText) {
                        const darkColor = darkenColor(bgColors[index], 40);
                        parallaxText.style.color = darkColor + '80';
                    }
                    
                    cubes.forEach((c) => {
                        c.material.uniforms.uColor.value = cubeColors[index];
                    });
                    
                    window.parent.postMessage({
                        type: 'activeChange',
                        index: index,
                        bgColor: bgColors[index],
                        title: titles[index]
                    }, '*');
                }
            });
        });
        
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
    </script>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'activeChange') {
        onActiveChange(event.data.index, event.data.bgColor, event.data.title)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
      URL.revokeObjectURL(url)
    }
  }, [onActiveChange])

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