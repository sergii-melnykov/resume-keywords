'use client';

import { useAppSelector } from '@/store/hooks';
import { filterTags } from '@/utilities';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

export function DefinedKeywordsTable({ className }: Props) {
  const text = useAppSelector((state) => state.text.text);
  const keywords = useAppSelector((state) => state.keywords.keywords);

  if (!text || keywords.length === 0) {
    return null;
  }

  const cleanText = filterTags(text).split(' ')
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .map((word) => word.toLowerCase())
    .join(' ');

  const words = cleanText
    .trim()
    .replace(/[,:;!?()]/g, '')
    .replace(/^[^a-zа-яё]+|[^a-zа-яё]+$/gi, '')
  const totalWords = words.length;

  console.log('cleanText', cleanText);
  // Find occurrences of each keyword in the text
  const keywordEntries = keywords.map((keyword) => {
    const normalizedKeyword = keyword.toLowerCase().trim();

    const occurrences: number[] = [];

    // Skip empty or invalid keywords
    if (!normalizedKeyword) {
      return {
        keyword,
        count: 0,
        firstIndex: null,
        occurrences: [],
      };
    }

    let startIndex = 0;
    while (true) {
      const index = cleanText.indexOf(normalizedKeyword, startIndex);
      console.log('normalizedKeyword', normalizedKeyword, 'index', index);
      if (index === -1) break;

      occurrences.push(index);

      // Move ahead by the full phrase length to avoid infinite loops
      startIndex = index + normalizedKeyword.length;
    }

    return {
      keyword,
      count: occurrences.length,
      firstIndex: occurrences[0] ?? null,
      occurrences: occurrences.slice(0, 10), // Show first 10 occurrences
    };
  });


  return (
    <div className={twMerge('grow', className)}>
      <h2 className='font-bold text-xl'>
        Defined Keywords Table. Total keywords: {keywords.length}.
      </h2>
      <div className='overflow-hidden rounded-lg border border-gray-400 mt-1'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border border-gray-400 p-1'>Keyword</th>
              <th className='border border-gray-400 p-1'>Count</th>
              <th className='border border-gray-400 p-1'>Frequency</th>
              <th className='border border-gray-400 p-1'>First Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {keywordEntries.map(({ keyword, count, firstIndex }) => (
              <tr key={keyword}>
                <td className='border border-gray-400 p-1 font-medium'>
                  {keyword}
                </td>
                <td className='border border-gray-400 p-1'>{count}</td>
                <td className='border border-gray-400 p-1'>
                  {totalWords > 0
                    ? ((count / totalWords) * 100).toFixed(2) + '%'
                    : '0.00%'}
                </td>
                <td className='border border-gray-400 p-1'>
                  {firstIndex ?? 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
