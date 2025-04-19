"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./file-uploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TagList from "./tag-list";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor from "./TiptapEditor";
import { formSchema } from "@/schema/dashboard/formSchema";
import { endPoints } from "@/utils/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Form({ currentValue }) {
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const defaultValue = {
        _id: currentValue?._id || "",
        title: currentValue?.title || "",
        description: currentValue?.description || "",
        image: currentValue?.image || "",
        content: currentValue?.content || "",
        taglist: currentValue?.taglist || [],
    };

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue,
    });

    useEffect(() => {
        if (currentValue) {
            reset(defaultValue);
        }
    }, [currentValue]);

    const image = watch("image");

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const url = endPoints.dashboard.blogForm;
            const response = await axios.post(url, data);
            if(response.status===401){
                route.push('/login')
            }
            if (response.data.success === "update") { 
                route.push('/dashboard/list')
            }
            reset();
            setValue("content", "");
            toast.success(response.data.message || "Blog created successfully");
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
            {/* Include _id as hidden input (for edit mode) */}
            <input type="hidden" {...register("_id")} />

            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Enter your title"
                    {...register("title")}
                    disabled={currentValue?.title}
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Type your description here."
                    {...register("description")}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="cover">Cover</Label>
                <FileUpload
                    value={image}
                    onChange={(file) => setValue("image", file)}
                />
                {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>}
            </div>

            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="content">Content</Label>
                <TiptapEditor
                    content={watch("content")}
                    onChange={(html) => setValue("content", html)}
                />
                {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
            </div>

            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="taglist">Tags</Label>
                <TagList control={control} name="taglist" />
                {errors.taglist && <p className="text-sm text-red-500 mt-1">{errors.taglist.message}</p>}
            </div>

            <Button type="submit" className="w-1/2 self-end" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
