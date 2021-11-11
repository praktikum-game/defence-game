import React, { useEffect } from 'react';
import { block } from 'bem-cn';
import './index.css';

const b = block('lead-table');

export const LbTable = ({ data, columns }: LeaderboardTableProps) => {
  useEffect(() => {}, []);

  return (
    <div className={b()}>
      <div className={b('row', { header: true, rounded: true })}>
        {columns.map((colHeader, idx) => (
          <div className={b('cell', { border: idx < columns.length - 1 })}>{colHeader.title}</div>
        ))}
      </div>
      {data
        .sort((a: LeaderboardItem, c: LeaderboardItem) => c.score - a.score)
        .map((row) => (
          <div key={row.id} className={b('row', { rounded: true })}>
            {columns.map((col, idx) => (
              <div className={b('cell', { border: idx < columns.length - 1 })}>
                {row[col.dataId]}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
