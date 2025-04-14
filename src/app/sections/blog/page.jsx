import CardDemo from "../card/page";


export default function BlogSection() {
    return (
      <section className="py-20 px-6 text-center flex flex-col justify-center items-center h-full">
        <div className="flex justify-center items-center flex-col gap-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Blog
          </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full justify-center md:p-14">
                <CardDemo />
            </div>
        </div>
      </section>
    );
  }
  