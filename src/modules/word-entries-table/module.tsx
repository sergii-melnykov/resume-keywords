'use client';
import { Dropdown } from '@/components/dropdown';
import { useAppSelector } from '@/store/hooks';
import { cleanWords, filterTags } from '@/utilities';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

export function WordEntriesTable({ className }: Props) {
  const text = useAppSelector((state) => state.text.text);
  const [entries, setEntries] = useState(50);
  if (!text) {
    return null;
  }

  // List of stop words to exclude
  const stopWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'is',
    'by',
    'to',
    'of',
    'in',
    'on',
    'with',
    'for',
    'as',
    'at',
    'from',
    'this',
    'that',
    'it',
    'be',
    'was',
    'were',
    'are',
    'has',
    'had',
    'have',
    'not',
    'no',
    'yes',
    'do',
    'does',
    'did',
    'will',
    'would',
    'can',
    'could',
    'shall',
    'should',
    'may',
    'might',
    '&',
    '-',
    '|',
    'page',
    'amp',
  ]);

  const cleanText = filterTags(text);
  const words = cleanWords(cleanText.split(/\s+/)); // Split text into words by whitespace
  const wordsCount = words.length;
  const wordMap = new Map<string, { count: number; firstIndex: number }>();

  // Regular expression to clean words
  const cleanWord = (word: string) =>
    word
      .trim()
      .replace(/[,:;!?()]/g, '')
      .replace(/^[^a-zа-яё]+|[^a-zа-яё]+$/gi, '')
      .toLowerCase();

  words.forEach((word, index) => {
    const normalizedWord = cleanWord(word);
    if (normalizedWord && !stopWords.has(normalizedWord)) {
      if (!wordMap.has(normalizedWord)) {
        wordMap.set(normalizedWord, { count: 1, firstIndex: index + 1 });
      } else {
        const entry = wordMap.get(normalizedWord)!;
        entry.count += 1;
      }
    }
  });

  const wordEntries = Array.from(wordMap.entries())
    .map(([word, { count, firstIndex }]) => ({
      word,
      count,
      firstIndex,
    }))
    .sort((a, b) => b.count - a.count) // Sort by count in descending order
    .slice(0, entries); // Take only the first 25 entries

  return (
    <div className={twMerge('grow', className)}>
      <div className='flex justify-between items-end'>
        <h2 className='font-bold text-xl'>Words Entries Table</h2>
        <Dropdown
          onChange={(value) => setEntries(+value)}
          value={entries.toString()}
          options={['20', '30', '40', '50']}
        />
      </div>
      <div className='overflow-hidden rounded-lg border border-gray-400 mt-1'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border border-gray-400 p-1'>Word</th>
              <th className='border border-gray-400 p-1'>Count</th>
              <th className='border border-gray-400 p-1'>Frequency</th>
              <th className='border border-gray-400 p-1'>First Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {wordEntries.map(({ word, count, firstIndex }) => (
              <tr key={word}>
                <td className='border border-gray-400 p-1'>{word}</td>
                <td className='border border-gray-400 p-1'>{count}</td>
                <td className='border border-gray-400 p-1'>
                  {((count / wordsCount) * 100).toFixed(2)}%
                </td>
                <td className='border border-gray-400 p-1'>{firstIndex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
