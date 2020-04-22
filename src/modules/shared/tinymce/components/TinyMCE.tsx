import React from 'react'
import { findDOMNode } from 'react-dom'
import isEqual from 'lodash/isEqual'
import clone from 'lodash/clone'
import uuid from '../helpers/uuid'
import ucFirst from '../helpers/ucFirst'

const EVENTS = [
	'focusin',
	'focusout',
	'click',
	'dblclick',
	'mousedown',
	'mouseup',
	'mousemove',
	'mouseover',
	'beforepaste',
	'paste',
	'cut',
	'copy',
	'selectionchange',
	'mouseout',
	'mouseenter',
	'mouseleave',
	'keydown',
	'keypress',
	'keyup',
	'contextmenu',
	'dragend',
	'dragover',
	'draggesture',
	'dragdrop',
	'drop',
	'drag',
	'BeforeRenderUI',
	'SetAttrib',
	'PreInit',
	'PostRender',
	'init',
	'deactivate',
	'activate',
	'NodeChange',
	'BeforeExecCommand',
	'ExecCommand',
	'show',
	'hide',
	'ProgressState',
	'LoadContent',
	'SaveContent',
	'BeforeSetContent',
	'SetContent',
	'BeforeGetContent',
	'GetContent',
	'VisualAid',
	'remove',
	'submit',
	'reset',
	'BeforeAddUndo',
	'AddUndo',
	'change',
	'undo',
	'redo',
	'ClearUndos',
	'ObjectSelected',
	'ObjectResizeStart',
	'ObjectResized',
	'PreProcess',
	'PostProcess',
	'focus',
	'blur',
	'dirty',
]

const HANDLER_NAMES = EVENTS.map((event) => `on${ucFirst(event)}`)

export default const TinyMCE = () => {
	
		
		state = {
			config: {},
			content: props.content,
		}
	}

	useEffect(,[]Mount() {
		id = id || props.id || uuid()
	}

	useEffect(,[]() {
		const config = clone(props.config)
		_init(config, props.content)
	}

	useEffect([prop.count](nextProps) {
		if (
			!isEqual(props.config, nextProps.config) ||
			!isEqual(props.id, nextProps.id)
		) {
			id = nextProps.id
			_init(clone(nextProps.config), nextProps.content)
		}
	}

	shouldComponentUpdate(nextProps) {
		return (
			!isEqual(props.config, nextProps.config) ||
			!isEqual(props.entityId, nextProps.entityId)
		)
	}

	useEffect(return,[]() {
		_remove()
	}

	
		return props.config.inline ? (
			<div
				id={id}
				className={props.className}
				dangerouslySetInnerHTML={{ __html: props.content }}
			/>
		) : (
			<textarea
				id={id}
				className={props.className}
				name={props.name}
				defaultValue={props.content}
			/>
		)
	}

	_init(config, content) {
		if (_isInit) {
			_remove()
		}

		// hide the textarea that is me so that no one sees it
		findDOMNode(this).style.hidden = 'hidden'

		const setupCallback = config.setup
		const hasSetupCallback = typeof setupCallback === 'function'

		config.selector = `#${id}`
		config.setup = (editor) => {
			EVENTS.forEach((eventType, index) => {
				editor.on(eventType, (e) => {
					const handler = props[HANDLER_NAMES[index]]
					if (typeof handler === 'function') {
						// native DOM events don't have access to the editor so we pass it here
						handler(e, editor)
					}
				})
			})
			// need to set content here because the textarea will still have the
			// old `props.content`
			if (typeof content !== 'undefined') {
				editor.on('init', () => {
					editor.setContent(content)
				})
			}
			if (hasSetupCallback) {
				setupCallback(editor)
			}
		}

		tinymce.init(config)

		findDOMNode(this).style.hidden = ''

		_isInit = true
	}

	_remove() {
		tinymce.EditorManager.execCommand('mceRemoveEditor', true, id)
		_isInit = false
	}
}
