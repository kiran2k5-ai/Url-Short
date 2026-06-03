function BulkUpload() {

    return (
        <div className="p-8">

            <h1 className="text-5xl font-bold">
                Bulk Upload
            </h1>

            <p className="text-gray-500 mt-2">
                Upload hundreds of URLs using CSV
            </p>

            <div className="mt-8 bg-white rounded-3xl shadow-lg p-10">

                <input
                    type="file"
                    accept=".csv"
                    className="block"
                />

                <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl">
                    Upload CSV
                </button>

            </div>

        </div>
    );
}

export default BulkUpload;