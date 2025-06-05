import { BsTypeBold } from "react-icons/bs";

const Bold = ({ editor }) => {

    return (
        <div className="bold">
            <BsTypeBold
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active  ext dark' : ' ext'}
            />
        </div>
    );
};

export default Bold;