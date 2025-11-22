'use client';

import { useAppDispatch } from '@/store/hooks';
import { setText } from '@/store/textSlice';
import { parsePDF } from '@/utilities/parse-pdf';

export function PdfParser() {
  const dispatch = useAppDispatch();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const parsedPdf = await parsePDF(URL.createObjectURL(file));
      dispatch(setText(parsedPdf.html));
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div className='flex flex gap-2 items-center'>
      <label className='w-full text-sm font-medium text-gray-700'>
        Upload a PDF File:
      </label>
      <input
        type='file'
        accept='application/pdf'
        onChange={handleFileUpload}
        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
      />
    </div>
  );
}
