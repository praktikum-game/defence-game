import { leaderboardAPI } from './api/leaderboard';

class NotificationWorker {
  static STORAGE_LEADER_KEY = 'currentLeader';

  private _timeID: number;

  private _timerFrequency: number; // ms

  private _isStop: boolean;

  private _currentLeader?: string;

  private _notification: Notification;

  constructor(timerFrequency: number = 60000) {
    this._timeID = 0;
    this._timerFrequency = timerFrequency;
    this._isStop = true;
    this._currentLeader = localStorage.getItem(NotificationWorker.STORAGE_LEADER_KEY) || undefined;
    this._notification = new Notification(
      'Хотите получать уведомления об обновлениях лидерборда?',
      { requireInteraction: true },
    );
  }

  start() {
    this._isStop = false;
    this._startTimer();
  }

  stop() {
    this._isStop = true;
    clearTimeout(this._timeID);
  }

  get isStopped() {
    return this._isStop;
  }

  private _startTimer() {
    // Из-за того, что у нас в конфиге находится параметр node, импортит не тот модуль
    this._timeID = setTimeout(
      this._startUpdate.bind(this),
      this._timerFrequency,
    ) as unknown as number;
  }

  private _startUpdate() {
    this._getLeader().then((newLeader: string) => {
      if (newLeader != this._currentLeader) {
        localStorage.setItem(NotificationWorker.STORAGE_LEADER_KEY, newLeader);
        this._currentLeader = newLeader;
      }
    });

    if (!this._isStop) {
      this._startTimer();
    }
  }

  private async _getLeader(): Promise<string> {
    try {
      const response = await leaderboardAPI.fetchLeaderboardData();
      return response.data[0].username;
    } catch (e) {
      console.log(e);
      return '';
    }
  }
}

let notificationInstance: NotificationWorker | undefined;

onmessage = function () {
  console.log('Starting notification script');
  if (notificationInstance === undefined) {
    notificationInstance = new NotificationWorker();
  }
  if (notificationInstance.isStopped) {
    notificationInstance.start();
  }
};
