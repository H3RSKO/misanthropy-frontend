import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextEditorStyles from './TextEditorStyles'
import { withStyles } from "@mui/styles";
import './TextEditorStyles.css'
import {threads, createThreads} from '../../store/threads';
import { connect } from "react-redux";

const TextEditor = ({setPostHandler, postHandler, classes, id}) => {
    const [text, setText] = useState('')

    useEffect(() => {
        setPostHandler({...postHandler, text: text})
    }, [text])

        return (
            <div className="App">
                <CKEditor
                    className={classes.CKEditor}
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setText(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
}

const mapDispatchCreateThreads = (dispatch) => ({
    createThread: (post) => dispatch(createThreads(post))
  })

const mapState = (state) => {
    return {
      user: state.users.user
    }
  }

export default connect(mapState, mapDispatchCreateThreads)(withStyles(TextEditorStyles)(TextEditor))
