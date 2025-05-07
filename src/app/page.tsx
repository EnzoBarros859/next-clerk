import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to NextClerk
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              A modern Next.js application with secure authentication, beautiful UI, and powerful features.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to build a secure and modern web application
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-blue-600 text-2xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-500">
                Powered by Clerk, providing secure and easy-to-use authentication.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-blue-600 text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Performance</h3>
              <p className="text-gray-500">
                Built with Next.js for optimal performance and SEO.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-blue-600 text-2xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beautiful UI</h3>
              <p className="text-gray-500">
                Modern design with Tailwind CSS for a great user experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
