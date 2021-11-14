import * as Yup from "yup";
import { showError } from ".";
import { AppResponse } from "../@types";
import { NextFunction, Request, Response } from "express";
import { Answers } from "@models/Answers";
import { ICreateAnswers } from "@services/answersServices/createAnswers.service";

export const createAnswers = async (
  req: Request<ICreateAnswers>,
  res: Response<AppResponse<Answers[]>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    idQuestion: Yup.string().required("Informe a Pergunta a Responder!"),
    answers: Yup.string().required("A Resposta é obrigatória!"),
  });
  await showError(req, res, next, schema);
};
