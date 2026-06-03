import { Link } from "react-router-dom";

function CTA() {

    return (
        <section className="py-24 bg-indigo-600 text-white">

            <div className="max-w-5xl mx-auto px-6 text-center">

                <h2 className="text-5xl font-bold">
                    Ready to get started?
                </h2>

                <p className="mt-6 text-xl text-indigo-100">
                    Create your first short URL today.
                </p>

                <Link
                    to="/signup"
                    className="inline-block mt-8 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold"
                >
                    Get Started Free
                </Link>

            </div>

        </section>
    );
}

export default CTA;