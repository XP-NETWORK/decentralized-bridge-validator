import { Request, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { left, match } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { Decoder } from "io-ts";
import { ParsedQs } from "qs";
import { errResp, expressUnwrappErr } from "./api-resp";

function pValidator<T, V>(
  decoder: Decoder<T, V>,
  prop: keyof Request,
): RequestHandler {
  return (req, res, next) =>
    pipe(
      decoder.decode(req[prop]),
      match(
        (e) => {
          expressUnwrappErr(
            res,
            left(errResp(400, e.map((e) => JSON.stringify(e)).join(", "))),
          );
        },
        (d) => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (req as any)[prop] = d;
          next();
        },
      ),
    );
}

export function bodyValidator<T, V>(
  decoder: Decoder<T, V>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): RequestHandler<ParamsDictionary, any, V> {
  return pValidator(decoder, "body");
}

export function paramsValidator<T, V>(
  decoder: Decoder<T, V>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): RequestHandler<ParamsDictionary & V, any, any> {
  return pValidator(decoder, "params");
}

export function queryValidator<T, V>(
  decoder: Decoder<T, V>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): RequestHandler<ParamsDictionary, any, any, V & ParsedQs> {
  return pValidator(decoder, "query");
}
