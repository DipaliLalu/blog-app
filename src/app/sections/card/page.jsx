
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Sample fetch function (replace with actual data fetching logic)
async function fetchData() {
  // Replace with your API call or database query
  return [
    {
      title: "Your call has been confirmed.",
      description: "Welcome to our blog! We share insightful articles on web development, design, and tech trends.",
    },
    {
      title: "You have a new message!",
      description: "Welcome to our blog! We share insightful articles on web development, design, and tech trends.",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "Welcome to our blog! We share insightful articles on web development, design, and tech trends.",
    },
  ];
}

export default async function CardDemo() {
  const data = await fetchData(); // Fetch data on the server side

  return (
    <>
      {data.map((item) => (
        <Card key={item.title} className="shadow-lg">
          <CardContent className="grid gap-4">
            <div>
              <Image
                src="/about-image.jpg"
                alt="About Us"
                width={440}
                height={500}
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="font-semibold text-xl">{item.title}</div>
            <div>{item.description}</div>
            <Link href="" className="bg-blue-500 text-white p-2 rounded-lg">
              Learn More
            </Link>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
