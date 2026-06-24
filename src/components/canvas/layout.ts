import { projects } from "../../data/site";

// Journey geometry. The overlay has N_PANELS scrollable panels
// (hero + projects + skills + experience + contact). The camera travels a
// fixed distance along -Z as scroll goes 0..1, and each project chapter is
// placed at the z that lines up with its overlay panel.
export const N_PANELS = 4 + projects.length; // hero, projects..., skills, exp, contact
export const TRAVEL = 132; // total world units the camera flies
export const CAM_START = 8; // camera z at scroll = 0
export const LOOK_AHEAD = 6; // how far ahead of camera a chapter sits when focused

export const cameraZ = (scroll: number) => CAM_START - TRAVEL * scroll;

/** scroll fraction at which project i is centered (panel index i+1) */
export const chapterScroll = (i: number) => (i + 1) / (N_PANELS - 1);

/** absolute z position of chapter i */
export const chapterZ = (i: number) => cameraZ(chapterScroll(i)) - LOOK_AHEAD;
