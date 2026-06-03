import { useState } from "react";
import { Plus, Edit2, Trash2, Globe, Shield, Clock } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function Domains() {
    const [domains, setDomains] = useState([
        {
            id: 1,
            domain: "link.example.com",
            status: "active",
            createdAt: "2026-05-15",
            links: 45,
            ssl: true,
        },
        {
            id: 2,
            domain: "short.example.com",
            status: "active",
            createdAt: "2026-04-20",
            links: 128,
            ssl: true,
        },
        {
            id: 3,
            domain: "custom.example.com",
            status: "pending",
            createdAt: "2026-06-01",
            links: 0,
            ssl: false,
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newDomain, setNewDomain] = useState("");

    const handleAddDomain = () => {
        if (!newDomain) {
            toast.error("Please enter a domain");
            return;
        }

        const domain = {
            id: domains.length + 1,
            domain: newDomain,
            status: "pending",
            createdAt: new Date().toISOString().split("T")[0],
            links: 0,
            ssl: false,
        };

        setDomains([...domains, domain]);
        setNewDomain("");
        setShowAddModal(false);
        toast.success("Domain added successfully");
    };

    const handleDeleteDomain = (id) => {
        setDomains(domains.filter((d) => d.id !== id));
        toast.success("Domain deleted");
    };

    return (
        <DashboardLayout>
            <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                                Domains
                            </h1>
                            <p className="text-gray-600 mt-2">Manage your custom domains</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            <Plus size={20} />
                            Add Domain
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Domains</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{domains.length}</p>
                            </div>
                            <Globe className="text-indigo-600" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Active Domains</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {domains.filter((d) => d.status === "active").length}
                                </p>
                            </div>
                            <Shield className="text-green-600" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Links</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {domains.reduce((sum, d) => sum + d.links, 0)}
                                </p>
                            </div>
                            <Clock className="text-orange-600" size={32} />
                        </div>
                    </div>
                </div>

                {/* Domains Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-gray-100 bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Domain</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Links</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">SSL</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Created</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.map((domain) => (
                                <tr key={domain.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{domain.domain}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                domain.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{domain.links}</td>
                                    <td className="px-6 py-4">
                                        {domain.ssl ? (
                                            <Shield size={18} className="text-green-600" />
                                        ) : (
                                            <Shield size={18} className="text-gray-300" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{domain.createdAt}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                                <Edit2 size={18} className="text-indigo-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDomain(domain.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <Trash2 size={18} className="text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Domain Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Domain</h2>
                            <input
                                type="text"
                                placeholder="example.com"
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddDomain}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Add Domain
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Domains;
