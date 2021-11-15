import React from 'react';
import { block } from 'bem-cn';
import { LeaderboardItem, LeaderboardTableProps } from '.';
import './leaderboard-table.css';

const b = block('lead-table');

export const LeaderboardTable = ({ data, columns, className }: LeaderboardTableProps) => (
  <div className={className}>
    <div className={b()}>
      <div className={b('row', { header: true, rounded: true })}>
        {columns.map((colHeader, idx) => (
          <div
            key={`${colHeader.dataId}_${idx}`}
            className={b('cell', { border: idx < columns.length - 1 })}
          >
            {colHeader.title}
          </div>
        ))}
      </div>
      {data
        .sort(
          (item: LeaderboardItem, anotherItem: LeaderboardItem) => anotherItem.score - item.score,
        )
        .map((row) => (
          <div key={row.id} className={b('row', { rounded: true })}>
            {columns.map((col, idx) => (
              <div
                key={`${row.id}_${col.dataId}`}
                className={b('cell', { border: idx < columns.length - 1 })}
              >
                {row[col.dataId]}
              </div>
            ))}
          </div>
        ))}
    </div>
  </div>
);
