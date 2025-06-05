import { BsArrowCounterclockwise } from "react-icons/bs";

const Undo = ({ editor }) => {

    return (
        <div className="undo">
            <BsArrowCounterclockwise
                className=" ext"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can().chain().focus().undo().run()
                }
            />
        </div>
    );
};

export default Undo;