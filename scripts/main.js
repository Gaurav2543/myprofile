document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons if the function exists
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Modal Logic for Publications (on index.html) ---
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    if (modalButtons.length > 0) {
        const closeButtons = document.querySelectorAll('.modal-close');

        modalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal-target');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                }
            });
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

    const elementsToAnimate = document.querySelectorAll('section, .timeline-item, .project-card, .leadership-card, .adventure-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-section');
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
        const userPrompt = promptInput.value.trim();
        if (!userPrompt) {
            resultDiv.innerHTML = `<p class="text-red-400">Please enter a description for your adventure.</p>`;
            return;
        }

        loadingIndicator.style.display = 'block';
        resultDiv.innerHTML = '';
        generateBtn.disabled = true;

        const fullPrompt = `As a creative travel planner, generate a concise and exciting adventure plan based on this user request: "${userPrompt}". Provide a title, a short description, 3-4 suggested locations, and 4-5 exciting activities.`;
        
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
                            "items": { "type": "STRING", "description": "A suggested location." }
                        },
                        "activities": {
                            "type": "ARRAY",
                            "items": { "type": "STRING", "description": "A suggested activity." }
                        }
                    },
                    required: ["title", "description", "locations", "activities"]
                }
            }
        };

        const apiKey = ""; // API key is handled by the environment
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
                throw new Error("Invalid response structure from API.");
            }

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            resultDiv.innerHTML = `<p class="text-red-400">Sorry, I couldn't generate an adventure right now. Please try again later.</p>`;
        } finally {
            loadingIndicator.style.display = 'none';
            generateBtn.disabled = false;
        }
    }

    function displayAdventure(data) {
        const locationsHTML = data.locations.map(loc => `<li>${loc}</li>`).join('');
        const activitiesHTML = data.activities.map(act => `<li>${act}</li>`).join('');

        resultDiv.innerHTML = `
            <div class="border border-slate-600 rounded-md p-6 mt-6">
                <h3 class="text-2xl font-bold text-amber-400 mb-2">${data.title}</h3>
                <p class="text-slate-300 mb-6">${data.description}</p>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold text-white mb-2">Suggested Locations:</h4>
                        <ul class="list-disc list-inside text-slate-400 space-y-1">${locationsHTML}</ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-white mb-2">Possible Activities:</h4>
                        <ul class="list-disc list-inside text-slate-400 space-y-1">${activitiesHTML}</ul>
                    </div>
                </div>
            </div>
        `;
    }
});

// Add this CSS to your main.css for the fade-in effect
const style = document.createElement('style');
style.innerHTML = `
.fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);
