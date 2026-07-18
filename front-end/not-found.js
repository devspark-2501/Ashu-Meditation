export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-200 text-center px-4">
            <h1 className="text-8xl font-bold text-sky-400">404</h1>
            <h2 className="text-3xl mt-4">Page Not Found</h2>
            <p className="text-slate-400 mt-2 mb-6">
                The page you’re looking for doesn’t exist or was moved.
            </p>

            <a
                href="/"
                className="px-5 py-2 bg-sky-400 text-slate-900 rounded-lg font-semibold hover:bg-sky-300 transition"
            >
                Go Home
            </a>
        </div>
    );
}