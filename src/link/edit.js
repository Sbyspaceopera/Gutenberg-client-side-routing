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
import { useSelect, dispatch } from "@wordpress/data";
import { TextControl } from "@wordpress/components";

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

	function handleClick(e) {
		e.preventDefault();
		csrStoreDispatcher.setActualRoute(
			attributes.routerName,
			attributes.routeName
		);
	}

	function handleSelectRouter(e) {
		let router = csrStoreSelector.getRouter(e.target.value);
		if (router) {
			setAttributes({ routerName: e.target.value });
		} else {
			setAttributes({ routerName: undefined });
		}
	}

	function handleSelectRoute(e) {
		let router = csrStoreSelector.getRoute(attributes.routeName);
		if (router) {
			setAttributes({ routeName: e.target.value });
		} else {
			setAttributes({ routeName: undefined });
		}
	}

	return (
		<div>
			<label>Router</label>
			<select onSelect={(e) => handleSelectRouter(e)}>
				<option value="">--Please choose a Router--</option>
				{csrStoreSelector.getRouters().length ? (
					csrStoreSelector.getRouters().map((router) => {
						return (
							<>
								<option value={router.name}>- {router.name}</option>
							</>
						);
					})
				) : (
					<option>Please create a CSR Router block before.</option>
				)}
			</select>

			{attributes.routerName ? (
				<>
					<label>Route</label>
					<select onSelect={(e) => handleSelectRoute(e)}>
						<option selected={!attributes.routeName}>
							--Please choose a Route--
						</option>
						{csrStoreSelector.getRoutes(attributes.routeName) ? (
							csrStoreSelector.getRoutes(attributes.routeName).map((route) => {
								return (
									<>
										<option value={route.name}>- {route.name}</option>
									</>
								);
							})
						) : (
							<option color="red">
								Please create a CSR Route block in a CSR Router before.
							</option>
						)}
					</select>
				</>
			) : null}

			<TextControl
				type="text"
				label="Link text"
				value={attributes.textLink}
				onChange={(value) => setAttributes({ textLink: value })}
			/>
			<a {...blockProps} onClick={handleClick}>
				{console.log("- attributes : ", attributes)}
				{console.log("- blockProps : ", blockProps)}
				{console.log("- csrStoreStoreSelector : ", csrStoreSelector)}
				{console.log("- csrStoreDispatcher : ", csrStoreDispatcher)}
				{attributes.textLink}
			</a>
		</div>
	);
}
