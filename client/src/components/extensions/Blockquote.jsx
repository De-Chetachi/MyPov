import { BsQuote } from "react-icons/bs";

const Blockquote = ({ editor }) => {

    return (
        <div className="quote">
            <BsQuote
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active  ext dark' : 'ext'}
            />
        </div>
    );

};

export default Blockquote;