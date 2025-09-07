// Complete Enhanced 3D Background with All Research Elements
// File: scripts/3d-background.js

if (typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: document.querySelector('#bg-canvas'), 
        alpha: true, 
        antialias: true 
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 20;

    // Enhanced Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x38bdf8, 2);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x0ea5e9, 1, 100);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);

    // Neural Network Nodes
    const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x38bdf8, 
        metalness: 0.8, 
        roughness: 0.2,
        emissive: 0x1e40af,
        emissiveIntensity: 0.1
    });

    const nodes = [];
    const connections = [];
    
    // Create neural network structure
    for (let layer = 0; layer < 5; layer++) {
        const nodesInLayer = layer === 0 || layer === 4 ? 6 : 8;
        for (let i = 0; i < nodesInLayer; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.x = (layer - 2) * 8;
            node.position.y = (i - nodesInLayer/2) * 2;
            node.position.z = (Math.random() - 0.5) * 4;
            
            node.userData = { 
                originalScale: 1,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02
            };
            
            scene.add(node);
            nodes.push(node);
        }
    }

    // Create connections between layers
    const connectionMaterial = new THREE.LineBasicMaterial({ 
        color: 0x38bdf8, 
        transparent: true, 
        opacity: 0.3 
    });

    for (let layer = 0; layer < 4; layer++) {
        const currentLayerNodes = nodes.filter(node => 
            Math.abs(node.position.x - (layer - 2) * 8) < 1
        );
        const nextLayerNodes = nodes.filter(node => 
            Math.abs(node.position.x - (layer + 1 - 2) * 8) < 1
        );

        currentLayerNodes.forEach(currentNode => {
            nextLayerNodes.forEach(nextNode => {
                if (Math.random() > 0.3) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        currentNode.position,
                        nextNode.position
                    ]);
                    const line = new THREE.Line(geometry, connectionMaterial);
                    scene.add(line);
                    connections.push(line);
                }
            });
        });
    }

    // Enhanced DNA Double Helix
    const dnaGroup = new THREE.Group();
    const helixRadius = 2.5;
    const helixHeight = 25;
    const turns = 8;
    
    const points1 = [];
    const points2 = [];
    
    for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * turns * Math.PI * 2;
        const y = (i / 300) * helixHeight - helixHeight / 2;
        
        points1.push(new THREE.Vector3(
            Math.cos(t) * helixRadius,
            y,
            Math.sin(t) * helixRadius
        ));
        
        points2.push(new THREE.Vector3(
            Math.cos(t + Math.PI) * helixRadius,
            y,
            Math.sin(t + Math.PI) * helixRadius
        ));
    }
    
    const curve1 = new THREE.CatmullRomCurve3(points1);
    const curve2 = new THREE.CatmullRomCurve3(points2);
    
    const tubeGeometry1 = new THREE.TubeGeometry(curve1, 150, 0.12, 12, false);
    const tubeGeometry2 = new THREE.TubeGeometry(curve2, 150, 0.12, 12, false);
    
    const tubeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0ea5e9, 
        metalness: 0.8, 
        roughness: 0.2,
        emissive: 0x0284c7,
        emissiveIntensity: 0.1
    });
    
    const strand1 = new THREE.Mesh(tubeGeometry1, tubeMaterial);
    const strand2 = new THREE.Mesh(tubeGeometry2, tubeMaterial);
    
    dnaGroup.add(strand1, strand2);
    
    // Enhanced base pairs with colors
    const basePairColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24];
    
    for (let i = 0; i < points1.length; i += 20) {
        const basePairGeometry = new THREE.CylinderGeometry(0.04, 0.04, helixRadius * 2, 8);
        const basePairMaterial = new THREE.MeshStandardMaterial({ 
            color: basePairColors[i % basePairColors.length], 
            metalness: 0.6, 
            roughness: 0.4,
            emissive: basePairColors[i % basePairColors.length],
            emissiveIntensity: 0.05
        });
        const basePair = new THREE.Mesh(basePairGeometry, basePairMaterial);
        
        basePair.position.copy(points1[i]);
        basePair.lookAt(points2[i]);
        basePair.rotateZ(Math.PI / 2);
        
        dnaGroup.add(basePair);
    }
    
    dnaGroup.position.x = 5;

    scene.add(dnaGroup)

    // Research Artifacts Group
    const artifactsGroup = new THREE.Group();
    
    // Protein Structure (icosahedron representing folded protein)
    const proteinGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const proteinMaterial = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: true
    });
    const protein = new THREE.Mesh(proteinGeometry, proteinMaterial);
    protein.position.set(12, 8, -5);
    artifactsGroup.add(protein);

    // Brain Network (dodecahedron with connections)
    const brainGeometry = new THREE.DodecahedronGeometry(1.5, 0);
    const brainMaterial = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8
    });
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    brain.position.set(-12, -6, 8);
    artifactsGroup.add(brain);

    // Gene Expression Heatmap (grid of cubes)
    const heatmapGroup = new THREE.Group();
    const cubeGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const intensity = Math.random();
            const color = new THREE.Color();
            color.setHSL(0.7 - intensity * 0.7, 0.9, 0.3 + intensity * 0.5);
            
            const cubeMaterial = new THREE.MeshStandardMaterial({ 
                color,
                metalness: 0.3,
                roughness: 0.7,
                emissive: color,
                emissiveIntensity: 0.1
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            
            cube.position.set(
                (i - 5) * 0.5,
                (j - 5) * 0.5,
                0
            );
            
            heatmapGroup.add(cube);
        }
    }
    heatmapGroup.position.set(20, -5, 5);
    heatmapGroup.scale.setScalar(0.8);
    artifactsGroup.add(heatmapGroup);

    // Enhanced Molecular Bond Network
    const moleculeGroup = new THREE.Group();
    const atomGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const bondGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
    
    const atomPositions = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.5, 0.8, 0.5),
        new THREE.Vector3(-1.2, 0.4, -0.3),
        new THREE.Vector3(0.7, -1.3, 1),
        new THREE.Vector3(-0.5, -1, -1.2),
        new THREE.Vector3(0.3, 1.5, -0.8),
        new THREE.Vector3(-1.5, 0.2, 0.9)
    ];
    
    const atomColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0x6c5ce7, 0xff9ff3, 0x54a0ff];
    
    atomPositions.forEach((pos, index) => {
        const atomMaterial = new THREE.MeshStandardMaterial({ 
            color: atomColors[index],
            metalness: 0.4,
            roughness: 0.6,
            emissive: atomColors[index],
            emissiveIntensity: 0.1
        });
        const atom = new THREE.Mesh(atomGeometry, atomMaterial);
        atom.position.copy(pos);
        moleculeGroup.add(atom);
        
        atomPositions.forEach((otherPos, otherIndex) => {
            if (index < otherIndex && Math.random() > 0.5) {
                const bondMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x94a3b8,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const bond = new THREE.Mesh(bondGeometry, bondMaterial);
                
                const midPoint = pos.clone().add(otherPos).multiplyScalar(0.5);
                bond.position.copy(midPoint);
                bond.lookAt(otherPos);
                bond.rotateX(Math.PI / 2);
                
                const distance = pos.distanceTo(otherPos);
                bond.scale.y = distance;
                
                moleculeGroup.add(bond);
            }
        });
    });
    
    moleculeGroup.position.set(-8, 12, -10);
    artifactsGroup.add(moleculeGroup);

    // Medical Equipment
    const equipmentGroup = new THREE.Group();
    
    // MRI Scanner
    const mriGroup = new THREE.Group();
    const mriBodyGeometry = new THREE.CylinderGeometry(3.5, 3.5, 2.5, 20);
    const mriBodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x475569,
        metalness: 0.8,
        roughness: 0.2
    });
    const mriBody = new THREE.Mesh(mriBodyGeometry, mriBodyMaterial);
    
    const mriHoleGeometry = new THREE.CylinderGeometry(1.8, 1.8, 2.7, 20);
    const mriHoleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b,
        metalness: 0.1,
        roughness: 0.9
    });
    const mriHole = new THREE.Mesh(mriHoleGeometry, mriHoleMaterial);
    
    mriGroup.add(mriBody, mriHole);
    mriGroup.position.set(22, 2, -18);
    mriGroup.rotation.z = Math.PI / 2;
    equipmentGroup.add(mriGroup);

    // Microscope
    const microscopeGroup = new THREE.Group();
    const microscopeBase = new THREE.CylinderGeometry(1.2, 1.8, 0.6, 16);
    const microscopeBaseMesh = new THREE.Mesh(microscopeBase, mriBodyMaterial);
    const microscopeArm = new THREE.CylinderGeometry(0.2, 0.2, 3, 12);
    const microscopeArmMesh = new THREE.Mesh(microscopeArm, mriBodyMaterial);
    microscopeArmMesh.position.y = 1.8;
    microscopeGroup.add(microscopeBaseMesh, microscopeArmMesh);
    microscopeGroup.position.set(-22, -8, 8);
    equipmentGroup.add(microscopeGroup);

    artifactsGroup.add(equipmentGroup);
    scene.add(artifactsGroup);

    // Floating Text Boards
    const textBoardGroup = new THREE.Group();
    const researchTerms = [
        'Deep Learning', 'Medical Imaging', 'Genomics', 'fMRI Analysis',
        'Neural Networks', 'Mammography', 'Multi-Omics', 'Bioinformatics',
        'Machine Learning', 'Computer Vision', 'Structural Variants',
        'Behavioral Analysis', 'DNA Sequencing', 'PyTorch', 'Transformers',
        'Autoencoder', 'Aging Research'
    ];

    function createTextTexture(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = 512;
        canvas.height = 128;
        
        context.fillStyle = 'rgba(30, 41, 59, 0.9)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.strokeStyle = '#38bdf8';
        context.lineWidth = 4;
        context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
        
        context.fillStyle = '#ffffff';
        context.font = 'bold 32px Inter, Arial, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        context.shadowColor = '#38bdf8';
        context.shadowBlur = 15;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    researchTerms.forEach((term, index) => {
        const texture = createTextTexture(term);
        const geometry = new THREE.PlaneGeometry(4.5, 1.2);
        const material = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const textBoard = new THREE.Mesh(geometry, material);
        
        textBoard.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 80
        );
        
        textBoard.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        textBoard.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.015,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: 0.0008 + Math.random() * 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: textBoard.position.y
        };
        
        textBoardGroup.add(textBoard);
    });

    scene.add(textBoardGroup);

    // Enhanced Floating Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
        
        const color = new THREE.Color();
        color.setHSL(0.55 + Math.random() * 0.15, 0.8, 0.4 + Math.random() * 0.4);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 3 + 0.5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation Loop
    const clock = new THREE.Clock();
    
    function animate() {
        const elapsedTime = clock.getElapsedTime();
        
        // Enhanced DNA animation
        dnaGroup.rotation.y = elapsedTime * 0.4;
        dnaGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15;
        dnaGroup.position.y = Math.sin(elapsedTime * 0.3) * 2;

        // Animate neural network nodes
        nodes.forEach(node => {
            const userData = node.userData;
            const pulse = Math.sin(elapsedTime * userData.pulseSpeed + userData.pulsePhase) * 0.4 + 1;
            node.scale.setScalar(userData.originalScale * pulse);
            node.position.y += Math.sin(elapsedTime * 0.5 + userData.pulsePhase) * 0.002;
        });
        
        // Animate artifacts
        protein.rotation.x = elapsedTime * 0.5;
        protein.rotation.y = elapsedTime * 0.3;
        protein.position.y += Math.sin(elapsedTime * 0.4) * 0.01;
        
        brain.rotation.x = elapsedTime * 0.25;
        brain.rotation.z = elapsedTime * 0.2;
        brain.position.y += Math.cos(elapsedTime * 0.35) * 0.015;
        
        // Animate other elements
        heatmapGroup.rotation.y = elapsedTime * 0.15;
        heatmapGroup.children.forEach((cube, index) => {
            cube.rotation.x = elapsedTime * (0.1 + index * 0.01);
        });
        
        moleculeGroup.rotation.y = elapsedTime * 0.3;
        moleculeGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        
        equipmentGroup.rotation.y = elapsedTime * 0.08;
        
        // Animate text boards
        textBoardGroup.children.forEach((board, index) => {
            const userData = board.userData;
            
            board.rotation.x += userData.rotationSpeed.x;
            board.rotation.y += userData.rotationSpeed.y;
            board.rotation.z += userData.rotationSpeed.z;
            
            board.position.y = userData.originalY + Math.sin(elapsedTime * userData.floatSpeed + userData.floatOffset) * 4;
            board.material.opacity = 0.5 + Math.sin(elapsedTime * 0.4 + index) * 0.3;
            
            board.position.x += Math.cos(elapsedTime * 0.08 + index) * 0.008;
            board.position.z += Math.sin(elapsedTime * 0.08 + index) * 0.008;
        });
        
        textBoardGroup.rotation.y = elapsedTime * 0.03;
        
        // Animate particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(elapsedTime + positions[i] * 0.008) * 0.003;
            positions[i] += Math.cos(elapsedTime + positions[i + 2] * 0.008) * 0.002;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = elapsedTime * 0.04;
        
        // Global rotations
        artifactsGroup.rotation.y = elapsedTime * 0.06;
        
        // Dynamic camera movement
        camera.position.x = Math.sin(elapsedTime * 0.08) * 3;
        camera.position.y = Math.cos(elapsedTime * 0.12) * 2;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}







