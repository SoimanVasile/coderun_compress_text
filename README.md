🗜️ Run-Length Text Compressor (CodeRun Edition)

Built for the CodeRun IT Marathon. A lossless text compression tool capable of handling standard ASCII, Unicode symbols, Emojis, and Asian characters efficiently.

📖 About The Project

This project is a web-based compression tool that implements a variation of the Run-Length Encoding (RLE) algorithm. Unlike basic string manipulators, our engine is designed to handle UTF-8 multi-byte characters correctly.

Most JavaScript string methods fail when splitting Emojis (surrogate pairs), but this tool uses iterator-based splitting to ensure that characters like "🔥" or "文" are treated as single units, preventing data corruption during compression.

Key Features

📉 Lossless Compression: Reduces file size for repetitive text sequences.

🌏 Unicode Support: Fully supports Japanese/Chinese characters and Emojis (e.g., 🚀, 🤣).

📊 Real-Time Metrics: Calculates Compression Ratio, Input/Output byte size, and Execution time in milliseconds.

📂 File Handling: Drag-and-drop support for .txt files.

⚡ Performance: Uses TextEncoder for accurate byte-level measurement.

⚙️ How It Works (The Algorithm)

The core logic resides in src/utils/compressionEngine.js.

Compression Logic

We iterate through the string and count consecutive identical characters. The output format is [Character][Count];.

Example:

Input: aaabbbcccc

Process:

Found 3 'a's

Found 3 'b's

Found 4 'c's

Output: a3;b3;c4;

The "Emoji" Challenge

In standard JavaScript, string.length returns the number of UTF-16 code units, not visual characters. An emoji like "😀" is actually 2 code units.

Bad approach: string.split('') breaks emojis into garbage characters.

Our approach: We use the Spread Operator [...raw_text]. This utilizes the string's iterator to correctly split by Code Points, keeping emojis intact.

🚀 Getting Started

Follow these steps to run the project locally.

Prerequisites

Node.js installed on your machine.

npm (Node Package Manager).

Installation

Clone the repository

git clone [https://github.com/your-username/coderun-compressor.git](https://github.com/your-username/coderun-compressor.git)


Navigate to project folder

cd coderun-compressor


Install dependencies

npm install


Run the application

npm start


The app will open in your browser at http://localhost:3000.

📸 Usage

Input: Type text into the left box OR drag & drop a .txt file.

Compress: Click the green Comprimă button.

Analyze: Check the "Metrici și Status" box to see how much space you saved.

Decompress: Click Decomprimă to restore the original text from the compressed output.

📂 Project Structure

src/
├── utils/
│   └── compressionEngine.js  # Core RLE Algorithm (Compress/Decompress)
├── CompressionTool.jsx       # Main Application Controller
├── FileUploader.jsx          # Drag & Drop Component
├── MetricsDisplay.jsx        # Stats Visualization
├── App.js                    # Root Component
└── index.js                  # Entry Point


👥 The Team

Built with 💻 and ☕ for CodeRun.

Soiman Vasile-Cristian - Frontend & Logic

Aerinei Ionut and Gramada Nicolae - Algorithm Optimization

