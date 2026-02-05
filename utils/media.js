// src/utils/media.js

// برای عکس‌ها
export const getMediaUrl = (path) => {
    if (!path) return '/1x.png';
    if (path.startsWith('http')) return path;
    const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
    return `${mediaBaseUrl}${path}`;
  }
  
  // برای فایل‌های عمومی (مثل فایل‌های تیکت)
  export const getFileUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
    return `${mediaBaseUrl}${path}`;
  }