import React, { useMemo } from "react";
import { Table } from "flowbite-react";
import SuperTableItem from "./SuperTableItem";
import { uid } from "uid";

export default function SuperTable({ table, hiddenKeys, update, deleteData }) {
  const { keys, data } = table || {};

  const newKeys = useMemo(() => {
    let newKeysLast = [];
    for (let i = 0; i < keys.length; i++) {
      if (!hiddenKeys.includes(keys[i])) {
        newKeysLast.push(keys[i]);
      }
    }
    return newKeysLast;
  }, [hiddenKeys, keys]);

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell key={uid()} className="w-[30px] text-center text-3xl">
            id
          </Table.HeadCell>
          {newKeys?.map((key) => (
            <Table.HeadCell key={uid()} className="text-3xl">
              {key}
            </Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Options</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-2xl">
          {data.map((item, index) => (
            <SuperTableItem
              key={uid()}
              keys={newKeys}
              index={index}
              update={update}
              deleteData={deleteData}
              tableItem={item}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
