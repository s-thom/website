import React from 'react';
import { Head } from 'react-static';

import { HeadData } from '../../types';

export default function PageMeta({ 
  title,
  url,
  description,
  img,
  date,
  edited,
  tags,
}: HeadData) {
  const meta = [
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    {
      property: 'og:url',
      content: `https://sthom.kiwi${url}`,
    },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: img ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'description', content: description },
  ];

  if (img) {
    meta.push(
      { name: 'twitter:image', content: img },
      { property: 'og:image', content: img },
    );
  }

  if (date) {
    const editedDate = edited || date;

    meta.push(
      { property: 'article:published_time', content: date },
      { property: 'article:modified_time', content: editedDate },
    );
  }

  if (tags) {
    tags.forEach((t) => {
      meta.push({ property: 'article:tag', content: t });
    });
  }

  return (
    <Head
      title={title}
      meta={meta}
    />
  );
}
