import LoadingSkeleton from '@/app/components/LoadingSkeleton';

export default function Loading() {
  return (
    <div className='mb-5'>
      <div className='space-y-3'>
        <div className='w-96 animate-pulse h-10 bg-gray-400 rounded-md'></div>
        <div className='w-1/2 animate-pulse h-16 bg-gray-400 rounded-md'></div>
        <div className='flex justify-between'>
          <div className='flex space-x-1'>
            <div className='w-20 animate-pulse h-10 bg-gray-400 rounded-md'></div>
            <div className='w-24 animate-pulse h-10 bg-gray-400 rounded-md'></div>
          </div>
          <div className='flex space-x-2'>
            <div className='w-16 animate-pulse h-10 bg-gray-400 rounded-md'></div>
            <div className='w-20 animate-pulse h-10 bg-gray-400 rounded-md'></div>
            <div className='w-24 animate-pulse h-10 bg-gray-400 rounded-md'></div>
            <div className='w-20 animate-pulse h-10 bg-gray-400 rounded-md'></div>
          </div>
        </div>
      </div>
      <div className='mt-12 w-full h-[700px] animate-pulse bg-gray-400 rounded-lg'></div>
      <div className='mt-10 flex flex-wrap justify-between gap-y-2'>
        <div className='w-80 animate-pulse h-20 bg-gray-400 rounded-md'></div>
        <div className='w-80 animate-pulse h-20 bg-gray-400 rounded-md'></div>
        <div className='w-80 animate-pulse h-20 bg-gray-400 rounded-md'></div>
        <div className='w-80 animate-pulse h-20 bg-gray-400 rounded-md'></div>
        <div className='w-80 animate-pulse h-20 bg-gray-400 rounded-md'></div>
      </div>
    </div>
  );
}
