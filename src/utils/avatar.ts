/**
 * DiceBear Avatar Utility
 * Generates consistent avatars based on a seed string.
 */

export type AvatarStyle =
  | "adventurer"
  | "avataaars"
  | "bottts"
  | "fun-emoji"
  | "lorelei"
  | "notionists"
  | "open-peeps"
  | "pixel-art";

/**
 * Returns a DiceBear avatar URL in PNG format for standard Image component compatibility.
 * @param seed - Unique string to generate the avatar (e.g., username or email)
 * @param style - The visual style of the avatar
 */
export const getAvatarUrl = (seed: string, style: AvatarStyle = "lorelei"): string => {
  const cleanSeed = encodeURIComponent(seed.trim().toLowerCase());
  return `https://api.dicebear.com/9.x/${style}/png?seed=${cleanSeed}`;
};
