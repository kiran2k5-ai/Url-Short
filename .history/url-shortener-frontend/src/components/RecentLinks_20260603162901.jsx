function RecentLinks() {

    return (
        <div className="
bg-white
rounded-3xl
p-8
shadow-[0_8px_30px_rgba(0,0,0,0.06)]
">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-semibold">
                    Recent Links
                </h2>

                <button className="text-indigo-600 font-medium">
                    View all
                </button>

            </div>

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

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td
                            colSpan="4"
                            className="text-center py-16 text-gray-400"
                        >
                            No links found
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>
    );
}

export default RecentLinks;