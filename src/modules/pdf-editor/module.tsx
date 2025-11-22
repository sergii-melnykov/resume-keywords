'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setText } from '@/store/textSlice';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // For the editor styles

export function PdfEditor() {
  const text = useAppSelector((state) => state.text.text);
  const dispatch = useAppDispatch();
  const [removeText, setRemoveText] = useState('');

  const handleRemoveText = () => {
    dispatch(setText(text.replaceAll(removeText, '')));
    setRemoveText('');
  };

  return (
    <div className='min-w-[50%]'>
      <h2>Tools</h2>
      <div className='flex gap-2 sticky top-[5rem] bg-gray-500 p-2 z-10'>
        <input
          className='border border-gray-300 rounded-md p-2 min-w-[500px]'
          type='text'
          placeholder='find and remove text'
          value={removeText}
          onChange={(e) => setRemoveText(e.target.value)}
        />
        <button onClick={handleRemoveText}>Remove</button>
      </div>
      <h2 className='font-bold text-xl'>Edit that to improve</h2>
      <ReactQuill value={text} onChange={setText} theme='snow' />
    </div>
  );
}
