

// 4. SafetyModuleCanvas (Vue AI avec intégration Gemini)
// Define the SafetyCanvasProps interface
interface SafetyCanvasProps {
    onSwitchToDefault: () => void;
}

const SafetyModuleCanvas: React.FC<SafetyCanvasProps> = ({ onSwitchToDefault }) => {
    const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ttsLoading, setTtsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const getBackgroundStyle = () => "bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px]";

    // --- Fonction d'Analyse de Sécurité (LLM + Grounding) ---
    const analyzeSafety = useCallback(async () => {
        setIsLoading(true);
        setAnalysisResults(null);
        setError(null);

        const systemPrompt = "Act as a highly experienced aerospace safety engineer and maintenance expert. Analyze the context of plane engine maintenance safety. Provide 3 highly critical and specific safety points or missing steps that should be included in the checklist for this type of task. The output must be a concise, bulleted list focusing on best practices. DO NOT use markdown formatting outside the bulleted list itself.";
        const userQuery = "Provide 3 critical safety considerations for modern commercial plane engine maintenance.";
        const apiKey = "" 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        let response: Response | null = null;
        let success = false;
        let maxRetries = 5;
        let delay = 1000;

        for (let i = 0; i < maxRetries; i++) {
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    success = true;
                    break;
                }
            } catch (e) {
                console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`, e);
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }

        setIsLoading(false);

        if (success && response) {
            try {
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";
                const sources = result.candidates?.[0]?.groundingMetadata?.groundingAttributions || [];
                
                setAnalysisResults({ text, sources });
            } catch (e) {
                console.error("Error parsing analysis response:", e);
                setError("Erreur : Impossible d'analyser la réponse de l'IA.");
            }
        } else {
            setError("Erreur : Impossible de contacter l'API d'analyse après plusieurs tentatives.");
        }
    }, []);

    // --- Fonction de Synthèse Vocale (TTS) ---
    const speakAnalysis = useCallback(async (textToSpeak: string) => {
        if (!textToSpeak) return;

        setTtsLoading(true);

        // Nettoyage de la chaîne pour le TTS (suppression des puces markdown)
        const cleanText = textToSpeak.replace(/[\*\-]/g, '').trim();

        const payload = {
            contents: [{
                parts: [{ text: cleanText }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Kore" }
                    }
                }
            },
            model: "gemini-2.5-flash-preview-tts"
        };
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

        let response: Response | null = null;
        let success = false;
        let maxRetries = 5;
        let delay = 1000;

        for (let i = 0; i < maxRetries; i++) {
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    success = true;
                    break;
                }
            } catch (e) {
                console.warn(`TTS attempt ${i + 1} failed. Retrying in ${delay}ms...`, e);
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }

        setTtsLoading(false);

        if (success && response) {
            try {
                const result = await response.json();
                const part = result?.candidates?.[0]?.content?.parts?.[0];
                const audioData = part?.inlineData?.data;
                const mimeType = part?.inlineData?.mimeType;

                if (audioData && mimeType && audioRef.current) {
                    // Extraction du sample rate du mimeType (ex: audio/L16;rate=24000)
                    const rateMatch = mimeType.match(/rate=(\d+)/);
                    const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000; 

                    const pcmData = base64ToArrayBuffer(audioData);
                    const pcm16 = new Int16Array(pcmData as ArrayBuffer);
                    const wavBlob = pcmToWav(pcm16, sampleRate);
                    const audioUrl = URL.createObjectURL(wavBlob);
                    
                    audioRef.current.src = audioUrl;
                    audioRef.current.play().catch(e => console.error("Error playing audio:", e));
                } else {
                    setError("Erreur : Données audio non disponibles ou non valides.");
                }
            } catch (e) {
                console.error("Error processing TTS response:", e);
                setError("Erreur : Impossible d'analyser la réponse TTS.");
            }
        } else {
            setError("Erreur : Impossible de générer la voix après plusieurs tentatives.");
        }
    }, []);

    // Composant pour afficher les résultats de l'analyse (flottant)
    const AnalysisPanel: React.FC = () => {
        return (
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-80 bg-slate-900/95 backdrop-blur-md border border-purple-600/50 rounded-xl p-4 shadow-2xl z-20">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
                    <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2 uppercase tracking-wider">
                        <Bot className="w-4 h-4" /> AI Safety Analysis
                    </h3>
                    <button onClick={() => setAnalysisResults(null)} className="p-1 rounded-full hover:bg-slate-800 text-slate-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center h-24 text-purple-400">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analysis in progress...
                    </div>
                )}
                
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {analysisResults && (
                    <>
                        <p className="text-xs text-slate-300 mb-3 whitespace-pre-line leading-relaxed">
                            {analysisResults.text}
                        </p>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                            <button
                                onClick={() => speakAnalysis(analysisResults.text)}
                                disabled={ttsLoading}
                                className={`px-3 py-1.5 text-xs rounded transition-colors flex items-center gap-1.5 ${
                                    ttsLoading
                                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        : 'bg-cyan-600 hover:bg-cyan-500 text-white font-semibold'
                                }`}
                            >
                                {ttsLoading ? (
                                    <>
                                        <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Playing...
                                    </>
                                ) : (
                                    <>
                                        <Volume2 className="w-4 h-4" />
                                        Read Aloud
                                    </>
                                )}
                            </button>
                            <span className="text-[10px] text-slate-500">
                                {analysisResults.sources.length} Grounded Sources
                            </span>
                        </div>
                    </>
                )}
            </div>
        );
    };


    return (
        <main className="flex-1 flex flex-col relative min-w-0 bg-[#080c14] overflow-hidden">
            <audio ref={audioRef} preload="auto" /> 
            
            {/* Top Toolbar (Floating) - 3D Controls */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-slate-800/80 backdrop-blur-xl rounded-xl p-1.5 flex space-x-1 border border-slate-700/50 shadow-2xl z-40">
                <button className="p-2.5 text-cyan-400 bg-cyan-500/10 rounded-lg shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] transition-colors border border-cyan-500/20" title="Move">
                    <Move className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:bg-slate-700/50 rounded-lg transition-colors" title="Rotate">
                    <RotateCw className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:bg-slate-700/50 rounded-lg transition-colors" title="Select">
                    <MousePointer2 className="h-5 w-5" />
                </button>
                <div className="w-px bg-slate-700 mx-1"></div>
                {/* Bouton pour basculer vers la vue Canvas (par défaut) */}
                <button 
                    onClick={onSwitchToDefault}
                    className="px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-red-700/50 rounded-lg transition-colors flex items-center gap-1.5 font-semibold text-xs" 
                    title="Exit AI Preview"
                >
                    Exit Preview
                    <ChevronLeft size={16} />
                </button>
            </div>

            {/* AI Preview Title (Haut de l'écran, centré) */}
            <div className="absolute top-24 w-full text-center z-30 pointer-events-none">
                <div className="inline-block bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 px-8 py-2.5 rounded-full shadow-2xl">
                    <span className="text-slate-300 text-base font-medium tracking-wide">
                        AI Preview: <span className="text-cyan-400 font-semibold">Plane Engine Maintenance Safety Module</span>
                    </span>
                </div>
            </div>

            {/* Espace 3D / Viewport */}
            <div className={`flex-1 relative grid place-items-center perspective-[1500px] overflow-hidden ${getBackgroundStyle()}`}>
                
                {/* Simuler un environnement de grille 3D */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-[#080c14] opacity-50 z-0"></div>

                {/* Conteneur principal de la scène */}
                {/* Animation: Keyframes pour la rotation lente des aubes */}
                <style>
                    {`
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        .animate-spin-slow {
                            animation: spin-slow 10s linear infinite;
                        }
                    `}
                </style>

                <div className="relative w-[800px] h-[500px] transform rotate-x-[60deg] -rotate-z-[12deg] translate-z-[-200px] scale-90">
                    
                    {/* 1. Simulation du Moteur (Objet central - fidèle à l'image) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {/* Structure du moteur (Utilisation de CSS pour l'aspect transparent/holographique) */}
                        <div className="relative w-[500px] h-[250px] [transform:rotateX(20deg)translateY(-50px)]">
                            {/* Moteur principal (Cylindre stylisé) - Transparence et contour Cyan */}
                            <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-[0_0_80px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(6,182,212,0.5)] transition-all duration-700 opacity-80">
                                {/* Zone d'interface orange (Danger/Interaction) - correspond à l'image */}
                                <div className="absolute top-1/4 left-[35%] w-[100px] h-[150px] bg-orange-600/30 border-2 border-orange-400/70 shadow-[0_0_20px_rgba(251,146,60,0.8)] rounded-lg"></div>
                                <div className="absolute top-1/4 right-[25%] w-[80px] h-[100px] bg-orange-600/30 border-2 border-orange-400/70 shadow-[0_0_20px_rgba(251,146,60,0.8)] rounded-lg"></div>
                            </div>
                            {/* Simulation des aubes de turbine (lignes) */}
                            <div className="absolute top-1/2 left-[15%] transform -translate-y-1/2 w-40 h-40 rounded-full border-4 border-cyan-300/50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_100%)] animate-spin-slow"></div>
                            <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 w-32 h-32 rounded-full border-4 border-cyan-300/50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_100%)]"></div>
                        </div>
                    </div>

                    {/* 2. Marqueurs de Danger (Floating UI) */}
                    {hazardMarkers.map((marker, index) => (
                        <div 
                            key={index} 
                            className="absolute p-2 rounded-lg text-center font-bold text-xs tracking-wider"
                            style={{ top: marker.top, left: marker.left, transform: `translate(-50%, -50%) rotateZ(${marker.rotation}deg)` }}
                        >
                            <div className="bg-orange-700/80 border border-orange-500 rounded-lg p-1.5 shadow-xl">
                                <AlertTriangle className="w-4 h-4 text-white mx-auto mb-1" />
                                <span className="text-white">{marker.text}</span>
                            </div>
                        </div>
                    ))}

                    {/* 3. Barrière de Sécurité (Simulée) */}
                    <div className="absolute w-[600px] h-[400px] border-4 border-yellow-400/70 [border-style:dashed] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 [transform:rotateX(90deg)translateZ(-100px)] pointer-events-none">
                        <div className="absolute inset-0 border-4 border-black [border-style:dashed] translate-x-1 translate-y-1 opacity-20"></div>
                        {/* Icône de danger au sol */}
                        <AlertTriangle className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-16 h-16 text-yellow-400 drop-shadow-[0_0_20px_rgba(252,211,77,0.8)]" />
                    </div>

                    {/* 4. Safety Checklist Panel (Flottant) */}
                    <div className="absolute top-[30%] right-[-10%] w-60 bg-slate-900/90 backdrop-blur-sm border border-cyan-700/50 rounded-xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)] z-10">
                        <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-2">
                            <span className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                                <Bot className="w-4 h-4" /> Safety Checklist
                            </span>
                            <X className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
                        </div>
                        <ul className="space-y-2">
                            {safetyChecklist.map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                    {item.checked ? (
                                        <CheckCircle2 className={`w-4 h-4 ${item.color}`} />
                                    ) : (
                                        <div className="w-4 h-4 border border-red-400 rounded-full flex items-center justify-center">
                                            <span className="text-[8px] text-red-400 font-bold">!</span>
                                        </div>
                                    )}
                                    <span className={item.checked ? "line-through opacity-70" : "font-medium"}>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 5. Tool Bar Flottante Gauche (Simulant les outils au sol) */}
                    <div className="absolute top-[20%] left-[10%] space-y-2">
                        {[Wrench, Hammer, Fan].map((Icon, index) => (
                            <div key={index} className="w-8 h-8 bg-slate-800/80 border border-slate-700 rounded-lg grid place-items-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                                <Icon className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Panneau d'Analyse IA (Nouveau) --- */}
                {!analysisResults && !isLoading ? (
                    <button
                        onClick={analyzeSafety}
                        disabled={isLoading}
                        className="absolute bottom-1/4 right-8 bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl transition-all flex items-center gap-2 z-20"
                    >
                        <Sparkles size={18} />
                        Lancer l'Analyse de Danger AI
                    </button>
                ) : (
                    <AnalysisPanel />
                )}
            </div>

            {/* Bottom Status Bar */}
            <div className="h-9 bg-[#0B1120] border-t border-slate-800 flex items-center px-6 text-[10px] font-medium text-slate-500 justify-between z-20">
                <div className="flex space-x-8 font-mono tracking-wider">
                    <span>X:12.5 Y:0.0 Z:-5.2</span>
                </div>
                <div className="font-mono tracking-wider">
                    <span>Grid: 1m</span>
                </div>
            </div>
        </main>
    );
};


// --- MAIN DEMO PAGE (Le composant qui gère l'état) ---

const DemoPage: React.FC = () => {
    // État pour la navigation latérale
    const [activeTab, setActiveTab] = useState<string>('modules');
    // État pour gérer la vue du canevas : 'default' (MockCanvas) ou 'v2' (SafetyModuleCanvas)
    const [canvasType, setCanvasType] = useState<string>('v2'); // Commencer directement en mode V2 pour correspondre à l'image

    // Fonction pour basculer vers le canevas par défaut
    const switchToDefaultCanvas = useCallback(() => {
        setCanvasType('default');
    }, []);

    // Fonction pour basculer vers le canevas V2 (SafetyModuleCanvas)
    const switchToV2Canvas = useCallback(() => {
        setCanvasType('v2');
    }, []);

    // Détermine le contenu central à afficher en fonction de l'onglet et du type de canevas
    let centralContent: React.ReactNode = null;
    let showInspector = false;

    if (activeTab === 'modules') {
        showInspector = true;
        if (canvasType === 'v2') {
            // Utilise le composant détaillé SafetyModuleCanvas
            centralContent = <SafetyModuleCanvas onSwitchToDefault={switchToDefaultCanvas} />;
        } else {
            // Utilise le mock simple
            centralContent = <MockCanvas onSwitchToV2={switchToV2Canvas} />;
        }
    } else {
        // Pour les autres onglets, afficher un simple placeholder
        centralContent = <div className="flex-1 grid place-items-center text-xl text-slate-500">View for {activeTab} (Placeholder)</div>;
        showInspector = false;
    }

    return (
        <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden font-sans">
            <MockSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {centralContent}

            {/* Passe la fonction de bascule à l'Inspector */}
            {showInspector && <MockInspector switchToV2={switchToV2Canvas} />}
        </div>
    );
}

export default DemoPage;