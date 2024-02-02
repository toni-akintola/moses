import { Education } from "@/utils/types";
import { atom } from "jotai";

/* An atom for each input field is created/defined */

// General Information Atoms
export const ageAtom = atom<string | null>("0");
export const nameAtom = atom<string | null>("");
export const proficiencyAtom = atom<string | null>("");

// Education Atoms
export const universityAtom = atom<string | null>("");
export const degreeAtom = atom<string | null>("");
export const yearsAtom = atom<string | null>("0");
export const nationAtom = atom<string | null>("United States");

// Experience Atoms
export const experienceCounter = atom<number[]>([1]);
export const employerAtom = atom<string | null>("");
export const jobAtom = atom<string | null>("");
export const cityAtom = atom<string | null>("");
export const startDateAtom = atom<string | null>("");
export const endDateAtom = atom<string | null>("");
export const dutiesAtom = atom<string | null>("");

export const buildResume = () => {};
