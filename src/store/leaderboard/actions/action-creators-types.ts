import { LeaderboardUser } from '../../../api/leaderboard/types';
import {
  LB_PENDING_FETCH_LIST_DATA,
  LB_FAILED_FETCH_LIST_DATA,
  LB_FINISH_FETCH_LIST_DATA,
  LB_SUCCESS_FETCH_LIST_DATA,
} from './actions';

export interface LeaderboardPendingFetchList {
  type: typeof LB_PENDING_FETCH_LIST_DATA;
}
export interface LeaderboardSuccessFetchList {
  type: typeof LB_SUCCESS_FETCH_LIST_DATA;
  payload: LeaderboardUser[];
}
export interface LeaderboardFaliedFetchList {
  type: typeof LB_FAILED_FETCH_LIST_DATA;
}

export interface LeaderboardFinishFetchList {
  type: typeof LB_FINISH_FETCH_LIST_DATA;
}

export type LeaderboardActions =
  | LeaderboardPendingFetchList
  | LeaderboardSuccessFetchList
  | LeaderboardFaliedFetchList
  | LeaderboardFinishFetchList;
