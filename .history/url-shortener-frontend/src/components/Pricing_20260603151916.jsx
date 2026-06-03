function Pricing() {

    return (
        <section
            id="pricing"
            className="py-24"
        >

            <div className="max-w-5xl mx-auto px-6 text-center">

                <h2 className="text-5xl font-bold">
                    Simple Pricing
                </h2>

                <div className="mt-16 bg-white border rounded-3xl p-12">

                    <h3 className="text-3xl font-bold">
                        Free Forever
                    </h3>

                    <p className="text-6xl font-bold mt-6">
                        ₹0
                    </p>

                    <ul className="mt-8 space-y-3 text-gray-600">
                        <li>Unlimited Short URLs</li>
                        <li>QR Code Generation</li>
                        <li>Analytics Dashboard</li>
                        <li>Bulk Upload</li>
                    </ul>

                </div>

            </div>

        </section>
    );
}

export default Pricing;