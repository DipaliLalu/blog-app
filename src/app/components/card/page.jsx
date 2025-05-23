import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const data = [
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
        description: " Welcome to our blog! We share insightful articles on web development, design, and tech trends.",
    },
]


export function CardDemo({ className, ...props }) {
    return (
        data.map((data)=>(

        <Card className="shadow-lg" key={data.title}>
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
                <div className="font-semibold text-xl">
                {data.title}
                </div>
                <div>
                    {data.description}
                </div>
                <Link href={''} className="bg-blue-500 text-white p-2 rounded-lg">Learn More</Link>
            </CardContent>
        </Card>
        ))
    )
}
