import React from "react";
import {
  HeadingToolbar,
  MarkToolbarButton,
  usePlateEditorRef,
  getPluginType
} from "@udecode/plate";
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE
} from "@udecode/plate-basic-marks";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined
} from "react-icons/md";

export const Toolbar = () => {
  const editor = usePlateEditorRef();

  return (
    <HeadingToolbar>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<MdFormatBold />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<MdFormatItalic />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<MdFormatUnderlined />}
      />
    </HeadingToolbar>
  );
};
