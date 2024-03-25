import { Request, Response, NextFunction } from "express";

interface AsyncHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const catchAsyncHandler = (handler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};

export default catchAsyncHandler;
