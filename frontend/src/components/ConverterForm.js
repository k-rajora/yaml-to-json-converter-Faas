import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ConverterForm = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("y2j");

    // ---------------- FILE UPLOAD ----------------
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            setInput(ev.target.result);
        };
        reader.readAsText(file);
    };

    // ---------------- FILE DOWNLOAD ----------------
    const downloadOutput = () => {
        if (!output) return alert("Nothing to download!");

        const blob = new Blob([output], { type: "text/plain" });

        const ext = mode === "y2j" ? "json" : "yaml";

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `converted.${ext}`;
        link.click();
    };

    // ---------------- COPY OUTPUT ----------------
    const copyOutput = async () => {
        if (!output) return alert("Nothing to copy!");
        await navigator.clipboard.writeText(output);
        alert("Copied to clipboard!");
    };

    // ---------------- CONVERT ----------------
    const handleConvert = async () => {
        if (!input.trim()) {
            alert("Please enter or upload content");
            return;
        }
    
        const endpoint =
            mode === "y2j"
                ? `${API_BASE_URL}/convert/y2j`
                : `${API_BASE_URL}/convert/j2y`;
    
        try {
            const res = await axios.post(endpoint, { content: input });
            setOutput(res.data.converted);
        } catch (err) {
            console.error("Error:", err);
            alert("Conversion failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-5xl w-full bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-xl">
                
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    YAML ↔ JSON Converter
                </h1>

                {/* MODE SWITCH */}
                <div className="flex justify-center mb-6">
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
                    >
                        <option value="y2j">YAML ➝ JSON</option>
                        <option value="j2y">JSON ➝ YAML</option>
                    </select>
                </div>

                {/* FILE UPLOAD BUTTON */}
                <div className="flex justify-center mb-6">
                    <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow">
                        Upload File
                        <input
                            type="file"
                            accept=".yaml,.yml,.json,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* TEXTAREAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter or upload YAML/JSON..."
                        className="w-full h-80 p-4 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    <textarea
                        value={output}
                        readOnly
                        placeholder="Converted output..."
                        className="w-full h-80 p-4 rounded-lg bg-gray-900 text-gray-400 border border-gray-700"
                    ></textarea>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <button
                        onClick={handleConvert}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg shadow"
                    >
                        Convert
                    </button>

                    <button
                        onClick={copyOutput}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition text-white rounded-lg shadow"
                    >
                        Copy Output
                    </button>

                    <button
                        onClick={downloadOutput}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-lg shadow"
                    >
                        Download File
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConverterForm;
