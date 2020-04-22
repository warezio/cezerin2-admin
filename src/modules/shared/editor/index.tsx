import React from 'react'
import settings from 'lib/settings'
import TinyMCE from '../tinymce'

const config = {
	inline: true,
	plugins: [
		'autolink lists link image charmap preview anchor',
		'searchreplace visualblocks code fullscreen',
		'media table paste code textcolor directionality',
	],
	toolbar1:
		'image media | styleselect | bold italic bullist numlist link alignleft aligncenter alignright alignjustify',
	toolbar2:
		'undo redo | forecolor paste removeformat table | outdent indent | preview code',
}

export default const Editor = () => {
	
		
		state = {
			value: props.input.value,
		}
	}

	useEffect([prop.count](nextProps) {
		if (state.value !== nextProps.input.value) {
			set(
				value: nextProps.input.value,
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return state.value !== nextState.value
	}

	onChange = (e) => {
		const content = e.target.getContent()
		set( value: content })
		props.input.onChange(content)
	}

	
		return (
			<TinyMCE
				entityId={props.entityId}
				content={state.value}
				config={{
					relative_urls: false,
					remove_script_host: false,
					convert_urls: false,
					language: settings.language,
					themes: config.themes,
					inline: config.inline,
					plugins: config.plugins,
					toolbar1: config.toolbar1,
					toolbar2: config.toolbar2,
					menubar: false,
				}}
				onChange={onChange}
			/>
		)
	}
}
