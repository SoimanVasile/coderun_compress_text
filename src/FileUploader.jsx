import React, { useState, useCallback } from 'react';

const FileUploader = ({ onFileLoad }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('Trageți și plasați un fișier text (.txt) aici, sau faceți click pentru a-l selecta.');

    const styles = {
        dropZone: {
            border: `2px ${isDragging ? 'solid' : 'dashed'} #007bff`,
            borderRadius: '5px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            backgroundColor: isDragging ? '#cce5ff' : '#e9f7ff',
            transition: 'background-color 0.2s, border-color 0.2s'
        }
    };

    const handleFile = useCallback((file) => {
        if (!file || !file.name.toLowerCase().endsWith('.txt')) {
            setStatus('Eroare: Vă rugăm să încărcați un fișier .txt valid.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            onFileLoad(e.target.result); // Trimite conținutul text către componenta părinte
            setStatus(`Fișier încărcat: ${file.name}`);
        };
        reader.onerror = () => {
            setStatus('Eroare la citirea fișierului.');
        };
        
        // Citirea ca text, crucial pentru suportul caracterelor speciale (UTF-8)
        reader.readAsText(file, 'UTF-8'); 
    }, [onFileLoad]);

    // Gestiunea Drag & Drop (previne comportamentul implicit al browserului)
    const handleDragEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = useCallback((e) => {
        handleDragEvent(e);
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, [handleFile]);

    const handleFileSelect = useCallback((e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    }, [handleFile]);

    return (
        <div 
            style={styles.dropZone}
            onDragOver={handleDragEvent}
            onDragEnter={(e) => {handleDragEvent(e); setIsDragging(true);}}
            onDragLeave={(e) => {handleDragEvent(e); setIsDragging(false);}}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload-input').click()}
        >
            <input
                type="file"
                id="file-upload-input"
                accept=".txt"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            <p>**Încărcare Fișier (Drag & Drop):** {status}</p>
        </div>
    );
};

export default FileUploader;
