import React, { useState, useCallback } from 'react';
import MetricsDisplay from './MetricsDisplay';
import FileUploader from './FileUploader';

import { compressText, decompressText} from './utils/compressionEngine'; 

const getByteLength = (str) => new TextEncoder().encode(str).length;

const CompressionTool = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [metrics, setMetrics] = useState({
        inputLength: 0,
        outputLength: 0,
        compressionRatio: 0,
        executionTime: 0,
        statusMessage: 'Aplicație gata. Așteaptă input...',
    });

    // ------------------ GESTIONAREA FIȘIERELOR -------------------

    const handleFileLoad = useCallback((content) => {
        setInputText(content);
        setMetrics(prev => ({ 
            ...prev, 
            inputLength: getByteLength(content),
            outputLength: 0,
            compressionRatio: 0,
            statusMessage: `Fișier încărcat (Input: ${getByteLength(content)} bytes). Gata de compresie.`,
        }));
        setOutputText('');
    }, []);

    // ------------------- HANDLERE OPERAȚII (Compresie/Decompresie) -------------------

    const handleProcess = useCallback((operation) => {
        const startTime = performance.now();
        const isCompressing = operation === 'compress';
        const inputData = isCompressing ? inputText : outputText;
        
        // Alege functia de rulat, bazata pe numele importate
        const processFunction = isCompressing ? compressText : decompressText; 

        if (!inputData) {
            setMetrics(prev => ({ ...prev, statusMessage: 'Eroare: Nu există text de procesat.' }));
            return;
        }

        setMetrics(prev => ({ 
            ...prev, 
            statusMessage: `${isCompressing ? 'Compresie' : 'Decompresie'} în curs...` 
        }));

        try {
            const processedOutput = processFunction(inputData);
            const endTime = performance.now();

            const newInputLength = getByteLength(inputData);
            const newOutputLength = getByteLength(processedOutput);
            
            const ratio = newInputLength > 0 
                ? (isCompressing ? (newOutputLength / newInputLength) : (newInputLength / newOutputLength))
                : 0;

            if (isCompressing) {
                setOutputText(processedOutput);
                setMetrics({
                    inputLength: newInputLength,
                    outputLength: newOutputLength,
                    compressionRatio: ratio,
                    executionTime: endTime - startTime,
                    statusMessage: 'Compresie reușită!',
                });
            } else {
                setInputText(processedOutput); // Textul decomprimat merge înapoi în Input
                setOutputText('');
                setMetrics({
                    inputLength: newOutputLength, 
                    outputLength: 0,
                    compressionRatio: ratio, 
                    executionTime: endTime - startTime,
                    statusMessage: 'Decompresie reușită!',
                });
            }

        } catch (error) {
            console.error("Eroare la procesare:", error);
            setMetrics(prev => ({
                ...prev,
                executionTime: performance.now() - startTime,
                statusMessage: `Eroare la procesare: ${error.message}`,
            }));
        }
    }, [inputText, outputText]);

    return (
        <div style={{ padding: '30px', fontFamily: 'Segoe UI, Arial, sans-serif', maxWidth: '1000px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Instrument Compresie (Mod Hard) 🗜️</h1>
            
            <FileUploader onFileLoad={handleFileLoad} />

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                
                {/* Zona de Input */}
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Text de Intrare (UTF-8 suportat):</label>
                    <textarea
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                            setMetrics(prev => ({ 
                                ...prev, 
                                inputLength: getByteLength(e.target.value),
                                outputLength: 0,
                                compressionRatio: 0,
                                statusMessage: 'Modificări în input...',
                            }));
                            setOutputText(''); 
                        }}
                        rows="15"
                        style={{ width: '100%', resize: 'vertical', border: '1px solid #ccc', padding: '10px' }}
                        placeholder="Introduceți textul aici sau încărcați un fișier. Suportă emojis și caractere speciale (măsurate în bytes)."
                    />
                </div>

                {/* Zona de Output (Read-only) */}
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Rezultat (Output Read-only):</label>
                    <textarea
                        value={outputText}
                        readOnly
                        rows="15"
                        style={{ width: '100%', resize: 'vertical', backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '10px' }}
                        placeholder="Rezultatul procesării (comprimat sau decomprimat) va apărea aici."
                    />
                </div>
            </div>

            {/* --- Secțiunea Butoane --- */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px' }}>
                <button 
                    onClick={() => handleProcess('compress')} 
                    disabled={!inputText}
                    style={{ padding: '12px 30px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }}
                >
                    **Comprimă**
                </button>
                <button 
                    onClick={() => handleProcess('decompress')} 
                    disabled={!outputText}
                    style={{ padding: '12px 30px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }}
                >
                    **Decomprimă**
                </button>
            </div>
            
            <MetricsDisplay metrics={metrics} />
        </div>
    );
};

export default CompressionTool;
