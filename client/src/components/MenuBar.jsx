//mport { useCurrentEditor } from '@tiptap/react';
import Redo from "./extensions/Redo";
import Undo from "./extensions/Undo";
import Blockquote from "./extensions/Blockquote";
import Bold from "./extensions/Bold";
import Srike from "./extensions/Strike";
import Underline from "./extensions/Underline";
import Italic from "./extensions/Italics";
import Heading from "./extensions/Heading";
import Link from "./extensions/Link";


const MenuBar = ({ editor} ) => {
    //const { editor } = useCurrentEditor();
  
    if (!editor) {
      return null;
    }

    return (
        <div className="">
            <div className="flex flex-wrap">
                <Redo editor={editor} />
                <Undo editor={editor} />
                <Blockquote editor={editor} />
                <Heading editor={editor} />
                <Bold editor={editor} />
                <Srike editor={editor} />
                <Underline editor={editor} />
                <Italic editor={editor} />
                <Link editor={editor} />  
            </div>
        </div>
    )
};

export default MenuBar;