import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './ThreeAnimation.css';

const ThreeAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Премахваме всички съществуващи canvas елементи, ако има такива
    mountRef.current.querySelectorAll('canvas').forEach(canvas => {
      canvas.remove();
    });
    
    // Проверяваме само за съществуващ рендерер
    if (rendererRef.current) {
      console.warn('ThreeAnimation: Already initialized. Cleaning up previous instance.');
      rendererRef.current.dispose();
      rendererRef.current = null;
      
      if (sceneRef.current) {
        // Почистване на сцената
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
        sceneRef.current = null;
      }
    }

    // Създаване на сцена
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // Променяме фона на черен за космически вид
    scene.background = new THREE.Color(0x000000);

    // Настройка на камера
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Създаване на рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Добавяне на контроли
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    // Explicitly enable rotation (it's enabled by default, but let's be explicit)
    controls.enableRotate = true;
    // Stop auto-rotation when user interacts with the scene
    controls.addEventListener('start', function() {
      controls.autoRotate = false;
    });
    
    // Allow re-enabling auto-rotation after a period of inactivity
    let inactivityTimer: number | null = null;
    controls.addEventListener('end', function() {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        controls.autoRotate = true;
      }, 5000); // Re-enable auto-rotation after 5 seconds of inactivity
    });

    // Добавяне на светлини
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Звезден фон - добавяме много малки точки
    function createStars() {
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
      });

      const starsVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(1000);
        const y = THREE.MathUtils.randFloatSpread(1000);
        const z = THREE.MathUtils.randFloatSpread(1000);
        
        // Правим звездите да са далеч от Земята
        if (Math.sqrt(x * x + y * y + z * z) < 10) continue;
        
        starsVertices.push(x, y, z);
      }

      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
      return stars;
    }

    const stars = createStars();

    // Добавяме мъглявина (nebula) във фона
    function createNebula() {
      const textureLoader = new THREE.TextureLoader();
      const nebulaTexture = textureLoader.load('/nebula_texture.jpg', () => {
        renderer.render(scene, camera);
      });
      
      const nebulaGeometry = new THREE.SphereGeometry(100, 32, 32);
      // Обръщаме нормалите навътре, за да виждаме текстурата отвътре
      nebulaGeometry.scale(-1, 1, 1);
      
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        map: nebulaTexture,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.6
      });
      
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
      scene.add(nebula);
      return nebula;
    }

    const nebula = createNebula();

    // Текстура за земята
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth_texture.jpg', () => {
      renderer.render(scene, camera);
    });
    
    const bumpMap = textureLoader.load('/earth_bump.jpg', () => {
      renderer.render(scene, camera);
    });
    
    const cloudsTexture = textureLoader.load('/earth_clouds.png', () => {
      renderer.render(scene, camera);
    });

    // Създаване на земята
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      shininess: 5,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Облаци около земята
    const cloudsGeometry = new THREE.SphereGeometry(2.05, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.4,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);

    // Добавяме светлинен ореол около Земята
    function createEarthGlow() {
      const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          c: { value: 0.2 },
          p: { value: 1.4 },
          glowColor: { value: new THREE.Color(0x00a1ff) },
          viewVector: { value: camera.position }
        },
        vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normal);
            vec3 vNormel = normalize(viewVector);
            intensity = pow(c - dot(vNormal, vNormel), p);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const earthGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(earthGlow);
      return earthGlow;
    }

    const earthGlow = createEarthGlow();
    
    // Анимацията
    const animate = () => {
      requestAnimationFrame(animate);

      // Въртене на облаците
      clouds.rotation.y += 0.0005;
      
      // Плавно въртене на земята
      earth.rotation.y += 0.0003;
      
      // Въртене на небулата
      nebula.rotation.y += 0.0001;
      nebula.rotation.x += 0.00005;
      
      // Добавяме въртене на звездите
      stars.rotation.y += 0.0001;

      // Актуализиране на uniformа viewVector в shader-а на ореола
      if (earthGlow.material instanceof THREE.ShaderMaterial) {
        earthGlow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
          camera.position,
          earthGlow.position
        );
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Обработка на преоразмеряване на прозореца
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Почистване
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && rendererRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.warn('Error removing canvas:', e);
        }
      }
      
      // Почистване на ресурсите от паметта
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      sceneRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="three-animation" />;
};

export default ThreeAnimation;
