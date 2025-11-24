'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addKeyword, removeKeyword, setDefaults } from '@/store/keywordsSlice';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

export function DefinedKeywordsModule({ className }: Props) {
  const keywords = useAppSelector((state) => state.keywords.keywords);
  const dispatch = useAppDispatch();
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      // Split by comma and add each keyword
      const keywordsToAdd = newKeyword
        .split(',')
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);

      keywordsToAdd.forEach((keyword) => {
        dispatch(addKeyword(keyword));
      });

      setNewKeyword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    dispatch(removeKeyword(keyword));
  };

  const handleSetDefaults = () => {
    dispatch(setDefaults());
  };

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <h2 className='font-bold text-xl'>Define Keywords</h2>
      <div className='flex gap-2 items-center'>
        <input
          type='text'
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Enter keyword...'
          className='border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <button
          onClick={handleAddKeyword}
          className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Add
        </button>
        <button
          onClick={handleSetDefaults}
          className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          title='Reset to default keywords'
        >
          Set Defaults
        </button>
      </div>
      {keywords.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className='inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm'
            >
              {keyword}
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                className='ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none'
                aria-label={`Remove ${keyword}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
