import React from 'react';

const MetricsDisplay = ({ metrics }) => {
    const { inputLength, outputLength, compressionRatio, executionTime, statusMessage } = metrics;
    
    const statusColor = statusMessage.includes('reușită') ? 'green' : statusMessage.includes('Eroare') ? 'red' : 'black';
    let ratioStatus = '';
    
    if (compressionRatio > 0 && outputLength > 0) {
        if (compressionRatio < 1) {
            ratioStatus = ' (Compresie Reală)';
        } else if (compressionRatio > 1) {
            ratioStatus = ' (Expandare / Decompresie)';
        } else {
            ratioStatus = ' (Fără schimbare)';
        }
    }

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', marginTop: '20px' }}>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>📊 Metrici și Status</h3>
            <p>
                **Mesaj de Status:** <span style={{ fontWeight: 'bold', color: statusColor }}>
                    {statusMessage}
                </span>
            </p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '5px' }}>**Lungime Input (bytes):** **{inputLength}** (UTF-8)</li>
                <li style={{ marginBottom: '5px' }}>**Lungime Output (bytes):** **{outputLength}**</li>
                <li>
                    **Raport de Compresie (Output / Input):** **{compressionRatio.toFixed(4)}**
                    <span style={{ color: compressionRatio < 1 && compressionRatio > 0 ? 'green' : 'black', fontWeight: 'bold' }}>
                        {ratioStatus}
                    </span>
                </li>
                <li>**Timp de Execuție (ms):** **{executionTime.toFixed(3)}**</li>
            </ul>
        </div>
    );
};

export default MetricsDisplay;
