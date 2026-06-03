import {
    Link2,
    QrCode,
    BarChart3
} from "lucide-react";

function Features() {

    const features = [
        {
            icon: <Link2 size={30} />,
            title: "Custom Short Links",
            description:
                "Create branded and memorable URLs."
        },
        {
            icon: <QrCode size={30} />,
            title: "QR Code Generation",
            description:
                "Instant QR codes for every short URL."
        },
        {
            icon: <BarChart3 size={30} />,
            title: "Advanced Analytics",
            description:
                "Track clicks, browsers, devices and countries."
        }
    ];

    return (
        <section
            id="features"
            className="py-24 bg-slate-50"
        >
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-5xl font-bold text-center">
                    Everything you need
                </h2>

                <p className="text-center text-gray-500 mt-4">
                    Powerful tools to manage your links.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-16">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl shadow-sm"
                        >
                            <div className="text-indigo-600">
                                {feature.icon}
                            </div>

                            <h3 className="mt-5 text-2xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-gray-500">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Features;