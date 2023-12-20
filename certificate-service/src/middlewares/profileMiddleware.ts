import { Request, Response, NextFunction } from 'express';
import { Profiles } from 'commons/models/user'

export const profileMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const profile = res.locals.token.profile;

    if (!profile || typeof profile !== 'string') {
        return res.status(401).json({ message: 'Profile not found' });
    }

    try {
        if (profile === `${Profiles.ADMINISTRATOR}` || profile === `${Profiles.OPERATOR}`)
            return next();

        return res.status(403).json({ message: '403 Forbidden.' });
    } catch (error) {
        return res.status(403).json({ message: '403 Forbidden.' });
    }
};