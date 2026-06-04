export const TOTAL_FRAMES = 724;
export const FRAME_PATH = "/hero-frames/frame_";
export const FRAME_EXT = ".jpg";

export function getFrameSrc(index: number): string {
  return `${FRAME_PATH}${String(index).padStart(6, "0")}${FRAME_EXT}`;
}
