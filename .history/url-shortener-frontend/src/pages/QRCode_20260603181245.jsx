function QRCode() {

    return (
        <div className="p-8">

            <h1 className="text-5xl font-bold">
                QR Codes
            </h1>

            <p className="text-gray-500 mt-2">
                Manage generated QR Codes
            </p>

            <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

                <div className="text-center text-gray-400 py-20">
                    No QR Codes Available
                </div>

            </div>

        </div>
    );
}

export default QRCode;