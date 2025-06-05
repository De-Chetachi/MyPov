import { BsLink45Deg } from "react-icons/bs";
import React, { useCallback } from 'react';


const Link = ({ editor }) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        } catch (e) {
            alert(e.message);
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="link">
            <BsLink45Deg
                onClick={setLink}
                className={editor.isActive('link') ? 'is-active dark ext' : ' ext'}
            />
        </div>
    );
}
;

export default Link;



