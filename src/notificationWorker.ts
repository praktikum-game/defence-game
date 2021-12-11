import { leaderboardAPI } from './api/leaderboard';

class NotificationWorker {
  private _timeID: number;

  private _timerFrequency: number; // ms

  private _isStop: boolean;

  private _currentLeader?: string;

  private _message: string;

  constructor(currentLeader?: string, timerFrequency: number = 30000) {
    this._timeID = 0;
    this._timerFrequency = timerFrequency;
    this._isStop = true;
    this._currentLeader = currentLeader;
    this._message = 'Сейчас рейтинг возглавляет ';

    if (this._currentLeader !== undefined) {
      new Notification(`${this._message} ${this._currentLeader}`);
    }
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
    this._timeID = setTimeout(
      this._startUpdate.bind(this),
      this._timerFrequency,
      // Из-за того, что у нас в конфиге находится параметр node, подтягивает не тот модуль
    ) as unknown as number;
  }

  private _startUpdate() {
    this._getLeader().then((newLeader: string) => {
      if (newLeader !== undefined && newLeader != this._currentLeader) {
        self.postMessage(newLeader);
        this._currentLeader = newLeader;
        new Notification(`${this._message} ${this._currentLeader}`);
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

self.addEventListener('message', (e) => {
  if (notificationInstance === undefined) {
    notificationInstance = new NotificationWorker(e.data);
  }
  if (notificationInstance.isStopped) {
    notificationInstance.start();
  }
});
