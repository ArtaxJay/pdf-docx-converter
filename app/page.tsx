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
      <footer className='mt-16 row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <p className='text-black dark:text-white flex'>
          Created for
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4 mr-1'
            href='https://www.alxafrica.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='ml-1 p-1 rounded-full dark:bg-white'>
              <Image
                aria-hidden
                src='/alx-logo.svg'
                alt='alx logo icon'
                width={16}
                height={16}
              />
            </span>
            ALX
          </a>
          By
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://github.com/Ola-Oluwajuwon'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='dark:bg-white p-1 rounded-full ml-1'>
              <Image
                aria-hidden
                src='/github-logo.svg'
                alt='github logo icon'
                width={16}
                height={16}
              />
            </span>
            Ola-Oluwajuwon
          </a>
        </p>
      </footer>
    </div>
  );
}
