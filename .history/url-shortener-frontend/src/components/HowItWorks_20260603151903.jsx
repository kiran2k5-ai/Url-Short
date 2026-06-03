function HowItWorks() {

    const steps = [
        "Paste your long URL",
        "Generate a short link",
        "Share and track analytics"
    ];

    return (
        <section
            id="how"
            className="py-24"
        >
            <div className="max-w-6xl mx-auto px-6">

                <h2 className="text-5xl font-bold text-center">
                    How it works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mt-16">

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                                {index + 1}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                {step}
                            </h3>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default HowItWorks;