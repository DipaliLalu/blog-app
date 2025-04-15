"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./file-uploader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TagList from "./tag-list";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor from "./TiptapEditor";
import { formSchema } from "@/schema/dashboard/formSchema";
import { endPoints } from "@/axios/axios";
import axios from "axios";
import toast from "react-hot-toast";

export default function Form({ currentValue }) {
    const [loading, setLoading] = useState(false)
    const defaultValue = {
        title: currentValue?.title || "",
        description: currentValue?.description || "",
        image: currentValue?.image || "",
        content: currentValue?.content || "",
        taglist: currentValue?.taglist || [],
    }

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
    });

    useEffect(() => {
        reset(defaultValue)
    }, [])

    const image = watch("image");
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const url = endPoints.dashboard.blogForm;
            const response = await axios.post(url, data);
            console.log(response)
            reset();
            toast.success(response.data.message || "Blog created successfully");
            // router.push('/login');
            setLoading(false);

        } catch (error) {
            setLoading(true);
            console.log(error)
            const message = error.message || 'Something went wrong';
            toast.error(message);
            setLoading(false);
        }
    };
    return (
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="title">Title</Label>
                <Input
                    size="lg"
                    autoComplete="off"
                    id="title"
                    type="text"
                    placeholder="Enter your title"
                    {...register("title")}
                    className="focus-visible:outline-none"
                />
            </div>
            {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}

            <div className="relative">
                <Label className="mb-3 text-md" htmlFor="description">Description</Label>
                <Textarea placeholder="Type your description here."
                    id="description"
                    {...register("description")}
                />
            </div>
            {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
            <div className="relative">
                <Label className="mb-3 text-md" htmlFor='cover'>Cover</Label>
                <FileUpload
                    value={image}
                    onChange={(file) => setValue("image", file)}
                />
            </div>
            {errors.image && (
                <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
            )}
            <div className="relative">
                <Label className="mb-3 text-md" htmlFor='content'>Content</Label>
                <TiptapEditor
                    content={watch('content')}
                    onChange={(html) => setValue('content', html)}
                />
            </div>
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            <div className="relative">
                <Label className="mb-3 text-md" htmlFor='taglist'>Tags</Label>
                <TagList control={control} name="taglist" />
            </div>
            {errors.taglist && (
                <p className="text-sm text-red-500 mt-1">{errors.taglist.message}</p>
            )}
            <Button type="submit" className='w-1/2 self-end' disabled={loading}>{loading ? 'Submitting..' : 'Submit'}</Button>
        </form>
    )
}