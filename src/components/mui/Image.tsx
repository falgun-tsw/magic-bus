import React from 'react';
import { styled } from '@mui/system';
import { Avatar } from '@mui/material';
import cx from 'classnames';

interface ImageComponentProps {
  alt?: string;
  objectFit?: 'contain' | 'cover';
  height?: string;
  width?: string;
  classes?: {
    root?: string;
    image?: string;
  };
  imgStyle?: React.CSSProperties;
  [key: string]: any; // Allows additional props
}

const ImageComponent: React.FC<ImageComponentProps> = (props) => {
  const {
    alt = '',
    objectFit = "contain",
    height = "100%",
    width = "100%",
    classes = {
      root: "",
      image: "",
    },
    imgStyle = {},
    ...restProps
  } = props;

  let objectFitClass = objectFit === "contain" ? 'imageContain' : 'imageCover';

  return (
    <Root className={`${classes.root ? classes.root : ""}`} style={{ height, width }}>
      <StyledImage
        alt={alt}
        style={imgStyle}
        className={cx(objectFitClass, classes.image)}
        {...restProps}
      />
    </Root>
  )
};

// Styled components
const Root = styled('div')({
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '100%',
  height: '100%',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  '&.imageContain': {
    objectFit: 'contain',
  },
  '&.imageCover': {
    objectFit: 'cover',
  },
});

// Adding an empty export to treat the file as a module
export default ImageComponent;
export {}; // This line makes the file a module
