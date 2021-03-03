import { useState } from "react";

import { LOCAL_STORAGE_APP_SIGNATURE, RECORS_TABLE_MAX_LENGTH } from "../../js/constants";

const LOCAL_STORAGE_RECORDS_TABLE_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("recordsTable");

function loadInitState() {
  const localRecordsTableString = window.localStorage.getItem(LOCAL_STORAGE_RECORDS_TABLE_NAME);
  const localRecordsTableArray = JSON.parse(localRecordsTableString);
  return localRecordsTableArray || [];
}

function storeRecordsTableInLocalStorage(table) {
  window.localStorage.setItem(LOCAL_STORAGE_RECORDS_TABLE_NAME, JSON.stringify(table));
}

function useRecords() {
  loadInitState();
  const [records, setRecords] = useState(loadInitState());

  function updateRecords(newRecordResult) {
    let newTable;
    if (records.length >= RECORS_TABLE_MAX_LENGTH) {
      newTable = [...records.slice(-(RECORS_TABLE_MAX_LENGTH - 1)), newRecordResult];
    } else {
      newTable = [...records, newRecordResult];
    }

    storeRecordsTableInLocalStorage(newTable);
    setRecords(newTable);
  }

  return {
    records,
    updateRecords,
  };
}

export default useRecords;
