import * as React from "react";
import styled from "styled-components";

export interface ChessPieceProps {
  id: string;
  ids: string[];
  onClick: (id: string) => void;
  onSave: () => void;
}

const GoPageSide: React.FunctionComponent<ChessPieceProps> = (props) => {
  return (
    <SidebarBox>
      <SidebarTitle>Go List</SidebarTitle>
      <SidebarContent>
        {props.ids.map((id, idx) => (
          <SidebarItem
            key={idx}
            active={id === props.id}
            onClick={() => props.onClick(id)}
          >
            {id}
          </SidebarItem>
        ))}
      </SidebarContent>
      <SidebarSave onClick={props.onSave}>click to save</SidebarSave>
    </SidebarBox>
  );
};

const SidebarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 80px 20px;
  width: 300px;
`;

const SidebarTitle = styled.div`
  text-align: center;
  width: 100%;
  font-size: 2em;
  font-weight: bold;
`;
const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SidebarItemProps {
  active: boolean;
}

const SidebarItem = styled.a<SidebarItemProps>`
  margin-top: 10px;
  font-size: 0.8em;
  cursor: pointer;
  color: ${({ active }) => (active ? "red" : "black")};
`;

const SidebarSave = styled.button`
  margin-top: 20px;
  color: crimson;
  font-size: 1.5em;
`;
export default GoPageSide;
