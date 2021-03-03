import { useState } from "react";

function useRecordsTable() {
  const [isShowRecordsTable, setIsShow] = useState(false);

  function toggleRecordsTable() {
    setIsShow(!isShowRecordsTable);
  }

  return {
    isShowRecordsTable,
    toggleRecordsTable,
  };
}

export default useRecordsTable;
