import dynamic from "next/dynamic";
const Terminal = dynamic(() => import('@/components/server/console/Terminal'), { ssr: false });

export default function Page() {
    return (
        <div className='h-full w-full grid grid-cols-6 p-8'>
            <div className="col-span-4">
                <Terminal />
            </div>
        </div>
    )
}