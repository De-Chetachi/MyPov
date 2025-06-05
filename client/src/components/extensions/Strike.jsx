import { BsTypeStrikethrough } from "react-icons/bs";

const Strike = ({ editor }) => {

    return (
        <div className="strike">
            <BsTypeStrikethrough
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active ext dark' : 'ext'}
            />
        </div>
    );
};

export default Strike;