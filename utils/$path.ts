const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash, path: `/login${buildSuffix(url)}` })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash, path: `/signup${buildSuffix(url)}` })
  },
  "dashboard": {
    $url: (url?: { hash?: string }) => ({ pathname: '/dashboard' as const, hash: url?.hash, path: `/dashboard${buildSuffix(url)}` })
  },
  "subscribe": {
    $url: (url?: { hash?: string }) => ({ pathname: '/subscribe' as const, hash: url?.hash, path: `/subscribe${buildSuffix(url)}` })
  },
  "editor": {
    _postId: (postId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/editor/[postId]' as const, query: { postId }, hash: url?.hash, path: `/editor/${postId}${buildSuffix(url)}` })
    })
  },
  "contact": {
    "complete": {
      $url: (url?: { hash?: string }) => ({ pathname: '/contact/complete' as const, hash: url?.hash, path: `/contact/complete${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/contact' as const, hash: url?.hash, path: `/contact${buildSuffix(url)}` })
  },
  "membership": {
    "cancelled": {
      $url: (url?: { hash?: string }) => ({ pathname: '/membership/cancelled' as const, hash: url?.hash, path: `/membership/cancelled${buildSuffix(url)}` })
    },
    "success": {
      $url: (url?: { hash?: string }) => ({ pathname: '/membership/success' as const, hash: url?.hash, path: `/membership/success${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/membership' as const, hash: url?.hash, path: `/membership${buildSuffix(url)}` })
  },
  "works": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/works/[id]' as const, query: { id }, hash: url?.hash, path: `/works/${id}${buildSuffix(url)}` })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/works' as const, hash: url?.hash, path: `/works${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;