// // Enhanced 3D Background with Research Artifacts
// // File: scripts/3d-background.js

// if (typeof THREE !== 'undefined') {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ 
//         canvas: document.querySelector('#bg-canvas'), 
//         alpha: true, 
//         antialias: true 
//     });

//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.position.z = 20;

//     // Enhanced Lighting Setup
//     const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
//     scene.add(ambientLight);
    
//     const directionalLight = new THREE.DirectionalLight(0x38bdf8, 2);
//     directionalLight.position.set(10, 10, 5);
//     scene.add(directionalLight);
    
//     const pointLight = new THREE.PointLight(0x0ea5e9, 1, 100);
//     pointLight.position.set(-10, -10, -5);
//     scene.add(pointLight);

//     // Neural Network Nodes
//     const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
//     const nodeMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x38bdf8, 
//         metalness: 0.8, 
//         roughness: 0.2,
//         emissive: 0x1e40af,
//         emissiveIntensity: 0.1
//     });

//     const nodes = [];
//     const connections = [];
    
//     // Create neural network structure
//     for (let layer = 0; layer < 5; layer++) {
//         const nodesInLayer = layer === 0 || layer === 4 ? 6 : 8;
//         for (let i = 0; i < nodesInLayer; i++) {
//             const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
//             node.position.x = (layer - 2) * 8;
//             node.position.y = (i - nodesInLayer/2) * 2;
//             node.position.z = (Math.random() - 0.5) * 4;
            
