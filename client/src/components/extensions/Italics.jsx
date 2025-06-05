import { BsTypeItalic } from "react-icons/bs";

const Italics = ({ editor }) => {

    return (
        <div className="italics">
            <BsTypeItalic
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                  !editor.can().chain().focus().toggleItalic().run()
                }
                className={editor.isActive('italic') ? 'is-active dark ext' : ' ext'}
            />
        </div>
    );
}

export default Italics;