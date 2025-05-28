"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lỗi hệ thống - Healthcare System</title>
      </head>
      <body className="min-h-screen bg-white font-sans">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
              {/* Simple icon */}
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Error message */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-black">
                  Hệ thống gặp sự cố
                </h1>
                <p className="text-gray-800 leading-relaxed">
                  Hệ thống y tế đang gặp sự cố kỹ thuật. Chúng tôi đang khắc
                  phục vấn đề này để đảm bảo dịch vụ chăm sóc sức khỏe của bạn
                  không bị gián đoạn.
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  onClick={() => reset()}
                  className="w-full h-16 px-12 text-xl font-semibold bg-white text-black hover:text-white hover:bg-black  shadow-xl transform hover:scale-105 transition-all duration-200">
                  Thử lại
                </Button>
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/")}
                  className="w-full h-16 px-12 text-xl font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-xl transform hover:scale-105 transition-all duration-200">
                  Về trang chủ
                </Button>
              </div>

              {/* Error details for development */}
              {process.env.NODE_ENV === "development" && (
                <details className="text-left bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                  <summary className="cursor-pointer text-sm font-medium text-black mb-2">
                    Chi tiết lỗi (Development)
                  </summary>
                  <pre className="text-xs text-gray-800 overflow-auto bg-white rounded p-2 mt-2 border border-gray-200">
                    {error.message}
                    {error.digest && `\nDigest: ${error.digest}`}
                  </pre>
                </details>
              )}

              {/* Support information */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  Nếu sự cố tiếp tục xảy ra, vui lòng liên hệ bộ phận IT: <br />
                  <span className="font-medium text-black">
                    support@healthcare.vn
                  </span>{" "}
                  | <span className="font-medium text-black">1900-xxxx</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
          }
        `}</style>
      </body>
    </html>
  );
}