//             node.userData = { 
//                 originalScale: 1,
//                 pulsePhase: Math.random() * Math.PI * 2,
//                 pulseSpeed: 0.02 + Math.random() * 0.02
//             };
            
//             scene.add(node);
//             nodes.push(node);
//         }
//     }

//     // Create connections between layers
//     const connectionMaterial = new THREE.LineBasicMaterial({ 
//         color: 0x38bdf8, 
//         transparent: true, 
//         opacity: 0.3 
//     });

//     for (let layer = 0; layer < 4; layer++) {
//         const currentLayerNodes = nodes.filter(node => 
//             Math.abs(node.position.x - (layer - 2) * 8) < 1
//         );
//         const nextLayerNodes = nodes.filter(node => 
//             Math.abs(node.position.x - (layer + 1 - 2) * 8) < 1
//         );

//         currentLayerNodes.forEach(currentNode => {
//             nextLayerNodes.forEach(nextNode => {
//                 if (Math.random() > 0.3) {
//                     const geometry = new THREE.BufferGeometry().setFromPoints([
//                         currentNode.position,
//                         nextNode.position
//                     ]);
//                     const line = new THREE.Line(geometry, connectionMaterial);
//                     scene.add(line);
//                     connections.push(line);
//                 }
//             });
//         });
//     }

