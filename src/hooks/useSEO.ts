import { useEffect } from 'react';
import { updatePageSEO, SEOMetadata } from '@/utils/seo';

export function useSEO(metadata: SEOMetadata): void {
  useEffect(() => {
    updatePageSEO(metadata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    metadata.title,
    metadata.description,
    metadata.canonical,
    metadata.ogTitle,
    metadata.ogDescription,
    metadata.ogImage,
    metadata.noIndex,
  ]);
}
