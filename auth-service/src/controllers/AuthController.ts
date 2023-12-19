import { Request, Response } from 'express';

class AuthController {
  login(req: Request, res: Response) {

    res.json({ message: 'Login successful auth' });
  }
}

export default AuthController;