//     // DNA Double Helix
//     const dnaGroup = new THREE.Group();
//     const helixRadius = 2;
//     const helixHeight = 20;
//     const turns = 6;
    
//     const points1 = [];
//     const points2 = [];
    
//     for (let i = 0; i <= 200; i++) {
//         const t = (i / 200) * turns * Math.PI * 2;
//         const y = (i / 200) * helixHeight - helixHeight / 2;
        
//         points1.push(new THREE.Vector3(
//             Math.cos(t) * helixRadius,
//             y,
//             Math.sin(t) * helixRadius
//         ));
        
//         points2.push(new THREE.Vector3(
//             Math.cos(t + Math.PI) * helixRadius,
//             y,
//             Math.sin(t + Math.PI) * helixRadius
//         ));
//     }
    
//     const curve1 = new THREE.CatmullRomCurve3(points1);
//     const curve2 = new THREE.CatmullRomCurve3(points2);
    
//     const tubeGeometry1 = new THREE.TubeGeometry(curve1, 100, 0.08, 8, false);
//     const tubeGeometry2 = new THREE.TubeGeometry(curve2, 100, 0.08, 8, false);
    
//     const tubeMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x0ea5e9, 
//         metalness: 0.7, 
//         roughness: 0.3,
//         emissive: 0x0284c7,
//         emissiveIntensity: 0.05
//     });
    
