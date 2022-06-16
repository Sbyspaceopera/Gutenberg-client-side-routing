/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

//Other imports
import { Button, TextControl } from "@wordpress/components";
import { useSelect, dispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const csrStoreDispatcher = dispatch("csr-store");
	const csrStoreSelector = useSelect("csr-store");
	const blockProps = useBlockProps();

	useEffect(() => {
		csrStoreDispatcher.addRouter("");
		setAttributes({ name: "" });
	}, []);

	function handleRouterName(newName) {
		csrStoreDispatcher.setRouter(
			attributes.routerName,
			attributes.name,
			newName
		);
		setAttributes({ name: newName });
	}

	return (
		<div {...blockProps}>
			<h3>Router</h3>
			<TextControl
				type="text"
				label="Router Name"
				value={attributes.textLink}
				onChange={(value) => handleRouterName(value)}
			/>
			{console.log(csrStoreSelector.getRouters())}
			<InnerBlocks
				{...blockProps}
				allowedBlocks={["client-side-routing/route"]}
			/>
		</div>
	);
}
