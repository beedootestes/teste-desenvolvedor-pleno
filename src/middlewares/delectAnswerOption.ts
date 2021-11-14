import * as Yup from "yup";
import { showError } from ".";
import { AppResponse } from "../@types";
import { NextFunction, Request, Response } from "express";
import { IDelectAnswerToQuestion } from "../services/answersServices/delectAnswerToQuestion.service";
import { Answers } from "../models/Answers";

export const delectAnswerOption = async (
  req: Request<IDelectAnswerToQuestion>,
  res: Response<AppResponse<Answers[]>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    idQuestionAnswer: Yup.string().required("The Question is required."),
    idAnswer: Yup.string().required("Id Answer is required."),
  });
  await showError(req, res, next, schema);
};