//     const strand1 = new THREE.Mesh(tubeGeometry1, tubeMaterial);
//     const strand2 = new THREE.Mesh(tubeGeometry2, tubeMaterial);
    
//     dnaGroup.add(strand1, strand2);
    
//     // Add base pairs
//     const basePairMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x94a3b8, 
//         metalness: 0.5, 
//         roughness: 0.5 
//     });
    
//     for (let i = 0; i < points1.length; i += 15) {
//         const basePairGeometry = new THREE.CylinderGeometry(0.02, 0.02, helixRadius * 2, 8);
//         const basePair = new THREE.Mesh(basePairGeometry, basePairMaterial);
        
//         basePair.position.copy(points1[i]);
//         basePair.lookAt(points2[i]);
//         basePair.rotateZ(Math.PI / 2);
        
//         dnaGroup.add(basePair);
//     }
    
//     dnaGroup.position.x = -15;
//     scene.add(dnaGroup);

//     // Research Artifacts Group
//     const artifactsGroup = new THREE.Group();
    
//     // Protein Structure (icosahedron representing folded protein)
//     const proteinGeometry = new THREE.IcosahedronGeometry(1.5, 1);
//     const proteinMaterial = new THREE.MeshStandardMaterial({
//         color: 0x22d3ee,
//         metalness: 0.6,
//         roughness: 0.4,
//         wireframe: true
//     });
//     const protein = new THREE.Mesh(proteinGeometry, proteinMaterial);
//     protein.position.set(12, 8, -5);
//     artifactsGroup.add(protein);

//     // Brain Network (dodecahedron with connections)
//     const brainGeometry = new THREE.DodecahedronGeometry(1.2, 0);
//     const brainMaterial = new THREE.MeshStandardMaterial({
//         color: 0xf59e0b,
//         metalness: 0.5,
//         roughness: 0.3,
//         transparent: true,
//         opacity: 0.8
//     });
//     const brain = new THREE.Mesh(brainGeometry, brainMaterial);
//     brain.position.set(-12, -6, 8);
//     artifactsGroup.add(brain);

//     // Gene Expression Heatmap (grid of cubes)
//     const heatmapGroup = new THREE.Group();
//     const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 8; j++) {
//             const intensity = Math.random();
//             const color = new THREE.Color();
//             color.setHSL(0.7 - intensity * 0.7, 0.8, 0.3 + intensity * 0.4);
            
//             const cubeMaterial = new THREE.MeshStandardMaterial({ color });
//             const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            
//             cube.position.set(
//                 (i - 4) * 0.4,
//                 (j - 4) * 0.4,
//                 0
//             );
            
