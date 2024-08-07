import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

export default function Tinymce({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && <label htmlFor="content" className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="yr4l0c6muxwf7zjg8shazsin6qk0th4g9pistovxcs7yl9z7"
                        id="content-editor"
                        initialValue={defaultValue}
                        init={{
                            height: 300,
                            initialValue: defaultValue,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
