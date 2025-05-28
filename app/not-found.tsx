import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Large 404 */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-gray-300 select-none">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Return home button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return Home
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-sm text-gray-500 pt-4">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
