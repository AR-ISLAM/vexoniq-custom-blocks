// /**
//  * Retrieves the translation of text.
//  *
//  * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
//  */
// import { __ } from '@wordpress/i18n';

// /**
//  * React hook that is used to mark the block wrapper element.
//  * It provides all the necessary props like the class name.
//  *
//  * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
//  */
// import { useBlockProps, RichText } from '@wordpress/block-editor';

// /**
//  * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
//  * Those files can contain any CSS code that gets applied to the editor.
//  *
//  * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
//  */
// import './editor.scss';

// /**
//  * The edit function describes the structure of your block in the context of the
//  * editor. This represents what the editor will render when the block is used.
//  *
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
//  *
//  * @return {Element} Element to render.
//  */
// export default function Edit({ attributes, setAttributes }) {
// 	return (
// 		<RichText
// 			{ ...useBlockProps() }
// 			tagName="p"
// 			value={ attributes.content }
// 			onChange={ (content) => setAttributes({ content }) }
// 			placeholder="Enter text..."
// 		/>
// 	);
// }


import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const { content, isEditing } = attributes;
	const [text, setText] = useState(content);

	const handleSave = () => {
		setAttributes({ content: text, isEditing: false });
	};

	const handleEdit = () => {
		setAttributes({ isEditing: true });
	};

	return (
		<div {...useBlockProps()}>
			{isEditing ? (
				<div>
					<TextControl
						value={text}
						onChange={(value) => setText(value)}
						placeholder="Enter text here..."
					/>
					<Button variant="primary" onClick={handleSave}>
						Save Text
					</Button>
				</div>
			) : (
				<p className="red-italic" onClick={handleEdit}>
					{content}
				</p>
			)}
		</div>
	);
};

export default Edit;
