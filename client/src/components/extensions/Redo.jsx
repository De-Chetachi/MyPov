import { BsArrowClockwise } from "react-icons/bs";

const Redo = ({ editor }) => {

    return (
        <div className="redo">
            <BsArrowClockwise
                className=" ext"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                  !editor.can().chain().focus().redo().run()
                }
            />
        </div>
    );
};

export default Redo;