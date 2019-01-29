import React, {Component} from 'react'


import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import PropTypes from 'prop-types'
import htmlToDraft from 'html-to-draftjs'

export default class activeEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  //得到富文本数据
  getContent = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  componentWillMount = () => {
    const {detail} = this.props
    if (detail) {
      const blocksFromHtml = htmlToDraft(detail)
      const {contentBlocks, entityMap} = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      this.setState ({
        editorState: editorState
      })
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />


        {/*<textarea*/}
          {/*disabled*/}
          {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
        {/*/>*/}
      </div>
    );
  }
}

