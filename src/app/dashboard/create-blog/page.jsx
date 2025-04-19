"use client"
import { useSearchParams } from "next/navigation";
import Form from "../components/form";
import useSWR from "swr";

export default function CreateBlog() {
    const fetcher = (url) => fetch(url).then(res => res.json());
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const { data, error, isLoading } = useSWR(
        id ? `/api/blog-list/${id}` : null,
        fetcher
    );
    return (
        <div className="p-10 flex flex-col gap-5">
            <div className="text-2xl font-bold">Create a Blog</div>
            <div className="flex gap-5 flex-col lg:flex-row">
                <div className="flex flex-col gap-3 w-full">
                    <div className="font-semibold">Details</div>
                    <div className="text-gray-600">Title,short description,image..</div>
                </div>
                <div className="w-full">
                    <Form currentValue={data}/>
                </div>
            </div>
        </div>
    )
}