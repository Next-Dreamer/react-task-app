import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import SideForm from "./SideForm/SideForm";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId
}) => {
  const { boardArray } = useTypedSelector((state) => state.board);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };
  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) === index,
            },
            {
              [boardItem]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) !== index,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
      </div>
    </div>
  )
}

export default BoardList;
