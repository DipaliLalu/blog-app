"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useEncodedToken } from "@/hooks/useEncodedToken";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useEncodedToken();
    console.log(blogs)

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`/api/blog-list?userId=${user.user.id}`);
            console.log("Fetched blogs:", res.data.blogs);
            setBlogs(res.data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBlogs();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div className="flex flex-col space-y-3 w-full" key={i}>
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!blogs.length) {
        return <p className="text-gray-500 text-center">No blogs found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog._id}`}>
                    <div className="rounded-xl border p-4 shadow hover:shadow-md transition-all duration-300">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="rounded-md object-cover h-40 w-full mb-3"
                        />
                        <h2 className="text-lg font-bold mb-1">{blog.title}</h2>
                        <p className="text-sm text-gray-600 line-clamp-2">{blog.description}</p>
                        <div className="mt-2 text-xs text-gray-400">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