//             heatmapGroup.add(cube);
//         }
//     }
//     heatmapGroup.position.set(15, -5, 5);
//     heatmapGroup.scale.setScalar(0.8);
//     artifactsGroup.add(heatmapGroup);

//     // Molecular Bond Network
//     const moleculeGroup = new THREE.Group();
//     const atomGeometry = new THREE.SphereGeometry(0.2, 12, 12);
//     const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    
//     // Create atoms
//     const atomPositions = [
//         new THREE.Vector3(0, 0, 0),
//         new THREE.Vector3(1, 0.5, 0.5),
//         new THREE.Vector3(-1, 0.3, -0.2),
//         new THREE.Vector3(0.5, -1, 0.8),
//         new THREE.Vector3(-0.3, -0.8, -1)
//     ];
    
//     const atomColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0x6c5ce7];
    
//     atomPositions.forEach((pos, index) => {
//         const atomMaterial = new THREE.MeshStandardMaterial({ 
//             color: atomColors[index],
//             metalness: 0.3,
//             roughness: 0.7
//         });
//         const atom = new THREE.Mesh(atomGeometry, atomMaterial);
//         atom.position.copy(pos);
//         moleculeGroup.add(atom);
        
//         // Create bonds to other atoms
//         atomPositions.forEach((otherPos, otherIndex) => {
//             if (index < otherIndex && Math.random() > 0.4) {
//                 const bondMaterial = new THREE.MeshStandardMaterial({ 
//                     color: 0x94a3b8,
//                     metalness: 0.8,
//                     roughness: 0.2
//                 });
//                 const bond = new THREE.Mesh(bondGeometry, bondMaterial);
                
//                 const midPoint = pos.clone().add(otherPos).multiplyScalar(0.5);
//                 bond.position.copy(midPoint);
//                 bond.lookAt(otherPos);
//                 bond.rotateX(Math.PI / 2);
                
//                 const distance = pos.distanceTo(otherPos);
//                 bond.scale.y = distance;
                
//                 moleculeGroup.add(bond);
//             }
//         });
//     });
    
//     moleculeGroup.position.set(-8, 10, -8);
//     artifactsGroup.add(moleculeGroup);

//     // Research Paper Stack
//     const paperGroup = new THREE.Group();
//     const paperGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
//     const paperMaterials = [
//         new THREE.MeshStandardMaterial({ color: 0xf8fafc }),
//         new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }),
//         new THREE.MeshStandardMaterial({ color: 0xcbd5e1 })
//     ];
    
//     for (let i = 0; i < 6; i++) {
//         const paper = new THREE.Mesh(paperGeometry, paperMaterials[i % 3]);
//         paper.position.y = i * 0.12;
//         paper.rotation.y = (Math.random() - 0.5) * 0.2;
//         paperGroup.add(paper);
//     }
//     paperGroup.position.set(8, -8, -10);
//     artifactsGroup.add(paperGroup);

//     // MRI Scanner
//     const mriGroup = new THREE.Group();
//     const mriBodyGeometry = new THREE.CylinderGeometry(3, 3, 2, 16);
//     const mriBodyMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x475569,
//         metalness: 0.8,
//         roughness: 0.2
//     });
//     const mriBody = new THREE.Mesh(mriBodyGeometry, mriBodyMaterial);
    
//     const mriHoleGeometry = new THREE.CylinderGeometry(1.5, 1.5, 2.2, 16);
//     const mriHoleMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x1e293b,
//         metalness: 0.1,
//         roughness: 0.9
//     });
//     const mriHole = new THREE.Mesh(mriHoleGeometry, mriHoleMaterial);
    
//     mriGroup.add(mriBody, mriHole);
//     mriGroup.position.set(18, 2, -15);
//     mriGroup.rotation.z = Math.PI / 2;
//     artifactsGroup.add(mriGroup);

//     // Data Visualization Chart
//     const chartGroup = new THREE.Group();
//     const barGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
//     const chartColors = [0x3b82f6, 0x10b981, 0xf59e0b, 0xef4444, 0x8b5cf6];
    
