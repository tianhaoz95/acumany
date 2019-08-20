import React, { Component } from 'react';
import { Editor, Raw } from 'slate';
import { schema } from './Schema';
import './index.css';

const DEFAULT_NODE = 'paragraph';

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: Raw.deserialize(props.content, { terse: true })
    };
    this.handleChange = this.handleChange.bind(this);
    this.hasMark = this.hasMark.bind(this);
    this.hasBlock = this.hasBlock.bind(this);
    this.onClickMark = this.onClickMark.bind(this);
    this.onClickBlock = this.onClickBlock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderMarkButton = this.renderMarkButton.bind(this);
    this.renderBlockButton = this.renderBlockButton.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  hasMark(type) {
    const state = this.state.state;
    return state.marks.some(mark => mark.type === type);
  }

  hasBlock(type) {
    const state = this.state.state;
    return state.blocks.some(node => node.type === type);
  }

  onClickMark(e, type) {
    e.preventDefault();
    let state = this.state.state;

    state = state
      .transform()
      .toggleMark(type)
      .apply();

    this.setState({ state: state });
    this.props.update(state);
  }

  onClickBlock(e, type) {
    e.preventDefault()
    let state = this.state.state;
    const transform = state.transform()
    const { document } = state

    console.log("type => ", type);

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      console.log("type is neither bullet list nor numbered list");
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        console.log("this is a list");
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      }

      else {
        console.log("this is not a list");
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
      }
    }

    // Handle the extra wrapping required for list buttons.
    else {
      console.log("type is numbered list or bulleted list");
      const isList = this.hasBlock('list-item')
      const isType = state.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        console.log("unwrapping both numbered and bulleted list");
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        console.log("upwrapping one type of list");
        transform
          .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type)
      } else {
        console.log("warpping list");
        transform
          .setBlock('list-item')
          .wrapBlock(type)
      }
    }

    state = transform.apply()
    this.setState({ state: state });
    this.props.update(state);
  }

  handleChange(state) {
    this.setState({ state: state });
    this.props.update(state);
  }

  onKeyDown(e, data, state) {
    if (!data.isMod) return
    let mark

    switch (data.key) {
      case 'b':
        mark = 'bold'
        break
      case 'i':
        mark = 'italic'
        break
      case 'u':
        mark = 'underlined'
        break
      case '`':
        mark = 'code'
        break
      default:
        return
    }

    state = state
      .transform()
      .toggleMark(mark)
      .apply()

    e.preventDefault()
    return state
  }

  renderToolbar() {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </div>
    )
  }

  renderMarkButton(type, icon) {
    const isActive = this.hasMark(type)
    const onMouseDown = e => this.onClickMark(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderBlockButton(type, icon) {
    const isActive = this.hasBlock(type)
    const onMouseDown = e => this.onClickBlock(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderEditor() {

    let content = null;

    if (this.props.type === "preview") {
      content = (
        <Editor
          spellCheck
          schema={schema}
          readOnly={true}
          state={this.state.state}
        />
      );
    } else {
      content = (
        <Editor
          spellCheck
          schema={schema}
          state={this.state.state}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDown}
        />
      );
    }

    return (
      <div className="top-level-editor-container">
        {content}
      </div>
    )
  }

  render() {

    let toolBarField = null;

    if (this.props.type === "edit") {
      toolBarField = this.renderToolbar();
    }

    return(
      <div className="whole-editor-toolbox-container">
        {toolBarField}
        {this.renderEditor()}
      </div>
    );
  }
}

export default MyEditor;
