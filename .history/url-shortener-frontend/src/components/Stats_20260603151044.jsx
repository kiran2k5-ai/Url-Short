function Stats() {

    const stats = [
        ["2.4B+", "Links shortened"],
        ["50K+", "Active users"],
        ["180+", "Countries tracked"],
        ["99.9%", "Uptime SLA"]
    ];

    return (
        <section className="border-y py-16">

            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">

                {stats.map((item, index) => (
                    <div key={index}>
                        <h2 className="text-5xl font-bold">
                            {item[0]}
                        </h2>

                        <p className="mt-3 text-gray-500">
                            {item[1]}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}

export default Stats;