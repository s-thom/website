import React from 'react';
import PropTypes from 'prop-types';
import { BodyRenderer } from '@phenomic/preset-react-app/lib/client';

import FigureImage from '../FigureImage';
import HeaderPreview from '../HeaderPreview';

const components = {
  img: FigureImage,
};

export default function MdRenderer({ content }) {
  return <BodyRenderer components={components}>{content}</BodyRenderer>;
}

MdRenderer.propTypes = {
  content: PropTypes.any.isRequired,
};
