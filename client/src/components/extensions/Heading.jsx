import { BsTypeH1 } from "react-icons/bs";

const Heading = ({ editor }) => {

    return (
        <div className="heading">
            <BsTypeH1
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                disabled={
                    !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={editor.isActive('heading', { level: 1 }) ? 'is-active ext dark' : 'ext'}
            />
        </div>
    );
}

export default Heading;