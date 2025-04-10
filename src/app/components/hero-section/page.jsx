export default function HeroSection() {
    return (
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explore insightful articles, tips, and stories on web development, tech trends, and more!
          </p>
          <a
            href="#latest-posts"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Read Latest Posts
          </a>
        </div>
      </section>
    );
  }
  