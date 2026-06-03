import { useState } from "react";
import { Plus, Edit2, Trash2, Globe, Loader } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function Domains() {
    const [domains, setDomains] = useState([
        { id: 1, domain: "link.company.com", isDefault: true, status: "active", clicks: 1245 },
        { id: 2, domain: "short.company.com", isDefault: false, status: "active", clicks: 892 },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ domain: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.domain) {
            toast.error("Please enter a domain");
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (editingId) {
                setDomains(domains.map(d => d.id === editingId ? { ...d, domain: formData.domain } : d));
                toast.success("Domain updated successfully");
                setEditingId(null);
            } else {
                const newDomain = {
                    id: Date.now(),
                    domain: formData.domain,
                    isDefault: false,
                    status: "active",
                    clicks: 0
                };
                setDomains([...domains, newDomain]);
                toast.success("Domain added successfully");
            }
            setFormData({ domain: "" });
            setShowForm(false);
        } catch (err) {
            toast.error("Failed to save domain");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (domain) => {
        setEditingId(domain.id);
        setFormData({ domain: domain.domain });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (domains.find(d => d.id === id).isDefault) {
            toast.error("Cannot delete default domain");
            return;
        }
        setDomains(domains.filter(d => d.id !== id));
        toast.success("Domain deleted");
    };

    const handleSetDefault = (id) => {
        setDomains(domains.map(d => ({ ...d, isDefault: d.id === id })));
        toast.success("Default domain updated");
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8 max-w-5xl">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Custom Domains</h1>
                        <p className="text-sm md:text-base text-gray-600 mt-2">
                            Manage your custom domains for shortened URLs
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setFormData({ domain: "" });
                        }}
                        className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    >
                        <Plus size={18} />
                        Add Domain
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-2 border-indigo-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {editingId ? "Edit Domain" : "Add New Domain"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Domain Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., link.yourcompany.com"
                                    value={formData.domain}
                                    onChange={(e) => setFormData({ domain: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                                />
                                <p className="text-xs text-gray-500 mt-2">Make sure the domain is already pointed to our nameservers</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
                                >
                                    {loading ? <Loader className="animate-spin" size={18} /> : <Plus size={18} />}
                                    {loading ? "Saving..." : "Save Domain"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
                                        setFormData({ domain: "" });
                                    }}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {domains.length === 0 ? (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 text-center border-2 border-indigo-200">
                        <Globe className="mx-auto mb-4 text-indigo-600" size={48} />
                        <p className="text-lg font-semibold text-gray-900">No Custom Domains Yet</p>
                        <p className="text-gray-600 mt-2">Add your first custom domain to get started</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Plus size={18} />
                            Add First Domain
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {domains.map((domain) => (
                            <div
                                key={domain.id}
                                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600 hover:shadow-xl transition"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Globe className="text-indigo-600" size={24} />
                                            <h3 className="text-lg font-bold text-gray-900">{domain.domain}</h3>
                                            {domain.isDefault && (
                                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Default</span>
                                            )}
                                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                                domain.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                                {domain.status === "active" ? "✓ Active" : "⏳ Pending"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{domain.clicks.toLocaleString()} clicks</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {!domain.isDefault && (
                                            <button
                                                onClick={() => handleSetDefault(domain.id)}
                                                className="px-3 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleEdit(domain)}
                                            className="p-2.5 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition hover:scale-110"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(domain.id)}
                                            disabled={domain.isDefault}
                                            className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition hover:scale-110"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 bg-blue-50 border border-blue-300 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-900 mb-3">📚 How to Setup Custom Domain?</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                        <li>Add your domain in the form above</li>
                        <li>Update your domain's nameservers to point to our DNS servers</li>
                        <li>Wait for DNS propagation (24-48 hours)</li>
                        <li>We will automatically verify and activate your domain</li>
                    </ol>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Domains;