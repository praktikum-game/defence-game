import { BaseEmoji, Picker } from 'emoji-mart';
import React, { useState } from 'react';
import { EmojiPanelProps } from './types';
import block from 'bem-cn';

import 'emoji-mart/css/emoji-mart.css';
import './emoji-panel.css';
const b = block('emoji-panel');

export const EmojiPanel = ({ onEmojiSelect, className }: EmojiPanelProps) => {
  const [pickerIsVisible, setPickerIsVisible] = useState(false);

  const handleEmojiSelect = (emoji: BaseEmoji) => onEmojiSelect(emoji);

  const handleToggleEmojiPicker = () => {
    setPickerIsVisible((prev) => !prev);
  };
  return (
    <div className={b.mix(className)}>
      <button className={b('button')} onClick={handleToggleEmojiPicker}>
        =)
      </button>

      <div className={b('picker', { hide: !pickerIsVisible })}>
        <Picker
          sheetSize={16}
          native={true}
          title="Суровые смайлы"
          emojiTooltip
          onSelect={handleEmojiSelect}
        />
      </div>
    </div>
  );
};
