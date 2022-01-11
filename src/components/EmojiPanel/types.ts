import { BaseEmoji } from 'emoji-mart';

export type EmojiPanelProps = {
  onEmojiSelect: (emoji: BaseEmoji) => void;
  className?: string;
};
