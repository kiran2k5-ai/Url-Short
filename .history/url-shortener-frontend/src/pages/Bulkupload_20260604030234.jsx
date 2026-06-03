import { useState, useRef } from "react";
import { Upload, Download, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useData } from "../context/DataContext";
import toast from "react-hot-toast";

function BulkUpload() {
    const { createUrl } = useData();
    const fileInputRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadResults, setUploadResults] = useState(null);

    // CSV Template
    const downloadTemplate = () => {
        const template = `originalUrl,customAlias,expiryDays,expiryDate
https://www.wikipedia.org,wiki,7,
https://www.stackoverflow.com,stackoverflow,30,
https://www.python.org,,1,
https://www.mozilla.org,mozilla,,2026-07-01
https://www.oracle.com/java,java-docs,15,
https://react.dev,react,,2026-08-15
https://nodejs.org,nodejs-link,10,
https://www.mongodb.com,mongodb,,2026-09-01`;

        const blob = new Blob([template], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bulk-upload-template.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Template downloaded");
    };

    // Parse CSV file
    const parseCSV = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const csv = e.target.result;
                    const lines = csv
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => line);

                    if (lines.length < 2) {
                        reject(new Error("CSV must contain at least a header and one data row"));
                    }

                    // Parse header
                    const header = lines[0]
                        .split(",")
                        .map((h) => h.trim().toLowerCase());

                    const urlIndex = header.indexOf("originalurl");
                    const aliasIndex = header.indexOf("customalias");
                    const expiryDaysIndex = header.indexOf("expirydays");
                    const expiryDateIndex = header.indexOf("expirydate");

                    if (urlIndex === -1) {
                        reject(new Error('CSV must contain "originalUrl" column'));
                    }

                    // Parse rows
                    const rows = [];
                    for (let i = 1; i < lines.length; i++) {
                        const parts = lines[i].split(",").map((p) => p.trim());

                        if (!parts[urlIndex]) continue; // Skip empty rows

                        rows.push({
                            originalUrl: parts[urlIndex],
                            customAlias: parts[aliasIndex] || undefined,
                            expiryDays: parts[expiryDaysIndex]
                                ? parseInt(parts[expiryDaysIndex])
                                : undefined,
                            expiryDate: parts[expiryDateIndex] || undefined,
                        });
                    }

                    if (rows.length === 0) {
                        reject(new Error("No valid URLs found in CSV"));
                    }

                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsText(file);
        });
    };

    // Process bulk upload
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            toast.error("Please select a CSV file");
            return;
        }

        setIsProcessing(true);
        setUploadResults(null);

        try {
            const rows = await parseCSV(file);
            const results = {
                success: 0,
                failed: 0,
                total: rows.length,
                errors: [],
                successList: [],
            };

            // Process each row
            for (let i = 0; i < rows.length; i++) {
                try {
                    const result = await createUrl({
                        originalUrl: rows[i].originalUrl,
                        customAlias: rows[i].customAlias,
                        expiryDays: rows[i].expiryDays,
                        expiryDate: rows[i].expiryDate,
                    });

                    results.success++;
                    results.successList.push({
                        shortCode: result.data?.shortCode || result.data?.customAlias,
                        originalUrl: rows[i].originalUrl,
                    });

                    toast.success(`Created: ${result.data?.shortCode || "Link"}`);
                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        row: i + 2, // +2 because of header row and 0-indexing
                        url: rows[i].originalUrl,
                        error: error.message || "Failed to create URL",
                    });
                    console.error(`Row ${i + 2} error:`, error);
                }
            }

            setUploadResults(results);
        } catch (error) {
            toast.error(error.message || "Failed to parse CSV file");
        } finally {
            setIsProcessing(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">Bulk Upload</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                        Upload hundreds of URLs at once using CSV file
                    </p>
                </div>

                {/* Info Box */}
                <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 md:p-6">
                    <div className="flex gap-3">
                        <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-2">CSV Format Required</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Column 1: <strong>Original URL</strong> (required)</li>
                                <li>• Column 2: <strong>Custom Code</strong> (optional)</li>
                                <li>• Column 3: <strong>Expiry Days</strong> (optional, default: 30)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Upload Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-3 border-dashed border-indigo-300 rounded-2xl p-8 md:p-12 text-center bg-indigo-50 cursor-pointer hover:bg-indigo-100 transition"
                        >
                            <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-900 mb-2">
                                Click to upload CSV file
                            </p>
                            <p className="text-sm text-gray-600">
                                or drag and drop
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                disabled={isProcessing}
                                className="hidden"
                            />
                        </div>

                        {/* Processing State */}
                        {isProcessing && (
                            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <div className="flex items-center gap-3">
                                    <div className="animate-spin">
                                        <div className="w-5 h-5 border-4 border-yellow-200 border-t-yellow-600 rounded-full"></div>
                                    </div>
                                    <p className="text-yellow-800">Processing file...</p>
                                </div>
                            </div>
                        )}

                        {/* Results Summary */}
                        {uploadResults && !isProcessing && (
                            <div className="mt-6 space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                        <div className="text-2xl font-bold text-green-600">
                                            {uploadResults.success}
                                        </div>
                                        <p className="text-sm text-green-700 mt-1">Successful</p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                        <div className="text-2xl font-bold text-red-600">
                                            {uploadResults.failed}
                                        </div>
                                        <p className="text-sm text-red-700 mt-1">Failed</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {uploadResults.total}
                                        </div>
                                        <p className="text-sm text-blue-700 mt-1">Total</p>
                                    </div>
                                </div>

                                {/* Successful URLs */}
                                {uploadResults.successList.length > 0 && (
                                    <div className="bg-white border border-green-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                                            <CheckCircle size={18} />
                                            Successfully Created ({uploadResults.success})
                                        </h4>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {uploadResults.successList.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-green-50 p-3 rounded text-sm border-l-4 border-green-500"
                                                >
                                                    <p className="font-mono font-semibold text-green-700">
                                                        {item.shortCode}
                                                    </p>
                                                    <p className="text-xs text-green-600 truncate">
                                                        {item.originalUrl}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Errors */}
                                {uploadResults.errors.length > 0 && (
                                    <div className="bg-white border border-red-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                                            <XCircle size={18} />
                                            Errors ({uploadResults.failed})
                                        </h4>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {uploadResults.errors.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-red-50 p-3 rounded text-sm border-l-4 border-red-500"
                                                >
                                                    <p className="font-semibold text-red-700">
                                                        Row {item.row}: {item.error}
                                                    </p>
                                                    <p className="text-xs text-red-600 truncate">
                                                        {item.url}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>

                            <button
                                onClick={downloadTemplate}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-lg transition mb-4"
                            >
                                <Download size={18} />
                                Download Template
                            </button>

                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-semibold text-sm mb-3">Example CSV</h4>
                                <div className="bg-gray-50 rounded p-3 text-xs font-mono text-gray-700 space-y-1">
                                    <p>Original URL,Custom,Days</p>
                                    <p className="text-gray-500">https://example.com</p>
                                    <p className="text-gray-500">https://github.com,github</p>
                                    <p className="text-gray-500">https://youtube.com,,60</p>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-semibold text-sm mb-2">Tips</h4>
                                <ul className="text-xs text-gray-600 space-y-2">
                                    <li>✓ Max 100 URLs per file</li>
                                    <li>✓ Use valid URLs</li>
                                    <li>✓ Codes must be unique</li>
                                    <li>✓ No header row needed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default BulkUpload;