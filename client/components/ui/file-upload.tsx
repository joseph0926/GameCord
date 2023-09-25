'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';
import { X } from 'lucide-react';
import Image from 'next/image';

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'serverImage' | 'messageFile';
};

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="img" width={80} height={80} className="h-full w-full rounded-full" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
