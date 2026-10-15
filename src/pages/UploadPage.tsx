import { FileDropzone, UploadList, useFileUploads } from '@/features/entries';
import { Button } from '@/shared/components/ui/button';
import styles from './UploadPage.module.css';

export default function UploadPage() {
  const { items, readyCount, addFiles, removeFile } = useFileUploads();

  return (
    <div className={styles.page}>
      <FileDropzone onFiles={addFiles} />
      <UploadList items={items} onRemove={removeFile} />
      <div className={styles.actions}>
        {/* TODO: send the ready files once api.ts has uploadEntry. */}
        <Button disabled={readyCount === 0}>
          {readyCount > 0 ? `Upload ${readyCount} ${readyCount === 1 ? 'file' : 'files'}` : 'Upload'}
        </Button>
      </div>
    </div>
  );
}
