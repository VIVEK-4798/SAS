'use client';
import { Helmet } from 'react-helmet-async';

export default function MetaComponent({ title, description }) {
  return (
    <Helmet>
      <title>{title || 'SAS | Fashion Made Effortless'}</title>
      <meta
        name="description"
        content={description || 'Discover premium fashion with SAS. Effortless style for everyone.'}
      />
    </Helmet>
  );
}
