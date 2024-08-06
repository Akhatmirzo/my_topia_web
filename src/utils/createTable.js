function createTable(data) {
  if (data?.length > 0) {
    let columns = Object.keys(data[0]);
    let rows = data;

    return { keys: columns, data: rows };
  } else {
    return { keys: [], data: [] };
  }
}

export { createTable };
