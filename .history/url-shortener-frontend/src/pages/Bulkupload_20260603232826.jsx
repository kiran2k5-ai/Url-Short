import { useState, useRef } from "react";
import { Upload, Check, AlertCircle, Loader, Download } from "lucide-react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function BulkUpload() {
    const { createUrl } = useData();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState(null);
    const fileInputRef = useRef(null);

    const downloadTemplate = () => {
        const template = "originalUrl,customAlias,expiryDays,expiryDate\nhttp://example.com,example-1,30,\nhttp://google.com,google-short,,2026-12-31\nhttp://github.com,github,,";
        const blob = new Blob([template], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bulk-upload-template.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("Template downloaded");
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
                toast.error("Please select a CSV file");
                return;
            }
            setFile(selectedFile);
            setResults(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a CSV file");
            return;
        }
        setUploading(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const csv = e.target?.result;
                const lines = csv.split("\n").filter(line => line.trim());
                
                // Parse header
                const header = lines[0].split(",").map(h => h.trim().toLowerCase());
                const urlIndex = header.indexOf("originalurl");
                const aliasIndex = header.indexOf("customalias");
                const daysIndex = header.indexOf("expirydays");
                const dateIndex = header.indexOf("expirydate");

                if (urlIndex === -1) {
                    toast.error("CSV must contain 'originalUrl' column");
                    setUploading(false);
                    return;
                }

                const uploadResults = { success: 0, failed: 0, errors: [] };

                // Process each row (skip header)
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(",").map(v => v.trim());
                    
                    if (!values[urlIndex]) continue; // Skip empty rows
                    
                    try {
                        const payload = {
                            originalUrl: values[urlIndex],
                        };

                        // Add optional fields if present
                        if (aliasIndex !== -1 && values[aliasIndex]) {
                            payload.customAlias = values[aliasIndex];
                        }

                        if (daysIndex !== -1 && values[daysIndex]) {
                            payload.expiryDays = parseInt(values[daysIndex]);
                        }

                        if (dateIndex !== -1 && values[dateIndex]) {
                            payload.expiryDate = values[dateIndex];
                        }

                        // Add delay to prevent rate limiting
                        await new Promise(resolve => setTimeout(resolve, 800));
                        
                        await createUrl(payload);
                        uploadResults.success++;
                    } catch (err) {
                        uploadResults.failed++;
                        uploadResults.errors.push({ 
                            row: i + 1, 
                            url: values[urlIndex], 
                            error: err.message || "Failed to create URL" 
                        });
                    }
                }

                setResults(uploadResults);
                if (uploadResults.success > 0) toast.success(`${uploadResults.success} URLs created successfully`);
                if (uploadResults.failed > 0) toast.error(`${uploadResults.failed} URLs failed`);
                setFile(null);
                fileInputRef.current.value = "";
            } catch (error) {
                toast.error("Error processing CSV file");
            }
            setUploading(false);
        };
        reader.readAsText(file);
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Bulk Upload URLs</h1>
                    <p className="text-sm md:text-base text-gray-600 mt-2">Upload multiple URLs at once using a CSV file</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-blue-900 mb-2">How it works</h3>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Download the CSV template</li>
                        <li>Fill in your URLs and optional custom codes</li>
                        <li>Upload the file to create all URLs at once</li>
                    </ol>
                </div>
                <button onClick={downloadTemplate} className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                    <Download size={18} />
                    Download Template
                </button>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-dashed border-indigo-300">
                    <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer text-center py-12">
                        <Upload className="mx-auto mb-4 text-indigo-600" size={48} />
                        <p className="text-lg font-semibold text-gray-900">Click or drag CSV file here</p>
                        <p className="text-gray-600 text-sm mt-2">Maximum file size: 10MB</p>
                        {file && <p className="text-green-600 font-medium mt-4">Selected: {file.name}</p>}
                    </div>
                    <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                </div>
                <div className="flex gap-3 mb-8">
                    <button onClick={handleUpload} disabled={!file || uploading} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition">
                        {uploading ? <Loader className="animate-spin" size={18} /> : <Upload size={18} />}
                        {uploading ? "Uploading..." : "Upload URLs"}
                    </button>
                    {file && (
                        <button onClick={() => { setFile(null); setResults(null); }} className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition">
                            Clear
                        </button>
                    )}
                </div>
                {results && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-600">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Results</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600 font-medium">Success</p>
                                <p className="text-3xl font-bold text-green-600">{results.success}</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">Failed</p>
                                <p className="text-3xl font-bold text-red-600">{results.failed}</p>
                            </div>
                        </div>
                        {results.errors.length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h4 className="font-semibold text-red-700 mb-3">Errors</h4>
                                {results.errors.map((err, idx) => (
                                    <div key={idx} className="text-sm text-red-600 py-1">
                                        Row {err.row}: {err.url} - {err.error}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default BulkUpload;