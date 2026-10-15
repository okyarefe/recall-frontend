import { PageHeader } from '@/features/app-shell';
import { FileDropzone, UploadList, useFileUploads } from '@/features/entries';
import { Button } from '@/shared/components/ui/button';
import styles from './UploadPage.module.css';

export default function UploadPage() {
  const { items, uploadableCount, isUploading, addFiles, removeFile, uploadAll } = useFileUploads();

  return (
    <div className={styles.page}>
      <PageHeader title="Upload" description="Add documents. Recall writes the questions." />
      <FileDropzone onFiles={addFiles} />
      <UploadList items={items} onRemove={removeFile} />
      <div className={styles.actions}>
        <Button disabled={uploadableCount === 0 || isUploading} onClick={uploadAll}>
          {isUploading
            ? 'Uploading…'
            : uploadableCount > 0
              ? `Upload ${uploadableCount} ${uploadableCount === 1 ? 'file' : 'files'}`
              : 'Upload'}
        </Button>
      </div>
    </div>
  );
}
