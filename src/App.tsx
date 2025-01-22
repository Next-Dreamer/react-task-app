import React, { useState } from 'react';
import "./App.css";
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css';
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 as uuidv4 } from "uuid";

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const modalActive = useTypedSelector((state) => state.board.modalActive);
  const boards = useTypedSelector((state) => state.board.boardArray);

  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const lists = getActiveBoard.lists;

  
  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: activeBoardId }));
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 삭제하기: ${getActiveBoard.boardName}`,
          logAuthor: "user",
          logTimestamp: String(Date.now()),
        })
      )
      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );

        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      }

      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("게시판이 하나 남아있어서 삭제할 수 없습니다.");
    }
  }

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보기"}
        </button>
      </div>
    </div>
  );
}

export default App;
