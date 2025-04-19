"use client";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEncodedToken } from "@/hooks/useEncodedToken";
import BlogCard from "../components/blog-card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function BlogList() {
    const { user } = useEncodedToken();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const { data, error, isLoading, mutate } = useSWR(
        user ? `/api/blog-list?userId=${user.user.id}` : null,
        fetcher
    );

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 w-full">
                {[...Array(4)].map((_, i) => (
                    <div className="flex space-y-3 w-full" key={i}>
                        <div className="space-y-2 p-6">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                        <Skeleton className="w-full h-40 rounded-xl" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">Failed to load blogs.</p>;
    }

    if (!data?.blogs?.length) {
        return <p className="text-gray-500 text-center">No blogs found.</p>;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBlogs = data.blogs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.blogs.length / itemsPerPage);

    const renderPagination = () => (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-4 shadow-lg text-sm rounded-full border bg-white dark:bg-slate-800 dark:text-white hover:bg-gray-100 disabled:opacity-50"
            >
                <FaChevronLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 shadow-lg text-sm rounded-full border ${
                            isActive
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-white hover:bg-gray-100 dark:bg-slate-800 dark:text-white"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-4 shadow-lg text-sm rounded-full border bg-white dark:bg-slate-800 dark:text-white hover:bg-gray-100 disabled:opacity-50"
            >
               <FaChevronRight />
            </button>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-6 p-10 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {paginatedBlogs.map((blog) => (
                    <BlogCard key={blog._id} curEle={blog} mutate={mutate} />
                ))}
            </div>

            {renderPagination()}
        </div>
    );
}
