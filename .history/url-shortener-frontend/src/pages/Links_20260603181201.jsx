function Links() {
    return (
        <div className="p-8">

            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-5xl font-bold">
                        My Links
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage all your shortened URLs
                    </p>
                </div>

                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
                    + Create Link
                </button>

            </div>

            <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-4">
                                Original URL
                            </th>

                            <th className="text-left py-4">
                                Short URL
                            </th>

                            <th className="text-left py-4">
                                Clicks
                            </th>

                            <th className="text-left py-4">
                                Status
                            </th>

                            <th className="text-left py-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td
                                colSpan="5"
                                className="py-16 text-center text-gray-400"
                            >
                                No URLs Found
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Links;