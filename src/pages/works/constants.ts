/** Filter keys — UI order: All, React, JavaScript, TypeScript, HTML / CSS */
export type WorkFilterKey = "all" | "react" | "javascript" | "typescript" | "html-css";

export type WorkProjectTag = Exclude<WorkFilterKey, "all">;

export const WORK_FILTER_ORDER: {key: WorkFilterKey; label: string}[] = [
  {key: "all", label: "All"},
  {key: "react", label: "React"},
  {key: "javascript", label: "JavaScript"},
  {key: "typescript", label: "TypeScript"},
  {key: "html-css", label: "HTML / CSS"},
];

export type {WorkProject} from "@/data/portfolioProjects";
export {PORTFOLIO_PROJECTS as WORK_PROJECTS} from "@/data/portfolioProjects";
