import React from "react";
import DOMPurify from 'dompurify'

export const TextPage = ({text}) => {
    console.log(text)
    const sanitizedText = DOMPurify.sanitize(text); // очистка текста от потенциально опасных элементов

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedText }}></div>
    );
}