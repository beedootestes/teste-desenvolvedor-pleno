import * as Yup from "yup";
import { showError } from ".";
import { AppResponse } from "../@types";
import { Questions } from "@models/Questions";
import { NextFunction, Request, Response } from "express";
import { ICreateQuestion } from "../services/questionsServices/createQuestion.service";

export const delectQuestion = async (
  req: Request<ICreateQuestion>,
  res: Response<AppResponse<Questions[]>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    idQuestionDelect: Yup.string().required(
      "A questão a deletar é obrigatório!"
    ),
  });
  await showError(req, res, next, schema);
};
