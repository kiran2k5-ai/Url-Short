function Testimonials() {

    return (
        <section className="py-24 bg-slate-50">

            <div className="max-w-6xl mx-auto px-6">

                <h2 className="text-5xl font-bold text-center">
                    Loved by teams
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mt-16">

                    <div className="bg-white p-8 rounded-3xl">
                        <p>
                            "The best URL shortener
                            we've ever used."
                        </p>

                        <h4 className="mt-5 font-semibold">
                            Sarah Johnson
                        </h4>
                    </div>

                    <div className="bg-white p-8 rounded-3xl">
                        <p>
                            "Analytics are incredible."
                        </p>

                        <h4 className="mt-5 font-semibold">
                            David Lee
                        </h4>
                    </div>

                    <div className="bg-white p-8 rounded-3xl">
                        <p>
                            "Perfect for marketing teams."
                        </p>

                        <h4 className="mt-5 font-semibold">
                            Michael Chen
                        </h4>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Testimonials;