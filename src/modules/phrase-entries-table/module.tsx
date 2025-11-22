'use client';
import { Dropdown } from '@/components/dropdown';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';

export function PhraseEntriesTable() {
  const text = useAppSelector((state) => state.text.text);
  const [entries, setEntries] = useState(50);

  if (!text) {
    return null;
  }

  // Remove <p>, </p>, <br> tags, and bullet punctuation from the text
  const normalize = (text: string) => {
    return text
      .replace(
        /<p[^>]*>|<\/p>|<br[^>]*>|<br\/[^>]*>|<strong[^>]*>|<\/strong>|<em[^>]*>|<\/em>|<h1[^>]*>|<\/h1>|<h2[^>]*>|<\/h2>|<h3[^>]*>|<\/h3>|<h4[^>]*>|<\/h4>|<h5[^>]*>|<\/h5>|<h6[^>]*>|<\/h6>|<li[^>]*>|<\/li>|<ul[^>]*>|<\/ul>|<ol[^>]*>|<\/ol>|<span[^>]*>|<\/span>/g,
        ' ',
      ) // Remove <p>, </p>, <br>, <br/>, <strong>, <em>, <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <li>, <ul>, <ol>, <span> tags
      .replace(/[●:\-–→—]/g, ' '); // Remove bullets and punctuation
  };

  // Process the text to count word occurrences and find first occurrences
  const cleanText = normalize(text); // Remove unwanted tags/punctuation before processing
  const words = cleanText.split(/\s+/); // Split text into words by whitespace

  const phrases = new Map<string, { count: number; firstIndex: number }>();

  // Collect phrases of 2-4 words
  for (let i = 0; i < words.length; i++) {
    for (let length = 2; length <= 4; length++) {
      const phrase = words.slice(i, i + length).join(' ');
      if (phrase.split(' ').length === length) {
        if (phrases.has(phrase)) {
          const { count, firstIndex } = phrases.get(phrase)!;
          phrases.set(phrase, { count: count + 1, firstIndex });
        } else {
          phrases.set(phrase, { count: 1, firstIndex: i });
        }
      }
    }
  }

  const phrasesEntries = Array.from(phrases.entries())
    .map(([phrase, { count, firstIndex }]) => ({
      phrase,
      count,
      firstIndex,
    }))
    .sort((a, b) => b.count - a.count) // Sort by count in descending order
    .slice(0, entries);

  return (
    <div className='grow'>
      <div className='flex justify-between items-end'>
        <h2 className='font-bold text-xl'>Phrases Entries Table</h2>
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
              <th className='border border-gray-400 p-1'>Phrase</th>
              <th className='border border-gray-400 p-1'>Count</th>
              <th className='border border-gray-400 p-1'>First Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {phrasesEntries.map(({ phrase, count, firstIndex }) => (
              <tr key={phrase}>
                <td className='border border-gray-400 p-1'>{phrase}</td>
                <td className='border border-gray-400 p-1'>{count}</td>
                <td className='border border-gray-400 p-1'>{firstIndex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
