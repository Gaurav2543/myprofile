document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons if the function exists
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Modal Logic for Publications (on index.html) ---
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    if (modalButtons.length > 0) {
        const closeButtons = document.querySelectorAll('.modal-close');

        modalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.remove('hidden');
                }
            });
        });
    
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    
        // Close modal when clicking outside
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    modal.classList.add('hidden');
                });
            }
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal-container');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-container')) {
                event.target.style.display = 'none';
            }
        });
    }

    // --- Intersection Observer for fade-in animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.fade-in-section');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- Gemini AI Adventure Planner (on life.html) ---
    const generateBtn = document.getElementById('generate-adventure-btn');
    const promptInput = document.getElementById('adventure-prompt');
    const resultDiv = document.getElementById('adventure-result');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (generateBtn && promptInput && resultDiv && loadingIndicator) {
        generateBtn.addEventListener('click', generateAdventure);
    }

    async function generateAdventure() {
        // IMPORTANT: PASTE YOUR GOOGLE AI STUDIO API KEY HERE
        const apiKey = "AIzaSyDPFUIMuOmSHOthQ6c5Wafel7CLluSLAB4"; 

        const userPrompt = promptInput.value.trim();
        if (!userPrompt) {
            resultDiv.innerHTML = `<p class="text-red-400">Please enter a description for your adventure.</p>`;
            return;
        }
        
        if (apiKey === "YOUR_API_KEY_HERE") {
            resultDiv.innerHTML = `<p class="text-red-400">Please add your Google AI Studio API key to the scripts/main.js file to enable this feature.</p>`;
            return;
        }

        loadingIndicator.style.display = 'flex';
        resultDiv.innerHTML = '';
        generateBtn.disabled = true;
        generateBtn.classList.add('cursor-not-allowed');

        const fullPrompt = `You are an expert travel planner specializing in adventure. A user wants ideas for a trip. Based on their request, create a plan.
        User Request: "${userPrompt}"
        Your response should be a creative and exciting plan.`;
        
        const chatHistory = [{ role: "user", parts: [{ text: fullPrompt }] }];

        const payload = {
            contents: chatHistory,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "title": { "type": "STRING", "description": "An exciting title for the adventure." },
                        "description": { "type": "STRING", "description": "A brief, engaging summary of the trip." },
                        "locations": {
                            "type": "ARRAY",
                            "items": { "type": "STRING" },
                            "description": "An array of 3-4 suggested countries or specific regions."
                        },
                        "activities": {
                            "type": "ARRAY",
                            "items": { "type": "STRING" },
                            "description": "An array of 4-5 exciting activities related to the theme."
                        }
                    },
                    required: ["title", "description", "locations", "activities"]
                }
            }
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                
                const jsonText = result.candidates[0].content.parts[0].text;
                const adventureData = JSON.parse(jsonText);
                displayAdventure(adventureData);

            } else {
                console.error("Invalid response from API:", result);
                throw new Error("Invalid response structure from API.");
            }

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            resultDiv.innerHTML = `<p class="text-red-400">Sorry, I couldn't generate an adventure right now. Please try again later.</p>`;
        } finally {
            loadingIndicator.style.display = 'none';
            generateBtn.disabled = false;
            generateBtn.classList.remove('cursor-not-allowed');
        }
    }

    function displayAdventure(data) {
        const locationsHTML = data.locations.map(loc => `<li><i data-lucide="map-pin" class="inline-block w-4 h-4 mr-2 text-amber-400"></i>${loc}</li>`).join('');
        const activitiesHTML = data.activities.map(act => `<li><i data-lucide="check" class="inline-block w-4 h-4 mr-2 text-amber-400"></i>${act}</li>`).join('');

        resultDiv.innerHTML = `
            <div class="border border-slate-600 rounded-lg p-6 mt-6 text-left animate-fade-in">
                <h3 class="text-2xl font-bold text-amber-300 mb-2">${data.title}</h3>
                <p class="text-slate-300 mb-6">${data.description}</p>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold text-white mb-2">Suggested Destinations:</h4>
                        <ul class="space-y-2">${locationsHTML}</ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-white mb-2">Adventure Checklist:</h4>
                        <ul class="space-y-2">${activitiesHTML}</ul>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons(); // Re-initialize icons for the newly added HTML
    }
});
