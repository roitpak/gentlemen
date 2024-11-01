import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: React.CSSProperties;
}

export default function RichTextEditor({
  value,
  onChangeText,
  style,
}: RichTextEditorProps) {
  const quillRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    quillRef.current
      .getEditor()
      .getModule('toolbar')
      .addHandler('image', () => {
        console.log('Image loaded');
      });
  }, [quillRef]);

  const modules = {
    toolbar: {
      container: [
        [{header: [1, 2, 3, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{list: 'ordered'}, {list: 'bullet'}],
        ['link', 'image', 'code-block'],
      ],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block',
    'image',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      style={{...styles.editorStyle, ...style}}
      theme="snow"
      value={value}
      onChange={onChangeText}
      modules={modules}
      formats={formats}
    />
  );
}

const styles = StyleSheet.create({
  editorStyle: {minHeight: 100, width: '100%', backgroundColor: 'white'},
});
