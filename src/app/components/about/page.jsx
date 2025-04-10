import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 p-8">
      {/* Text Content */}
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-gray-500">
          Welcome to our blog! We share insightful articles on web development, design, and tech trends.
          Stay updated with our latest content and enhance your knowledge.
        </p>
      </div>

      {/* Image */}
      <div className="relative">
        <Image
          src="/about-image.jpg" 
          alt="About Us"
            width={440}
            height={500}
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
