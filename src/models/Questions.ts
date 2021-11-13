import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answers } from "./Answers";
import { QuestionsDelected } from "./QuestionsDelected";

@Entity("questions", { schema: "beedoo_challenge" })
export class Questions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "question", length: 250 })
  question: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Answers, (answers) => answers.idQuestion2)
  answers: Answers[];

  @OneToMany(
    () => QuestionsDelected,
    (questionsDelected) => questionsDelected.idQuestion2
  )
  questionsDelecteds: QuestionsDelected[];
}
