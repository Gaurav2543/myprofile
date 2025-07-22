// Ensure Three.js is loaded before running
if (typeof THREE !== 'undefined') {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas'), alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // --- DNA Helix ---
    const points = [];
    const radius = 1;
    const height = 10;
    const turns = 3;
    const pointsPerTurn = 64;

    for (let i = 0; i < turns * pointsPerTurn; i++) {
        const angle = (i / pointsPerTurn) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, i * (height / (turns * pointsPerTurn)) - height / 2, Math.sin(angle) * radius));
    }

    const curve1 = new THREE.CatmullRomCurve3(points);

    const points2 = points.map(p => new THREE.Vector3(-p.x, p.y, -p.z));
    const curve2 = new THREE.CatmullRomCurve3(points2);

    const geometry1 = new THREE.TubeGeometry(curve1, 128, 0.05, 8, false);
    const geometry2 = new THREE.TubeGeometry(curve2, 128, 0.05, 8, false);
    
    const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0ea5e9, roughness: 0.5 });

    const strand1 = new THREE.Mesh(geometry1, material);
    const strand2 = new THREE.Mesh(geometry2, material);

    const dna = new THREE.Group();
    dna.add(strand1);
    dna.add(strand2);
    
    // Add bridges
    for (let i = 0; i < points.length; i += 8) {
        const bridgeGeo = new THREE.CylinderGeometry(0.02, 0.02, radius * 2, 3);
        const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x475569, emissive: 0x64748b });
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.position.copy(new THREE.Vector3(0, points[i].y, 0));
        bridge.lookAt(points[i]);
        bridge.rotateY(Math.PI / 2);
        dna.add(bridge);
    }

    dna.position.x = -3;
    scene.add(dna);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // --- Particles ---
    const particleGeo = new THREE.BufferGeometry;
    const particleCount = 5000;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.01, color: 0x94a3b8 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Animation Loop ---
    const animate = () => {
        requestAnimationFrame(animate);
        dna.rotation.y += 0.002;
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
    };

    animate();

    // --- Handle Window Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
