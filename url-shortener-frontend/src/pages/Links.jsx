import { useState } from "react";
import { Copy, Edit, Trash2, BarChart3, QrCode } from "lucide-react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateUrlModal from "../components/CreateUrlModal";
import EditUrlModal from "../components/EditUrlModal";
import QRPreviewModal from "../components/QRPreviewModal";
import toast from "react-hot-toast";

function Links() {
    const { urls, deleteUrl, loading, fetchAnalytics, analytics } = useData();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [viewAnalyticsId, setViewAnalyticsId] = useState(null);
    const [editingUrl, setEditingUrl] = useState(null);
    const [previewQrUrl, setPreviewQrUrl] = useState(null);

    const copyToClipboard = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        toast.success("Copied to clipboard");
    };

    const handleDelete = async (id) => {
        try {
            await deleteUrl(id);
            toast.success("URL deleted successfully");
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to delete URL");
        }
    };

    const handleViewAnalytics = async (urlId) => {
        try {
            await fetchAnalytics(urlId);
            setViewAnalyticsId(urlId);
        } catch (error) {
            toast.error("Failed to load analytics");
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

    const selectedUrlAnalytics = viewAnalyticsId ? analytics[viewAnalyticsId] : null;

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">My Links</h1>
                        <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                            Manage all your shortened URLs
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-sm md:text-base transition hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 w-full md:w-auto"
                        disabled={loading}
                    >
                        + Create Link
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 overflow-x-auto">
                    <table className="w-full min-w-max text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold">Original URL</th>
                                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold">Short URL</th>
                                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold">Clicks</th>
                                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold">Status</th>
                                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold">Created</th>
                                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {urls.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-12 md:py-16 text-center text-gray-400 text-sm"
                                    >
                                        No URLs found. Create your first link!
                                    </td>
                                </tr>
                            ) : (
                                urls.map((url) => (
                                    <tr key={url._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                                            <a
                                                href={url.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:underline truncate max-w-xs inline-block"
                                                title={url.originalUrl}
                                            >
                                                {url.originalUrl.length > 35
                                                    ? url.originalUrl.substring(0, 35) + "..."
                                                    : url.originalUrl}
                                            </a>
                                        </td>
                                        <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-mono">
                                            <code className="bg-gray-100 px-2 md:px-3 py-1 rounded text-xs">
                                                {url.shortCode}
                                            </code>
                                        </td>
                                        <td className="py-3 md:py-4 px-2 md:px-4 font-semibold text-xs md:text-sm">
                                            {url.clickCount || 0}
                                        </td>
                                        <td className="py-3 md:py-4 px-2 md:px-4">
                                            <span
                                                className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    getStatus(url)
                                                )}`}
                                            >
                                                {getStatus(url)}
                                            </span>
                                        </td>
                                        <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                                            {new Date(url.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 md:py-4 px-2 md:px-4">
                                            <div className="flex gap-1 md:gap-2">
                                                <button
                                                    onClick={() => copyToClipboard(url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`)}
                                                    className="p-1.5 md:p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition hover:scale-110 active:scale-95 hover:shadow-lg"
                                                    title="Copy URL"
                                                    aria-label="Copy URL"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setPreviewQrUrl(url)}
                                                    className="p-1.5 md:p-2 hover:bg-indigo-100 text-indigo-600 rounded-lg transition hover:scale-110 active:scale-95 hover:shadow-lg font-semibold"
                                                    title="View QR Code - Click to preview and download"
                                                    aria-label="View QR Code"
                                                >
                                                    <QrCode size={18} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                    onClick={() => handleViewAnalytics(url._id)}
                                                    className="p-1.5 md:p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition hover:scale-110 active:scale-95 hover:shadow-lg"
                                                    title="View Analytics"
                                                    aria-label="View Analytics"
                                                >
                                                    <BarChart3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setEditingUrl(url)}
                                                    className="p-1.5 md:p-2 hover:bg-yellow-100 text-yellow-600 rounded-lg transition hover:scale-110 active:scale-95 hover:shadow-lg"
                                                    title="Edit URL"
                                                    aria-label="Edit URL"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(url._id)}
                                                    className="p-1.5 md:p-2 hover:bg-red-100 text-red-600 rounded-lg transition hover:scale-110 active:scale-95 hover:shadow-lg"
                                                    title="Delete URL"
                                                    aria-label="Delete URL"
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

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm">
                            <h3 className="font-semibold text-lg mb-2">Delete URL?</h3>
                            <p className="text-gray-600 mb-6">This action cannot be undone and all analytics will be lost.</p>
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

                {/* Analytics Modal */}
                {selectedUrlAnalytics && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md max-h-96 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Analytics</h3>
                                <button
                                    onClick={() => setViewAnalyticsId(null)}
                                    className="text-gray-500 hover:text-black"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-600">Total Clicks</p>
                                    <p className="text-2xl font-bold">{selectedUrlAnalytics.totalClicks || 0}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Last Visited</p>
                                    <p className="text-sm">
                                        {selectedUrlAnalytics.lastVisited === "No visits yet"
                                            ? "No visits yet"
                                            : new Date(selectedUrlAnalytics.lastVisited).toLocaleString()}
                                    </p>
                                </div>
                                {selectedUrlAnalytics.recentVisits?.length > 0 && (
                                    <div>
                                        <p className="text-gray-600 mb-2">Recent Visits</p>
                                        <div className="space-y-2">
                                            {selectedUrlAnalytics.recentVisits.slice(0, 5).map((visit, idx) => (
                                                <div key={idx} className="text-sm border-l-2 border-indigo-200 pl-3">
                                                    <p className="font-medium">{visit.device} - {visit.browser}</p>
                                                    <p className="text-gray-500">{visit.country || "Unknown"}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {showCreateModal && (
                    <CreateUrlModal onClose={() => setShowCreateModal(false)} />
                )}

                {editingUrl && (
                    <EditUrlModal
                        url={editingUrl}
                        onClose={() => setEditingUrl(null)}
                        onSave={() => setEditingUrl(null)}
                    />
                )}

                {previewQrUrl && (
                    <QRPreviewModal
                        url={previewQrUrl}
                        onClose={() => setPreviewQrUrl(null)}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

export default Links;