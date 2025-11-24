'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setText } from '@/store/textSlice';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // For the editor styles
import { twMerge } from 'tailwind-merge';
import { PdfParser } from '../pdf-parser';

type Props = {
  className?: string;
};

export function TextEditor({ className }: Props) {
  const text = useAppSelector((state) => state.text.text);
  const dispatch = useAppDispatch();
  const [removeText, setRemoveText] = useState('');

  const handleRemoveText = () => {
    dispatch(setText(text.replaceAll(removeText, '')));
    setRemoveText('');
  };

  const handleChange = (value: string) => {
    dispatch(setText(value));
  };

  return (
    <div className={twMerge('min-w-[50%] flex flex-col gap-2', className)}>
      <PdfParser />
      <div className='flex gap-2 sticky top-0 bg-gray-500 p-2 z-10'>
        <input
          className='border border-gray-300 rounded-md p-2 min-w-[500px]'
          type='text'
          placeholder='find and remove text'
          value={removeText}
          onChange={(e) => setRemoveText(e.target.value)}
        />
        <button onClick={handleRemoveText}>Remove</button>
      </div>
      <ReactQuill value={text} onChange={handleChange} theme='snow' />
    </div>
  );
}
