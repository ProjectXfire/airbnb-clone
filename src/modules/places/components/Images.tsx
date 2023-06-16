'use client';

import styles from '@modules/places/styles/Images.module.scss';
import { CldUploadWidget } from 'next-cloudinary';
import NextImage from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
}

function Images({ onChange, value }: Props): JSX.Element {
  const handleUpload = (result: any): void => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget onUpload={handleUpload} uploadPreset='airbnb' options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div className={styles['images-container']} onClick={() => open?.()}>
            <TbPhotoPlus size={50} />
            <p>Click to upload</p>
            {value && (
              <div className={styles.image}>
                <NextImage src={value} alt='image-upload' fill />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
export default Images;
