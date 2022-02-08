import { localLeaderboardAPI } from './api/leaderboard';

class NotificationWorker {
  private _timeID: number;

  private _timerFrequency: number; // ms

  private _isStop: boolean;

  private _currentLeader: string;

  private _message: string;

  constructor(timerFrequency: number = 30000) {
    this._timeID = 0;
    this._timerFrequency = timerFrequency;
    this._isStop = true;
    this._currentLeader = '';
    this._message = 'Сейчас рейтинг возглавляет ';
  }

  start() {
    this._isStop = false;
    this._startTimer();
  }

  stop() {
    this._isStop = true;
    clearTimeout(this._timeID);
  }

  get currentLeader() {
    return this._currentLeader;
  }

  set currentLeader(value: string | undefined) {
    if (value !== undefined && value !== 'undefined') {
      new Notification(`${this._message} ${this._currentLeader}`);
    }

    this._currentLeader = value === undefined ? '' : value;
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
      if (newLeader !== '' && newLeader != this.currentLeader) {
        self.postMessage(newLeader);
        this.currentLeader = newLeader;
      }
    });

    if (!this._isStop) {
      this._startTimer();
    }
  }

  private async _getLeader(): Promise<string> {
    try {
      const response = await localLeaderboardAPI.getAllLeaderboard();
      return response.data[0].data.username;
    } catch (e) {
      return '';
    }
  }
}

let notificationInstance = new NotificationWorker();

self.addEventListener('message', (e) => {
  if (notificationInstance.currentLeader === '' && e.data !== undefined) {
    notificationInstance.currentLeader = e.data;
  }
  if (notificationInstance.isStopped) {
    notificationInstance.start();
  }
});
