"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsBoxArrowUpRight, BsThreeDots } from "react-icons/bs";
import { IoMdCreate } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogCard({ curEle,mutate }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const handleViewClick = () => {
        router.push(`/dashboard/view-page?id=${curEle._id}`);
    }
    const handleEditClick = () => {
        router.push(`/dashboard/create-blog?id=${curEle._id}`);
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/blog-list/${curEle._id}`);
            toast.success(res.data.message || "Blog Delete successfully");
            mutate();
            onOpenChange(false);
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    }

    return (
        <div key={curEle._id} className="w-full rounded-2xl p-5 dark:bg-gray-800 flex justify-between md:flex-row relative shadow-2xl flex-col-reverse gap-3">
            <div className="flex flex-col gap-2 lg:w-2/3 w-full">
                <div className="font-semibold uppercase">{curEle.title}</div>
                <div className="truncate lg:w-3/4 w-full">{curEle.description}</div>
                <div>{curEle.taglist.join(" , ")}</div>
                <div className="cursor-pointer">
                    <Popover>
                        <PopoverTrigger asChild>
                            <BsThreeDots size={25}
                            />
                        </PopoverTrigger>
                        <PopoverContent className='w-32'>
                            <div className="backdrop-blur-sm w-full rounded-2xl flex flex-col">
                                <div
                                    className="p-2 font-semibold cursor-pointer flex items-center gap-4 hover:bg-slate-200 rounded-lg"
                                    onClick={handleViewClick}
                                >
                                    <BsBoxArrowUpRight />
                                    View
                                </div>
                                <div
                                    className="p-2 font-semibold cursor-pointer flex items-center gap-4 hover:bg-slate-200 rounded-lg"
                                    onClick={handleEditClick}
                                >
                                    <IoMdCreate />
                                    Edit
                                </div>
                                <div
                                    className="p-2 font-semibold cursor-pointer flex items-center gap-4 hover:bg-slate-200 rounded-lg"
                                    onClick={onOpen}
                                >
                                    <RiDeleteBin5Fill />
                                    Delete
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                    {new Date(curEle.createdAt).toLocaleDateString()}
                </div>
            </div>
            <div>
                <img
                    src={curEle.image}
                    alt={curEle.title}
                    className="w-44 h-36 object-cover rounded-lg"
                />
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-slate-600 bg-opacity-50 flex items-center justify-center z-50 rounded-lg backdrop-blur-2xl flex-col p-5">
                            <ModalHeader className="flex flex-col gap-1">Delete Blog</ModalHeader>
                            <ModalBody>
                                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                                    Are you sure you want to delete this blog?
                                </h3>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" className="rounded-lg cursor-pointer" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" className="bg-red-500 rounded-lg cursor-pointer text-white" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}