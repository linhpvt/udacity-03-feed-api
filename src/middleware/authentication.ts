import * as jwt from 'jsonwebtoken';
import { sendResponse } from "../helpers";
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import { config } from '../config/config';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const { headers: { authorization ='' } = {} } = req;
	if (!authorization) {
		sendResponse(res, { message: 'No authorization headers.' }, 401)
		// end process
		return
	}
	
	const token_bearer = authorization.split(' ')
	let [bearer = '', token = ''] = token_bearer
	bearer = bearer.toLowerCase().trim()
	if (token_bearer.length !== 2) {
		sendResponse(res, { message: 'Malformed token.'}, 401)
		return;
	}
	return jwt.verify(token, config.jwt.secret, (err, decoded) => {
		// error
		if (err) {
			sendResponse(res, { auth: false, message: 'Failed to authenticate.' }, 500)
			return;
		}
		// success
		return next();
	});
}