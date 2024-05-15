import { avatarEndpoint, avatarOptions } from "@/api/endpoints";

export const getAvatar = (name: string): string => {
  return `${avatarEndpoint}?seed=${name}${avatarOptions}`;
};
