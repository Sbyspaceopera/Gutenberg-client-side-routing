<?php

/**
 * Plugin Name:      Client Side Routing
 * Description:       CSR gives you two new Gutenberg blocks for handling client side navigation in the Blocks Editor : 'Client Side Link'  & 'Client Side Router'.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Sébastien Corbisier
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       client-side-routing
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_client_side_routing_redux_store()
{
	$dependencies_and_version = require_once(dirname(__FILE__) . "/buildStore/index.asset.php");
	$dependencies = $dependencies_and_version["dependencies"];
	$version = $dependencies_and_version["version"];
	wp_register_script("client_side_routing_redux_store", plugin_dir_url(__FILE__) . '/buildStore/index.js', $dependencies, $version);
	wp_enqueue_script("client_side_routing_redux_store");
}

add_action('admin_enqueue_scripts', 'create_client_side_routing_redux_store');

function create_block_react_router_navigation_block_init()
{
	register_block_type(__DIR__ . '/build/link');
	register_block_type(__DIR__ . '/build/router');
	register_block_type(__DIR__ . '/build/route');
}
add_action('init', 'create_block_react_router_navigation_block_init');
