import styled from "styled-components";

export const INDENT = 10;

export const StyledTree = styled.div`
  line-height: 1.75;
  z-index: 1;
`;
export const StyledFile = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-left: ${INDENT}px;
`;
export const StyledFolder = styled.div`
  font-weight: bold;
  margin-left: ${p => p.indent * INDENT}px;

  .tree__file {
    margin-left: ${INDENT * 2}px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .folder__actions {
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;

    > svg {
      cursor: pointer;
      margin-left: 10px;
      transform: scale(1);
      transition: 0.2s;

      :hover {
        transform: scale(1.1);
      }
    }
  }

  &:hover .folder__actions {
    opacity: 1;
    pointer-events: all;
    transition: 0.2s;
  }
`;

export const StyledFolderName = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Collapse = styled.div`
  height: max-content;
  max-height: ${p => (p.isOpen ? "300px" : "0px")};
  overflow: hidden;
  transition: 0.3s ease-in-out;
`;

export const VerticalLine = styled.section`
  position: relative;
  :before {
    content: "";
    display: block;
    position: absolute;
    top: -2px; /* just to hide 1px peek */
    left: 1px;
    width: 0;
    height: 100%;
    border: 1px solid #dbdbdd;
    z-index: -1;
  }
`;
