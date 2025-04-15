import React from 'react';
import styled from 'styled-components';

// Define interface for custom props if you want to allow external size control.
interface SquareProps {
  width?: string;
  height?: string;
}

// Styled component for the resizable square.
const ResizableSquare = styled.div<SquareProps>`
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '200px'};
  background-color: #e0e0e0;
  border: 2px dashed #333;
  resize: both;
  overflow: auto;
  /* Optional: a minimum size to prevent from becoming too small */
  min-width: 50px;
  min-height: 50px;
`;

// React component that renders the resizable square.
const ResizableSquareComponent: React.FC<SquareProps> = ({ width, height, children }) => {
  return <ResizableSquare width={width} height={height} >
    {children}
  </ResizableSquare>;
};

export default ResizableSquareComponent;