//     for (let i = 0; i < 8; i++) {
//         const height = Math.random() * 3 + 0.5;
//         const barMaterial = new THREE.MeshStandardMaterial({ 
//             color: chartColors[i % chartColors.length],
//             metalness: 0.3,
//             roughness: 0.7
//         });
//         const bar = new THREE.Mesh(barGeometry, barMaterial);
//         bar.position.set(i * 0.5 - 2, height / 2, 0);
//         bar.scale.y = height;
//         chartGroup.add(bar);
//     }
//     chartGroup.position.set(-18, -3, 12);
//     artifactsGroup.add(chartGroup);

//     scene.add(artifactsGroup);

//     // Floating Data Particles
//     const particleGeometry = new THREE.BufferGeometry();
//     const particleCount = 2000;
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);
//     const sizes = new Float32Array(particleCount);
    
//     for (let i = 0; i < particleCount; i++) {
//         positions[i * 3] = (Math.random() - 0.5) * 100;
//         positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
//         positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        
//         // Color gradient from blue to cyan
//         const color = new THREE.Color();
//         color.setHSL(0.55 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
//         colors[i * 3] = color.r;
//         colors[i * 3 + 1] = color.g;
//         colors[i * 3 + 2] = color.b;
        
//         sizes[i] = Math.random() * 2 + 0.5;
//     }
    
//     particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
//     particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
//     const particleMaterial = new THREE.PointsMaterial({
//         size: 0.1,
//         vertexColors: true,
//         transparent: true,
//         opacity: 0.8,
//         sizeAttenuation: true
//     });
    
//     const particles = new THREE.Points(particleGeometry, particleMaterial);
//     scene.add(particles);

//     // Animation Loop
//     const clock = new THREE.Clock();
    
//     function animate() {
//         const elapsedTime = clock.getElapsedTime();
        
//         // Rotate DNA helix
//         dnaGroup.rotation.y = elapsedTime * 0.3;
//         dnaGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        
//         // Animate neural network nodes
//         nodes.forEach(node => {
//             const userData = node.userData;
//             const pulse = Math.sin(elapsedTime * userData.pulseSpeed + userData.pulsePhase) * 0.3 + 1;
//             node.scale.setScalar(userData.originalScale * pulse);
            
//             // Subtle floating motion
//             node.position.y += Math.sin(elapsedTime * 0.5 + userData.pulsePhase) * 0.002;
//         });
        
//         // Animate artifacts
//         protein.rotation.x = elapsedTime * 0.4;
//         protein.rotation.y = elapsedTime * 0.3;
        
//         brain.rotation.x = elapsedTime * 0.2;
//         brain.rotation.z = elapsedTime * 0.15;
        
//         heatmapGroup.rotation.y = elapsedTime * 0.1;
//         moleculeGroup.rotation.y = elapsedTime * 0.25;
//         paperGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.1;
        
//         mriGroup.children.forEach((child, index) => {
//             child.rotation.y = elapsedTime * (0.2 + index * 0.1);
//         });
        
//         chartGroup.children.forEach((bar, index) => {
//             const newHeight = Math.sin(elapsedTime * 0.5 + index) * 0.5 + 1.5;
//             bar.scale.y = newHeight;
//             bar.position.y = newHeight / 2;
//         });
        
//         // Animate particles
//         const positions = particles.geometry.attributes.position.array;
//         for (let i = 0; i < positions.length; i += 3) {
//             positions[i + 1] += Math.sin(elapsedTime + positions[i] * 0.01) * 0.002;
//             positions[i] += Math.cos(elapsedTime + positions[i + 2] * 0.01) * 0.001;
//         }
//         particles.geometry.attributes.position.needsUpdate = true;
        
//         // Rotate particles system
//         particles.rotation.y = elapsedTime * 0.05;
        
//         // Animate overall artifacts group
//         artifactsGroup.rotation.y = elapsedTime * 0.08;
        
//         // Camera subtle movement
//         camera.position.x = Math.sin(elapsedTime * 0.1) * 2;
//         camera.position.y = Math.cos(elapsedTime * 0.15) * 1;
//         camera.lookAt(0, 0, 0);
        
