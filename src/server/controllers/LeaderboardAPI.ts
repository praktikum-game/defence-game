import { praktikumLeaderboardAPI } from 'api/leaderboard/LeaderboardAPI';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';

export class LeaderboarAPI {
  public static getLeaaderboard = async (request: Request, response: Response) => {
    const { cursor, limit } = request.body;
    try {
      const leadertboardResponse = await praktikumLeaderboardAPI.getAllLeaderboard(
        Number(cursor),
        Number(limit),
        {
          headers: {
            cookie: request.headers.cookie!,
          },
        },
      );
      response.status(HttpStatus.OK).json(leadertboardResponse.data);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static updateUserInfoInLeaderboard = async (request: Request, response: Response) => {
    try {
      const { id, username, login, score } = request.body;

      const updadateUserResponse = await praktikumLeaderboardAPI.upsertUserToLeaderboard(
        {
          id,
          username,
          login,
          score,
        },
        {
          headers: {
            cookie: request.headers.cookie!,
          },
        },
      );
      response.status(HttpStatus.OK).json(updadateUserResponse.data);
    } catch (e: unknown) {
      const { response: er } = e as AxiosError;
      if (er !== undefined) {
        response.sendStatus(er.status);
      } else {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };

  public static getTeamLeaderboard = async (request: Request, response: Response) => {
    const { cursor, limit } = request.body;

    try {
      const { data } = await praktikumLeaderboardAPI.getTeamLeaderboard(
        Number(cursor),
        Number(limit),
        {
          headers: {
            cookie: request.headers.cookie!,
          },
        },
      );

      response.status(HttpStatus.OK).json(data);
    } catch (e: unknown) {
      const { response: er } = e as AxiosError;
      if (er !== undefined) {
        response.sendStatus(er.status);
      } else {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };
}
