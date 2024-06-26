import { Response } from "express";
import { Either, map, mapLeft, toUnion } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

export type ApiResp<T> = {
  status: "error" | "ok";
  code: number;
  data: T;
};

export type ErrResp = ApiResp<string> & {
  status: "error";
};

export type OkResp<T> = ApiResp<T> & {
  status: "ok";
  code: 200;
};

export type ExpressRes<T> = Response<ApiResp<T>>;

export function errResp(code: number, message: string): ErrResp {
  return {
    status: "error",
    code,
    data: message,
  };
}

function okResp<T>(jsonData: T): OkResp<T> {
  return {
    status: "ok",
    code: 200,
    data: jsonData,
  };
}

export const expressUnwrappErr = (
  res: Response<ErrResp>,
  ret: Either<ErrResp, unknown>,
) =>
  pipe(
    ret,
    mapLeft((fin) => res.status(fin.code).json(fin)),
  );

export const expressRes = <T>(
  res: ExpressRes<T | string>,
  ret: Either<ErrResp, T>,
) => pipe(ret, map(okResp), toUnion, (f) => res.status(f.code).json(f));
