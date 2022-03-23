import React, { useCallback, useRef, useMemo, useEffect } from "react";
import { comboboxStore } from "@udecode/plate-combobox";
import { Combobox } from "@udecode/plate-ui-combobox";
import {
  getPluginOptions,
  usePlateEditorRef,
  usePlateSelectors
} from "@udecode/plate";
import {
  ELEMENT_MENTION,
  getMentionOnSelectItem
} from "@udecode/plate-mention";

import { isFunction } from "lodash";

const asyncURL = ""; //this url is what me make async calls to

export const AsyncCombobox = ({ pluginKey, id = pluginKey, excludeItem }) => {
  const editor = usePlateEditorRef(); //get reference to editor
  const focusedEditorId = usePlateSelectors(editor?.id);
  const [items, setItems] = React.useState([]);

  const open = comboboxStore.use.isOpen(); //is the combobox open
  const activeId = comboboxStore.use.activeId(); //Active id (combobox id which is opened).
  const { trigger } = getPluginOptions(editor, pluginKey);
  const isOpen = useMemo(() => {
    if (!open || focusedEditorId !== editor.id || activeId !== id) {
      return null;
    }
    return true;
  }, [open, editor.id, focusedEditorId, activeId, id]);

  useEffect(() => {
    if (isOpen) {
      console.log("Request API");
    }
  }, [isOpen]);

  // const filter = useCallback(
  //   (s) => (mentionable) => {
  //     try {
  //       console.log(mentionable);
  //       if (isFunction(excludeItem)) {
  //         if (excludeItem(mentionable)) return;
  //       }
  //       return mentionable.name.toLowerCase().includes(s.toLowerCase());
  //     } catch (e) {
  //       //eslint-disable-next-line
  //     }
  //   },
  //   [excludeItem]
  // );

  useEffect(() => {
    comboboxStore.set.setComboboxById({
      id
      // filter
    });
  }, [id]);

  return (
    <Combobox
      id={id}
      trigger={trigger}
      controlled
      items={[{}]}
      onSelectItem={getMentionOnSelectItem({ pluginKey })}
    />
  );
};
