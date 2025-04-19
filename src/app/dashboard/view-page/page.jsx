'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import MarkdownRenderer from '../components/markdownRenderer';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function ViewPage() {
    const searchParams = useSearchParams(); 
    const id = searchParams.get('id');  
    const router=useRouter();
    const { data, error, isLoading } = useSWR(
        id ? `/api/blog-list/${id}` : null,
        fetcher
    );
   
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load blog</p>;

    const handleClick = () => {
        router.push('/dashboard/list')
    }
    return (
        <div className={"p-2 md:p-10 flex flex-col gap-6 transition-all dark:bg-black dark:text-slate-300 w-full"}>
            <div className="text-lg font-semibold">View a Blog</div>
            <div className="flex mt-4 flex-col gap-5 w-full justify-center ">
                <h1 className='uppercase text-2xl font-semibold'>{data.title}</h1>
                <img src={data.image} alt="BlogImage" 
                className='w-4/5 object-contain rounded-xl self-center' />
                <div>
                    <div>{data.description}</div>
                </div>
                <div>

                    <MarkdownRenderer markdownContent={data.content} />
                </div>

                <div className='flex flex-col gap-3'>
                    <hr />
                    <div className='flex gap-5 flex-wrap'>{data.taglist.map((tag, i) => {
                        return (
                            <div key={i} className='dark:bg-slate-800 dark:text-slate-300 px-2 py-1 rounded-lg dark:hover:bg-slate-600 bg-slate-200'>
                                {tag}
                            </div>
                        )
                    })}</div>
                </div>
            </div>
            <div className='text-right'>
                <button className='p-3 rounded-lg bg-blue-600 text-white w-full md:w-1/4'
                    onClick={handleClick}>Go Back</button>
            </div>
        </div>
    );
}
