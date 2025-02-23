import * as jwt from 'jsonwebtoken';

import { UnauthorizedException } from '@nestjs/common';
import { AppReq } from './types';

/**
 * AuthHelper contains following methods
 * createAccessToken() this will create a new jwt access token for user
 * verifyToken() this will verify jwt token
 * checkIfUserAuthorized() this will check if jwt token is valid and request is accessible or not
 */


export class AuthHelper {
  public static verifyToken(token: string): jwt.JwtPayload {
    if (!process.env.JWT_KEY) throw Error('JWT_KEY not defined');
    return jwt.verify(token, process.env.JWT_KEY) as jwt.JwtPayload;
  }

  public static async createAccessToken(
    username: string,
    userId: number,
  ): Promise<string> {
    if (!process.env.JWT_KEY) throw Error('JWT_KEY not defined');

    const payload: {
      u: string;
      sub: number;
    } = {
      u: username,
      sub: userId,
    };
    

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '30d',
    });

    return token;
  }

  static async checkIfUserAuthorized(request: AppReq, token: string) {
    if (!request) return false;

    let payload;
    try {
      payload = this.verifyToken(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    if (!payload) throw new UnauthorizedException();

    request.user = {
      id: Number(payload.sub),
      name: payload['u'],
    };

    return true;
  }
}
