import FileUploader from '@/components/Main/FileUploader';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start text-black dark:text-white text-center'>
        <h1 className='mx-auto text-3xl font-bold'>
          Effortlessly convert PDFs to DOCX and DOCX to PDFs with ease!
        </h1>
        <p>
          Easily transform your documents with our seamless converter tool!
          Whether you need to turn a PDF into an editable DOCX file or save your
          DOCX document as a polished PDF, we&apos;ve got you covered. Our fast
          and reliable tool ensures your files retain their original formatting
          and quality, making your workflow smoother and more efficient.
        </p>
        <p>
          Simply upload your file and let our advanced algorithm handle the
          rest—no installations, no complications. Perfect for professionals,
          students, and anyone who values time and accuracy. Start converting
          now!
        </p>

        <FileUploader />
      </main>
      <footer className='mt-16 bg-red-500 row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
      </footer>
    </div>
  );
}
