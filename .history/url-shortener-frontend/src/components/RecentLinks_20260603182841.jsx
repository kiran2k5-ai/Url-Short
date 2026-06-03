import { Link, Copy, Edit, Trash2, BarChart3 } from "lucide-react";
import { useData } from "../context/DataContext";
import toast from "react-hot-toast";
import { useState } from "react";

function RecentLinks() {
    const { urls, deleteUrl, loading } = useData();
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const recentUrls = urls.slice(0, 5);

    const copyToClipboard = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        toast.success("Copied to clipboard");
    };

    const handleDelete = async (id) => {
        try {
            await deleteUrl(id);
            toast.success("URL deleted");
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to delete URL");
        }
    };

    const getStatus = (url) => {
        if (!url.expiryDate) return "ACTIVE";
        const isExpired = new Date(url.expiryDate) <= new Date();
        return isExpired ? "EXPIRED" : "ACTIVE";
    };

    const getStatusColor = (status) => {
        return status === "ACTIVE" 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700";
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold">Recent Links</h2>
                {urls.length > 0 && (
                    <Link href="/links" className="text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">
                        View all ({urls.length})
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-4">Original URL</th>
                            <th className="text-left py-4">Short URL</th>
                            <th className="text-left py-4">Clicks</th>
                            <th className="text-left py-4">Status</th>
                            <th className="text-left py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentUrls.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-16 text-gray-400">
                                    No links found. Create your first link to get started!
                                </td>
                            </tr>
                        ) : (
                            recentUrls.map((url) => (
                                <tr key={url._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-4 text-sm">
                                        <a 
                                            href={url.originalUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline truncate max-w-xs"
                                            title={url.originalUrl}
                                        >
                                            {url.originalUrl.length > 40 
                                                ? url.originalUrl.substring(0, 40) + "..." 
                                                : url.originalUrl}
                                        </a>
                                    </td>
                                    <td className="py-4 text-sm">
                                        <code className="bg-gray-100 px-3 py-1 rounded">
                                            {url.shortCode}
                                        </code>
                                    </td>
                                    <td className="py-4 font-semibold">{url.clickCount || 0}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getStatus(url))}`}>
                                            {getStatus(url)}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => copyToClipboard(url.shortUrl)}
                                                className="p-2 hover:bg-blue-100 text-blue-600 rounded transition"
                                                title="Copy"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-purple-100 text-purple-600 rounded transition"
                                                title="View Analytics"
                                            >
                                                <BarChart3 size={16} />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-yellow-100 text-yellow-600 rounded transition"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(url._id)}
                                                className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm">
                        <h3 className="font-semibold text-lg mb-2">Delete URL?</h3>
                        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecentLinks;