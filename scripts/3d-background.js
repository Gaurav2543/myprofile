if (typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas'), alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 15;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x87CEEB, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // --- DNA Helix ---
    const dnaGroup = new THREE.Group();
    const points = [];
    const radius = 1.5;
    const height = 12;
    const turns = 4;
    for (let i = 0; i <= 128; i++) {
        const t = (i / 128) * turns * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(t) * radius, i * (height / 128) - height / 2, Math.sin(t) * radius));
    }
    const curve1 = new THREE.CatmullRomCurve3(points);
    const curve2 = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(-p.x, p.y, -p.z)));
    
    const tubeGeo = new THREE.TubeGeometry(curve1, 64, 0.05, 8, false);
    // Metallic, less bright material
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x5a6a7a, metalness: 0.9, roughness: 0.4 });
    const strand1 = new THREE.Mesh(tubeGeo, tubeMat);
    const strand2 = new THREE.Mesh(new THREE.TubeGeometry(curve2, 64, 0.05, 8, false), tubeMat);
    dnaGroup.add(strand1, strand2);

    // Bridges
    const bridgeGeo = new THREE.CylinderGeometry(0.03, 0.03, radius * 2, 8);
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.6 });
    for (let i = 0; i < 128; i += 10) {
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.position.y = points[i].y;
        bridge.lookAt(points[i]);
        bridge.rotateY(Math.PI / 2);
        dnaGroup.add(bridge);
    }
    dnaGroup.position.x = -10;
    scene.add(dnaGroup);

    // --- Floating Particles ---
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCnt = 10000;
    const posArray = new Float32Array(particlesCnt * 3);
    for (let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.015, color: 0x5a6a7a });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // --- Abstract Image Planes ---
    const planeGroup = new THREE.Group();
    const loader = new THREE.TextureLoader();
    const textureUrls = [
        'https://placehold.co/200x200/000000/FFFFFF?text=MRI+Scan',
        'https://placehold.co/200x200/000000/FFFFFF?text=Genomic+Data',
        'https://placehold.co/200x200/000000/FFFFFF?text=Cell+Structure'
    ];
    const textures = textureUrls.map(url => loader.load(url));

    for (let i = 0; i < 15; i++) {
        const planeGeo = new THREE.PlaneGeometry(2, 2);
        const planeMat = new THREE.MeshBasicMaterial({ 
            map: textures[i % textures.length],
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
        plane.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        planeGroup.add(plane);
    }
    scene.add(planeGroup);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        dnaGroup.rotation.y = elapsedTime * 0.2;
        particlesMesh.rotation.y = -elapsedTime * 0.05;
        planeGroup.rotation.y += 0.001;
        planeGroup.rotation.x += 0.0005;
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };
    animate();

    // --- Handle Window Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
