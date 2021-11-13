import * as Yup from "yup";
import { showError } from ".";
import { AppResponse } from "../@types";
import { Questions } from "@models/Questions";
import { NextFunction, Request, Response } from "express";
import { ICreateQuestion } from "@services/createQuestion.service";

export const createQuestion = async (
  req: Request<ICreateQuestion>,
  res: Response<AppResponse<Questions[]>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    question: Yup.string().required("Informe a Pergunta a Cadastrar!"),
    description: Yup.string()
      .min(15, "A descrição deve ser um texto.")
      .max(100, "Não Precisa ser muito Longo."),
  });
  await showError(req, res, next, schema);
};
