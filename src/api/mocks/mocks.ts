import { nanoid } from 'nanoid';
import { MessageItem } from '../forum-messages/types';
import { LeaderboardItem } from '../leaderboard/types';

export const messagesData: MessageItem[] = [
  {
    id: nanoid(),
    date: Date(),
    user: 'Доцент',
    text: 'Cupidatat consectetur et veniam laborum fugiat ut magna qui.',
  },
  {
    id: nanoid(),
    date: Date(),
    user: 'Косой',
    text: 'Lorem ad cupidatat duis nostrud non est. Id ipsum fugiat anim magna in laborum dolor voluptate ad consequat velit. Quis sint ipsum magna qui aliqua duis fugiat.',
  },
  {
    id: nanoid(),
    date: Date(),
    user: 'Василий Алибабаевич',
    text: 'Adipisicing Lorem cillum anim proident.',
  },
  {
    id: nanoid(),
    date: Date(),
    user: 'Хмырь',
    text: 'Eu consectetur commodo nostrud minim excepteur deserunt aliqua dolore consequat do cillum elit laborum enim.',
  },
  {
    id: nanoid(),
    date: Date(),
    user: 'Василий Алибабаевич',
    text: 'Velit fugiat eiusmod id nulla. Ea deserunt commodo laboris reprehenderit sit nostrud amet mollit minim. Est irure fugiat aliquip est elit reprehenderit irure commodo duis. Nisi dolor excepteur amet ullamco dolore eiusmod reprehenderit. Et elit velit non sunt irure ea.',
  },
];

export const leaderboardData: LeaderboardItem[] = [
  { id: 'a123', login: 'vasya', username: 'Василий Алибабаевич', score: 168 },
  { id: 'a124', login: 'kosoy', username: 'Косой', score: 202 },
  { id: 'a125', login: 'hmyr', username: 'Хмырь', score: 386 },
  { id: 'a126', login: 'docent', username: 'Доцент', score: 409 },
];
