'use client';

import { WordEntriesTable } from '@/modules/word-entries-table';
import { TextEditor } from '@/modules/text-editor';
import { PhraseEntriesTable } from '@/modules/phrase-entries-table';
import { DefinedKeywordsModule } from '@/modules/defined-keywords-module';
import { DefinedKeywordsTable } from '@/modules/defined-keywords-table';

export default function Home() {
  return (
    <div className='min-h-screen p-8 pb-20 gap-16'>
      <main className='flex flex-col items-start justify-start gap-6'>
        <DefinedKeywordsModule />
        <div className='flex gap-4 w-full'>
          <div className='max-w-[50%] min-w-[60%]'>
            <TextEditor />
          </div>
          <div className='flex flex-col gap-4 w-full'>
            {/* module with defined keywords */}

            <div className='flex gap-4 w-full'>
              {/* table with defined keywords */}
              <DefinedKeywordsTable  />
              {/* table with word entries */}
              {/* <WordEntriesTable className='max-w-[50%]' /> */}
              
            </div>
            {/* table with phrase entries */}
            {/* <PhraseEntriesTable className='max-w-[50%]' /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
