"use client"
import Form from "../components/form";

export default function CreateBlog() {
    return (
        <div className="p-10 flex flex-col gap-5">
            <div className="text-2xl font-bold">Create a Blog</div>
            <div className="flex gap-5 flex-col lg:flex-row">
                <div className="flex flex-col gap-3 w-full">
                    <div className="font-semibold">Details</div>
                    <div className="text-gray-600">Title,short description,image..</div>
                </div>
                <div className="w-full">
                    <Form/>
                </div>
            </div>
        </div>
    )
}