//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     }
    
//     animate();

//     // Handle window resize
//     window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     });
// }





















// if (typeof THREE !== 'undefined') {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas'), alpha: true, antialias: true });

//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.position.z = 15;

//     // --- Lighting ---
//     const ambientLight = new THREE.AmbientLight(0x404040, 2);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0x87CEEB, 1.5);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     // --- DNA Helix ---
//     const dnaGroup = new THREE.Group();
//     const points = [];
//     const radius = 1.5;
//     const height = 12;
//     const turns = 4;
//     for (let i = 0; i <= 128; i++) {
//         const t = (i / 128) * turns * Math.PI * 2;
//         points.push(new THREE.Vector3(Math.cos(t) * radius, i * (height / 128) - height / 2, Math.sin(t) * radius));
//     }
//     const curve1 = new THREE.CatmullRomCurve3(points);
//     const curve2 = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(-p.x, p.y, -p.z)));
    
//     const tubeGeo = new THREE.TubeGeometry(curve1, 64, 0.05, 8, false);
//     // Metallic, less bright material
//     const tubeMat = new THREE.MeshStandardMaterial({ color: 0x5a6a7a, metalness: 0.9, roughness: 0.4 });
//     const strand1 = new THREE.Mesh(tubeGeo, tubeMat);
//     const strand2 = new THREE.Mesh(new THREE.TubeGeometry(curve2, 64, 0.05, 8, false), tubeMat);
//     dnaGroup.add(strand1, strand2);

//     // Bridges
//     const bridgeGeo = new THREE.CylinderGeometry(0.03, 0.03, radius * 2, 8);
//     const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.6 });
//     for (let i = 0; i < 128; i += 10) {
//         const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
//         bridge.position.y = points[i].y;
//         bridge.lookAt(points[i]);
//         bridge.rotateY(Math.PI / 2);
//         dnaGroup.add(bridge);
//     }
//     dnaGroup.position.x = -10;
//     scene.add(dnaGroup);

//     // --- Floating Particles ---
//     const particlesGeo = new THREE.BufferGeometry();
//     const particlesCnt = 10000;
//     const posArray = new Float32Array(particlesCnt * 3);
//     for (let i = 0; i < particlesCnt * 3; i++) {
//         posArray[i] = (Math.random() - 0.5) * 50;
//     }
//     particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     const particlesMat = new THREE.PointsMaterial({ size: 0.015, color: 0x5a6a7a });
//     const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
//     scene.add(particlesMesh);

//     // --- Abstract Image Planes ---
//     const planeGroup = new THREE.Group();
//     const loader = new THREE.TextureLoader();
//     const textureUrls = [
//         'https://placehold.co/200x200/000000/FFFFFF?text=MRI+Scan',
//         'https://placehold.co/200x200/000000/FFFFFF?text=Genomic+Data',
//         'https://placehold.co/200x200/000000/FFFFFF?text=Cell+Structure'
//     ];
//     const textures = textureUrls.map(url => loader.load(url));

//     for (let i = 0; i < 15; i++) {
//         const planeGeo = new THREE.PlaneGeometry(2, 2);
//         const planeMat = new THREE.MeshBasicMaterial({ 
//             map: textures[i % textures.length],
//             transparent: true,
//             opacity: 0.1,
//             side: THREE.DoubleSide
//         });
//         const plane = new THREE.Mesh(planeGeo, planeMat);
//         plane.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
//         plane.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
//         planeGroup.add(plane);
//     }
//     scene.add(planeGroup);

//     // --- Animation Loop ---
//     const clock = new THREE.Clock();
//     const animate = () => {
//         const elapsedTime = clock.getElapsedTime();
//         dnaGroup.rotation.y = elapsedTime * 0.2;
//         particlesMesh.rotation.y = -elapsedTime * 0.05;
//         planeGroup.rotation.y += 0.001;
//         planeGroup.rotation.x += 0.0005;
//         renderer.render(scene, camera);
//         window.requestAnimationFrame(animate);
//     };
//     animate();

//     // --- Handle Window Resize ---
//     window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     });
// }
