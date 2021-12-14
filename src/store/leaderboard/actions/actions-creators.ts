import { LeaderboardUser } from '../../../api/leaderboard';
import { LeadboardActionCreator, LeaderboardThunkDispatch } from '../types';
import {
  LeaderboardFaliedFetchList,
  LeaderboardFinishFetchList,
  LeaderboardPendingFetchList,
  LeaderboardSuccessFetchList,
} from './action-creators-types';

export const leaderboardStartFetchList = (): LeaderboardPendingFetchList => ({
  type: 'LB_PENDING_FETCH_LIST_DATA',
});

export const leaderboardSuccesFetchList = (
  data: LeaderboardUser[],
): LeaderboardSuccessFetchList => ({
  type: 'LB_SUCCESS_FETCH_LIST_DATA',
  payload: data,
});

export const leaderboardFailedFetchList = (): LeaderboardFaliedFetchList => ({
  type: 'LB_FAILED_FETCH_LIST_DATA',
});

export const leaderboardFinisFetchList = (): LeaderboardFinishFetchList => ({
  type: 'LB_FINISH_FETCH_LIST_DATA',
});

export const fetchLeaderboardListData: LeadboardActionCreator =
  () =>
  async (dispatch: LeaderboardThunkDispatch, _1, { api }) => {
    try {
      dispatch(leaderboardStartFetchList());
      const { data, status } = await api.leaderboard.getTeamLeaderboard();
      if (status < 300) {
        const sortedData = [...data]
          .sort((item, anotherItem) => anotherItem.data.score - item.data.score)
          .map((el) => {
            if (!el.data.username) {
              el.data.username = '<unknown>';
            }
            return el.data;
          });

        dispatch(leaderboardSuccesFetchList(sortedData));
      }
    } catch (e) {
      dispatch(leaderboardFailedFetchList());
    } finally {
      dispatch(leaderboardFinisFetchList());
    }
  };
