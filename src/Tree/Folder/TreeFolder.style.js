import styled from 'styled-components';

export const StyledFolder = styled.div`
  font-weight: bold;
  margin-left: ${p => p.indent * p.theme.indent}px;

  .tree__file {
    margin-left: ${p => p.theme.indent * 2}px;
  }
`;
