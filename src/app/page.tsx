'use client';

import { WordEntriesTable } from '@/modules/word-entries-table';
import { PdfEditor } from '@/modules/pdf-editor';
import { PdfParser } from '@/modules/pdf-parser';
import { PhraseEntriesTable } from '@/modules/phrase-entries-table';

export default function Home() {
  return (
    <div className='min-h-screen p-8 pb-20 gap-16'>
      <main className='flex flex-col items-start justify-start gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold text-xl'>Key Analyzer </h1>
          <PdfParser />
        </div>
        <div className='flex gap-4 w-full'>
          <PdfEditor />
          <WordEntriesTable />
          <PhraseEntriesTable />
        </div>
      </main>
    </div>
  );
}
