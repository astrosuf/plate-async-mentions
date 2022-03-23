import "./styles.css";
import React, { useState } from "react";
import {
  Plate,
  createPlugins,
  createPlateUI,
  createComboboxPlugin,
  createMentionPlugin,
} from "@udecode/plate";
import { MentionCombobox, MentionElement } from "@udecode/plate-ui-mention";
import { mentionItems } from "./constants/mentionItems";

import {
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { Toolbar } from "./components/Toolbar";
import { AsyncCombobox } from "./components/AsyncCombobox";

const editableProps = {
  placeholder: "Type…",
  style: {
    padding: "15px",
  },
};

function App() {
  const [debugValue, setDebugValue] = useState([]);
  const emptyItems = [{ key: 0, text: "No Mentions Available" }];

  const plugins = createPlugins(
    [
      //mentions/comboboxes
      createComboboxPlugin(),
      createMentionPlugin({
        key: "@",
        component: MentionElement,
      }),

      createMentionPlugin({
        key: "/",
        component: MentionElement,
        props: (editor) => {
          const onMentionClicked = () => {
            let url = editor.element.url;
            console.log("Opening url", url);
            window.open(url, "_blank");
          };
          return { onClick: onMentionClicked };
        },
        options: {
          trigger: "/",
          createMentionNode: (item) => {
            return {
              id: item.key,
              value: item.text,
              url: item.data.url,
            };
          },
        },
      }),
      // marks
      createBoldPlugin(), // bold mark
      createItalicPlugin(), // italic mark
      createUnderlinePlugin(), // underline mark
    ],
    {
      components: createPlateUI(),
    }
  );

  return (
    <>
      <Plate
        editableProps={editableProps}
        plugins={plugins}
        onChange={(newValue) => {
          setDebugValue(newValue);
        }}
      >
        <Toolbar />

        <MentionCombobox items={mentionItems} pluginKey="@" />

        <AsyncCombobox items={emptyItems} pluginKey="/" />
      </Plate>
      <pre>{JSON.stringify(debugValue, null, 1)}</pre>
    </>
  );
}

export default App;
