import { BsTypeUnderline } from "react-icons/bs";

const Underline = ({ editor }) => {
    return (
        <div className="underline">
            <BsTypeUnderline 
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active  ext dark' : ' ext'}
            />
        </div>
    );
}

export default Underline;